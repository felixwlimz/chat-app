import { Group, UnstyledButton, Text } from "@mantine/core";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const HorizontalVoteComponent = () => {
  return (
    <Group>
      <UnstyledButton>
        <FaChevronUp />
      </UnstyledButton>
      <Text>0</Text>
      <UnstyledButton>
        <FaChevronDown />
      </UnstyledButton>
    </Group>
  );
};

export default HorizontalVoteComponent;
