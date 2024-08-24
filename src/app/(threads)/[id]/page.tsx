"use client";
import "reflect-metadata";
import useGetThread from "@/hooks/threads/use-get-thread";
import { Button, Container, Flex, Text, Textarea } from "@mantine/core";
import { plainToInstance } from "class-transformer";
import { useParams } from "next/navigation";
import Thread from "@/models/thread";
import HorizontalVoteComponent from "@/components/HorizontalVoteComponent";

export default function ThreadDetail() {
  const token = window.sessionStorage.getItem("token");
  const params = useParams();
  console.log(params);

  const { thread, isLoading, isError } = useGetThread(
    token!,
    params!.id as string
  );

  if (isLoading) {
    return <Text>Loading</Text>;
  }
  if (isError && !token) {
    return <Text>Error</Text>;
  }

  const singleThread = plainToInstance(Thread, thread.data.detailThread);
  console.log(singleThread);

  return (
    <Container p={40}>
      <Flex direction="column" gap={20}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>
          {singleThread.title}
        </Text>
        <Text>{singleThread.body}</Text>
        <HorizontalVoteComponent />
        <Textarea
          resize="vertical"
          placeholder="Write a comment"
          maxRows={15}
        />
        <Button color="red" me={20} h={30} w={100} size="xs">
          Post
        </Button>

        {
            singleThread.comments.map(comment => (
                <Text key={comment.id}>{comment.content}</Text>
            ))
        }
      </Flex>
    </Container>
  );
}
