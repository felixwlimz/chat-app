'use client'
import "reflect-metadata";
import CommentCard from "@/components/CommentCard";
import Navbar from "@/components/Navbar";
import useGetAllThreads from "@/hooks/threads/use-get-all-threads";
import Thread from "@/models/thread";
import { Container, Flex, Text } from "@mantine/core";
import { plainToInstance } from "class-transformer";
import { useRouter } from "next/navigation";

export default function Home() {
  const token = sessionStorage.getItem('token');
  const { threadsResponse, isLoading, isError } = useGetAllThreads(token!)
  const router = useRouter();

 
  if(isLoading){
    return <Text>Loading</Text>
  }
  if(isError && !token) {
    return <Text>Error</Text>
  }

  const threads = plainToInstance(Thread, (threadsResponse.data.threads as Thread[]) ?? [])
  console.log(threads)
  
  return (
    <Container p={20}>
      <Navbar />
      <Flex direction='column' mt={30} gap={10}>
       {
        threads.map(thread => (
          <CommentCard  
            key={thread.id}
            title={thread.title}
            counter={0}
            description={thread.body}
            category={thread.category}
            date={thread.createdAt}
            onChatClick={() => router.push(`/${thread.id}`)}
          />
        ))
       }
      </Flex>
    </Container>
  );
}
