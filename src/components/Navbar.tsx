import {
  Button,
  Group,
  TextInput,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { ChangeEventHandler } from "react";
import { CiDark } from "react-icons/ci";
import { FaPlus, FaRegUserCircle } from "react-icons/fa";

type NavbarProps = {
  onClick: () => void;
  search: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Navbar = ({ onClick, search, onChange }: NavbarProps) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const router = useRouter();

  return (
    <Group justify="flex-end">
      <Button color="red" onClick={onClick}>
        <FaPlus />
      </Button>
      <TextInput placeholder="Search...." value={search} onChange={onChange} />
      {colorScheme === "light" ? (
        <Button color="red" onClick={() => setColorScheme("dark")}>
          <CiDark />
        </Button>
      ) : (
        <Button
          color="red"
          variant="outline"
          onClick={() => setColorScheme("light")}
        >
          <CiDark />
        </Button>
      )}

      <UnstyledButton mt={5} onClick={() => router.push("/profile")}>
        <FaRegUserCircle size={30}  />
      </UnstyledButton>
    </Group>
  );
};

export default Navbar;
