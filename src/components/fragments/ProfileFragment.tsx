import { Container, Flex, Image, Text } from "@mantine/core"

type ProfileFragmentProps = {
    avatar : string 
    name : string 
    email : string
}

const ProfileFragment = ({avatar, name, email} : ProfileFragmentProps) => {

    return (
      <Container fluid m={10}>
        <Image alt="" src={avatar} radius='xl' h={100} w={100}/>
        <Flex direction='column' mt={10}>
          <Text style={{ fontSize: 20 }} fw={700}>
            Name : {name}
          </Text>
          <Text style={{ fontSize : 20 }} fw={700}>Email : {email}</Text>
        </Flex>
      </Container>
    );
}

export default ProfileFragment