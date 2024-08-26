import { Card, Flex, Image, Text } from "@mantine/core";

export type CommentSectionProps = {
  src: string;
  username: string;
  content: string;
  dateAdded : string 
};

const CommentSection = ({ src, username, content, dateAdded}: CommentSectionProps) => {
  return (
    <Card p={10} withBorder radius="md">
      <Flex direction='row' gap={10}>
        <Image radius="lg" src={src} alt="" h={50} />
        <Flex direction="column" w="100%">
          <Flex direction="row" w="100%" justify="space-between">
            <Text fw={700}>{username}</Text>
            <Text size='xs'>{new Date(dateAdded).toDateString()}</Text>
          </Flex>
          <Text size="sm">{content}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CommentSection;
