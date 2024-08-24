'use client'
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

export type NewThreadRequest = {
  title : string,
  body : string, 
  category : string 
}

export default function Home() {
  const token = window.sessionStorage.getItem('token');
  const { threadsResponse, isLoading, isError } = useGetAllThreads(token!)
  const { createThread } = useCreateThread(token!)
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const queryClient = useQueryClient()
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      body: "",
      category: "",
    },
    validate : {
      title : (value : string) => value === '' ? 'Title must not be empty' : null ,
      body : (value : string) => value === '' ? 'Body must not be empty' : null 
    }
  });

  const onSubmit = (req : NewThreadRequest) => {
    form.validate()
    console.log(req)
    createThread(req, {
      onSuccess : (data) => {
         console.log(data)
         queryClient.refetchQueries({
          queryKey : ['threads']
         })
      }
    })
  }
  

 
  if(isLoading){
    return <Text>Loading</Text>
  }
  if(isError || !token) {
    return <Text>Error</Text>
  }

  const threads = plainToInstance(Thread, (threadsResponse.data.threads as Thread[]) ?? [])
  console.log(threads)
  
  return (
    <>
      <Container p={20}>
        <Navbar onClick={toggle} />
        <AddThreadDialog form={form} opened={opened} onClose={close} onSubmit={(val : NewThreadRequest) => onSubmit(val)}/>
        <Flex direction="column" mt={30} gap={10}>
          {threads.map((thread) => (
            <CommentCard
              key={thread.id}
              title={thread.title}
              counter={0}
              description={thread.body}
              category={thread.category}
              date={thread.createdAt}
              onChatClick={() => router.push(`/${thread.id}`)}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
}
