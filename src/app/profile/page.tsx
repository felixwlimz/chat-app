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
import ProfileFragment from "@/components/fragments/ProfileFragment";
import { useMemo, useState } from "react";
import SettingsFragment from "@/components/fragments/SettingsFragment";

function ProfilePage() {
  const token = sessionStorage.getItem("token");
  const router = useRouter();
  const { user, isLoading, isError } = useGetProfile(token!);
  const buttons = ["Profile", "Settings", "Leaderboards", "Logout"];
  const [value, setValue] = useState("Profile");

  const fragment = () => {
    switch (value) {
      case "Profile":
        return (
          <ProfileFragment
            avatar={singleUser.avatar}
            name={singleUser.name}
            email={singleUser.email}
          />
        );
      case "Settings":
        return <SettingsFragment />;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Text>Error</Text>;
  }
  const singleUser = plainToInstance(User, user.data.user);

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
          {buttons.map((button, index) => (
            <UnstyledButton
              key={index}
              style={{ fontSize: 20 }}
              onClick={() => setValue(button)}
            >
              {button}
            </UnstyledButton>
          ))}
        </Flex>
        {fragment()}
      </Flex>
    </Container>
  );
}

export default protectedRoute(ProfilePage);
