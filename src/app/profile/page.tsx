"use client"
import protectedRoute from "@/middleware/protected-route";
import { Button, Container, Group, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

function ProfilePage(){


    const router = useRouter()

    return (
        <Container p={20}>
        <Group>
            <Button color='red' onClick={() => router.push('/')}>Back</Button>
             <Text size='xl' fw={700}>Profile</Text>
        </Group>

        </Container>
    )


}

export default protectedRoute(ProfilePage)