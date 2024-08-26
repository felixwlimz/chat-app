"use client";
import "reflect-metadata";
import useGetThread from "@/hooks/threads/use-get-thread";
import { Button, Container, Flex, Text, Textarea } from "@mantine/core";
import { plainToInstance } from "class-transformer";
import { useParams } from "next/navigation";
import Thread from "@/models/thread";
import HorizontalVoteComponent from "@/components/HorizontalVoteComponent";
import CommentSection from "@/components/CommentSection";
import useAddComment from "@/hooks/comments/use-add-comment";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function ThreadDetail() {
  const token = window.sessionStorage.getItem("token");
  const params = useParams();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { thread, isLoading, isError } = useGetThread(
    token!,
    params!.id as string
  );

  const { addComment } = useAddComment(token!, params!.id as string);

  const onClick = () => {
    addComment(comment, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["threads", params!.id],
        });
        setComment("");
      },
    });
  };

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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <Button
          color="red"
          me={20}
          h={30}
          w={100}
          size="xs"
          type="button"
          onClick={onClick}
        >
          Post
        </Button>
        <Text size="lg" fw={700}>
          Comments ( {singleThread.comments.length} )
        </Text>
        {singleThread.comments.map((comment) => (
          <CommentSection
            key={comment.id}
            username={comment.owner.name}
            src={comment.owner.avatar}
            content={comment.content}
            dateAdded={comment.createdAt}
          />
        ))}
      </Flex>
    </Container>
  );
}
