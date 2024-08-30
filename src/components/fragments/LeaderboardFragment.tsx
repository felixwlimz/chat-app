"use client";
import "reflect-metadata";
import { Card, Container, Text } from "@mantine/core";
import Leaderboard from "@/models/leaderboard";

type LeaderboardProps = {
  leaderboards : Leaderboard[]
}


const LeaderboardFragment = ({leaderboards} : LeaderboardProps) => {



  return (
    <Container fluid m={10}>
      <Text>Leaderboards</Text>
      {
        leaderboards.map(leaderboard => (
          <Card key={leaderboard.user.id}>
            <Text>{leaderboard.user.name}</Text>

          </Card>
        ))
      }
    </Container>
  );
};

export default LeaderboardFragment;
