"use client";
import { Card, Flex, Text, Group, Badge, UnstyledButton } from "@mantine/core";
import { IoChatboxEllipses } from "react-icons/io5";
import VerticalVoteComponent from "./VerticalVoteComponent";

type CommentCardProps = {
  counter : number,
  title : string,
  description : string, 
  category : string,
  date : string,
  onChatClick : () => void  
}

const CommentCard = ({ counter, title, description, category,date, onChatClick } : CommentCardProps) => {

  return (
    <Card p={20} withBorder radius="lg">
      <Flex direction="row" gap={15}>
        <VerticalVoteComponent counter={counter} />
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
            <UnstyledButton type='button' onClick={onChatClick}><IoChatboxEllipses/></UnstyledButton>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CommentCard;
