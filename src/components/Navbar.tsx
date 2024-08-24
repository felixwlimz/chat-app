import { Button, Group, TextInput } from "@mantine/core"
import { FaPlus } from "react-icons/fa"

const Navbar = ({ onClick } : { onClick : () => void}) => {
    return (
        <Group justify="flex-end">
            <Button color='red' onClick={onClick}><FaPlus/></Button>
            <TextInput
              placeholder='Search....'
            />
        </Group>
        

    )
}

export default Navbar