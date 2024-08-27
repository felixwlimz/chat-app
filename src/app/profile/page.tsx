"use client";
import "reflect-metadata";
import useGetProfile from "@/hooks/users/use-get-profile";
import { Loading } from "@/loading";
import protectedRoute from "@/middleware/protected-route";
import User from "@/models/user";
import {
    Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { plainToInstance } from "class-transformer";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const token = sessionStorage.getItem("token");
  const router = useRouter();
  const { user, isLoading, isError } = useGetProfile(token!);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  const singleUser = plainToInstance(User, user.data.user)
  console.log(singleUser)

  return (
    <Container p={20}>
      <Group>
        <Button color="red" onClick={() => router.push("/")}>
          Back
        </Button>
        <Text size="xl" fw={700}>
          Profile
        </Text>
      </Group>

      <Flex direction="row" gap={100} mt={70}>
        <Flex direction="column" gap={20}>
          <UnstyledButton style={{ fontSize: 20 }}>Profile</UnstyledButton>
          <UnstyledButton style={{ fontSize: 20 }}>Settings</UnstyledButton>
          <UnstyledButton style={{ fontSize: 20 }}>Logout</UnstyledButton>
        </Flex>

      
      </Flex>
    </Container>
  );
}

export default protectedRoute(ProfilePage);
