"use client";
import "reflect-metadata";
import useGetProfile from "@/hooks/users/use-get-profile";
import { Loading } from "@/loading";
import protectedRoute from "@/middleware/protected-route";
import User from "@/models/user";
import {
  Button,
  Container,
  Flex,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { plainToInstance } from "class-transformer";
import { useRouter } from "next/navigation";
import ProfileFragment from "@/components/fragments/ProfileFragment";
import { useState } from "react";
import SettingsFragment from "@/components/fragments/SettingsFragment";
import LeaderboardFragment from "@/components/fragments/LeaderboardFragment";
import useLeaderboard from "@/hooks/leaderboards/use-leaderboard";
import Leaderboard from "@/models/leaderboard";

function ProfilePage() {
  const token = sessionStorage.getItem("token");
  const router = useRouter();
  const { user, isLoading, isError } = useGetProfile(token!);
  const buttons = ["Profile", "Settings", "Leaderboards", "Logout"];
  const [value, setValue] = useState("Profile");
  const { leaderboardsData, leaderboardsLoading, leaderboardsError } = useLeaderboard(token!)

  console.log(leaderboardsData)

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
      case "Leaderboard":
        return <LeaderboardFragment leaderboards={leaderboards}/>;
    }
  };

  if (isLoading || leaderboardsLoading ) {
    return <Loading />;
  }

  if (isError || leaderboardsError ) {
    return <Text>Error</Text>;
  }
  const singleUser = plainToInstance(User, user.data.user);
  const leaderboards =
    plainToInstance(
      Leaderboard,
      leaderboardsData.data.leaderboards as Leaderboard[]
    ) ?? [];

    console.log(leaderboards)

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
