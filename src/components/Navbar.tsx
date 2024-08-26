import { Button, Group, TextInput } from "@mantine/core"
import { ChangeEventHandler } from "react";
import { FaPlus } from "react-icons/fa"

type NavbarProps = {
  onClick: () => void;
  search: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};


const Navbar = ({ onClick, search, onChange} : NavbarProps ) => {

    
    return (
        <Group justify="flex-end">
            <Button color='red' onClick={onClick}><FaPlus/></Button>
            <TextInput
              placeholder='Search....'
              value={search}
              onChange={onChange}
            />
        </Group>
        

    )
}

export default Navbar