"use client";
import { Button, Card, Center, Flex, Group, PasswordInput, TextInput, Title, UnstyledButton } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter()

  return (
    <Center p={20}>
      <Card withBorder p={10}>
        <Form form={form} style={{ width: 500 }}>
          <Flex direction="column" gap={10}>
            <Title order={3}>Register</Title>
            <TextInput
              label="Name"
              placeholder="Name"
              key={form.key("name")}
              {...form.getInputProps("name")}
              withAsterisk
            />
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
                onClick={() => router.push("/login")}
              >
                Login
              </UnstyledButton>
              <Button type="submit" mt={10} color="red">
                Register
              </Button>
            </Group>
          </Flex>
        </Form>
      </Card>
    </Center>
  );
}
