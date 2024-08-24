"use client";
import { Card, Flex, Text, Group, Badge, UnstyledButton } from "@mantine/core";
import VoteComponent from "./VoteComponent";
import { IoChatboxEllipses } from "react-icons/io5";

type CommentCardProps = {
  counter : number,
  title : string,
  description : string, 
  category : string,
  date : string 
}

const CommentCard = ({ counter, title, description, category,date } : CommentCardProps) => {

  return (
    <Card p={20} withBorder radius="lg">
      <Flex direction="row" gap={15}>
        <VoteComponent counter={counter} />
        <Flex direction="column" gap={8}>
          <Group>
            <Text style={{ fontSize: 20, fontWeight: 700 }} w={700}>
              {title}
            </Text>
            <Text>{date}</Text>
          </Group>
          <Text>{description}</Text>
          <Flex direction='row' justify='space-between'>
            <Badge color="gray">{category}</Badge>
            <UnstyledButton type='button'><IoChatboxEllipses/></UnstyledButton>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CommentCard;
