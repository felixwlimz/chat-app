import { Flex, Group, Text, UnstyledButton } from "@mantine/core";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export type VerticalVoteProps = {
  counter: number;
  onUpVote: () => void;
  onDownVote: () => void;
};

const VerticalVoteComponent = ({
  counter,
  onUpVote,
  onDownVote,
}: VerticalVoteProps) => {
  return (
    <Group>
      <Text>{counter}</Text>
      <Flex direction="column">
        <UnstyledButton onClick={onUpVote}>
          <FaChevronUp />
        </UnstyledButton>
        <UnstyledButton onClick={onDownVote}>
          <FaChevronDown />
        </UnstyledButton>
      </Flex>
    </Group>
  );
};

export default VerticalVoteComponent;
