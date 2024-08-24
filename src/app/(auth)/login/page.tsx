"use client";
import useLogin, { LoginRequest } from "@/hooks/users/use-login";
import {
  Button,
  Card,
  Center,
  Flex,
  Group,
  PasswordInput,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value: string) => {
        if (!value.trim()) {
          return "Email must not be empty ";
        }
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          return "Please enter valid email";
        }

        return null;
      },
    },
  });
  const { loginMutate } = useLogin()
  const router = useRouter();

  const handleLogin = (req : LoginRequest) => {
     form.validate()
     loginMutate(req, {
       onSuccess : (data) => {
        sessionStorage.setItem('token', data.data.token)
        router.push('/')
       },
       onError : (err) => {
        console.log(err)
        router.push('/login')
       }
     })
     
  }

  return (
    <Center p={20}>
      <Card withBorder p={10}>
        <Form form={form} style={{ width: 500 }} onSubmit={val => {
          console.log(val)
           handleLogin(val);
        }}>
          <Flex direction="column" gap={10}>
            <Title order={3}>Login</Title>
            <TextInput
              label="Email"
              placeholder="Email"
              key={form.key("email")}
              {...form.getInputProps("email")}
              withAsterisk
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
              withAsterisk
            />

            <Group align="end">
              <UnstyledButton
                type="button"
                onClick={() => router.push("/register")}
              >
                Register
              </UnstyledButton>
              <Button type="submit" mt={10} color="red">
                Login
              </Button>
            </Group>
          </Flex>
        </Form>
      </Card>
    </Center>
  );
}
