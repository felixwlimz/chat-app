import { Button, Group, TextInput } from "@mantine/core"
import { FaPlus } from "react-icons/fa"

const Navbar = () => {
    return (
        <Group justify="flex-end">
            <Button color='red'><FaPlus/></Button>
            <TextInput
              placeholder='Search....'
            />
        </Group>
        

    )
}

export default Navbar