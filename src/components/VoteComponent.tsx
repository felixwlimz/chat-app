import { Flex, Group, Text, UnstyledButton } from "@mantine/core"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const VoteComponent = ({counter} : {counter : number}) => {

    return (
      <Group>
        <Text>{counter}</Text>
        <Flex direction="column">
          <UnstyledButton>
            <FaChevronUp />
          </UnstyledButton>
          <UnstyledButton>
            <FaChevronDown />
          </UnstyledButton>
        </Flex>
      </Group>
    );
}

export default VoteComponent