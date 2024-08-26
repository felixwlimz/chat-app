"use client";
import { Card, Flex, Text, Group, Badge, UnstyledButton } from "@mantine/core";
import { IoChatboxEllipses } from "react-icons/io5";
import VerticalVoteComponent, {
  VerticalVoteProps,
} from "./VerticalVoteComponent";

type CommentCardProps = {
  title: string;
  description: string;
  category: string;
  commentLength: number;
  date: string;
  onChatClick: () => void;
} & VerticalVoteProps;

const CommentCard = ({
  counter,
  title,
  description,
  category,
  date,
  commentLength,
  onChatClick,
  onUpVote,
  onDownVote,
}: CommentCardProps) => {
  return (
    <Card p={20} withBorder radius="md">
      <Flex direction="row" gap={15}>
        <VerticalVoteComponent
          counter={counter}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
        <Flex direction="column" gap={8}>
          <Group>
            <Text style={{ fontSize: 20, fontWeight: 700 }} w={700}>
              {title}
            </Text>
            <Text>{date}</Text>
          </Group>
          <Text>{description}</Text>
          <Flex direction="row" justify="space-between">
            <Badge color="gray">{category}</Badge>
            <Group>
              <UnstyledButton type="button" onClick={onChatClick}>
                <IoChatboxEllipses />
              </UnstyledButton>
              <Text size="xs">{commentLength}</Text>
            </Group>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CommentCard;
