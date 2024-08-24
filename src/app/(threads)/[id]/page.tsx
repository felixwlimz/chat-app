"use client";
import "reflect-metadata";
import useGetThread from "@/hooks/threads/use-get-thread";
import { Container, Flex, Text } from "@mantine/core";
import { plainToInstance } from "class-transformer";
import { useParams } from "next/navigation";
import Thread from "@/models/thread";

export default function ThreadDetail() {
  const token = sessionStorage.getItem("token");
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
      <Flex direction="column" gap={10}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>
          {singleThread.title}
        </Text>
        <Text>{singleThread.body}</Text>
      </Flex>
    </Container>
  );
}
