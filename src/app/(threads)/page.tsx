"use client";
import "reflect-metadata";
import CommentCard from "@/components/CommentCard";
import Navbar from "@/components/Navbar";
import useGetAllThreads from "@/hooks/threads/use-get-all-threads";
import Thread from "@/models/thread";
import { Container, Flex, Text } from "@mantine/core";
import { plainToInstance } from "class-transformer";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import AddThreadDialog from "@/components/AddThreadDialog";
import useCreateThread from "@/hooks/threads/use-create-thread";
import { useQueryClient } from "@tanstack/react-query";
import useUpVote from "@/hooks/votes/use-up-vote";
import useDownVote from "@/hooks/votes/use-down-vote";
import protectedRoute from "@/middleware/protected-route";
import { Loading } from "@/loading";
import { useMemo, useState } from "react";

export type NewThreadRequest = {
  title: string;
  body: string;
  category: string;
};

function Home() {
  const token = window.sessionStorage.getItem("token");
  const [query, setQuery] = useState("");
  const { threadsResponse, isLoading, isError } = useGetAllThreads(token!);
  const { createThread } = useCreateThread(token!);
  const { upVote } = useUpVote(token!);
  const { downVote } = useDownVote(token!);
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      body: "",
      category: "",
    },
    validate: {
      title: (value: string) =>
        value === "" ? "Title must not be empty" : null,
      body: (value: string) => (value === "" ? "Body must not be empty" : null),
    },
  });

  const onSubmit = (req: NewThreadRequest) => {
    form.validate();
    console.log(req);
    createThread(req, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.refetchQueries({
          queryKey: ["threads"],
        });
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError || !token) {
    return <Text>Error</Text>;
  }

  const threads = plainToInstance(
    Thread,
    (threadsResponse.data.threads as Thread[]) ?? []
  );

  const filteredSearch: Thread[] = threads.filter((thread) =>
    thread.title.toLowerCase().includes(query)
  );

  return (
    <>
      <Container p={20}>
        <Navbar
          onClick={toggle}
          onChange={(e) => setQuery(e.target.value)}
          search={query}
        />
        <AddThreadDialog
          form={form}
          opened={opened}
          onClose={close}
          onSubmit={(val: NewThreadRequest) => onSubmit(val)}
        />
        <Flex direction="column" mt={30} gap={10}>
          {filteredSearch.map((thread) => (
            <CommentCard
              key={thread.id}
              title={thread.title}
              counter={thread.upVotesBy.length}
              description={thread.body}
              category={thread.category}
              date={new Date(thread.createdAt).toDateString()}
              onChatClick={() => router.push(`/${thread.id}`)}
              commentLength={thread.totalComments}
              onUpVote={() =>
                upVote(thread.id, {
                  onSuccess: () => {
                    queryClient.refetchQueries({
                      queryKey: ["threads"],
                    });
                  },
                })
              }
              onDownVote={() =>
                downVote(thread.id, {
                  onSuccess: () => {
                    queryClient.refetchQueries({
                      queryKey: ["threads"],
                    });
                  },
                })
              }
            />
          ))}
        </Flex>
      </Container>
    </>
  );
}

export default protectedRoute(Home);
