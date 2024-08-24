import CommentCard from "@/components/CommentCard";
import Navbar from "@/components/Navbar";
import useGetAllThreads from "@/hooks/threads/use-get-all-threads";
import { Container, Flex, Text } from "@mantine/core";

export default function Home() {
  const token = sessionStorage.getItem('token');
  const { threads, isLoading, isError } = useGetAllThreads(token!)
 
  if(isLoading){
    return <Text>Loading</Text>
  }

  if(isError) return <Text>Error</Text>

  return (
    <Container p={20}>
      <Navbar />
      <Flex mt={30}>
       {
        
       }
      </Flex>
    </Container>
  );
}
