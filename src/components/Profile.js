import { Card, CardBody, Text, Image } from "@chakra-ui/react";

export default function Profile({ profile }) {
  return (
    <Card
      as="a"
      href={profile.url}
      target="_blank"
      _hover={{ bg: "gray.100" }}
      bg="gray.50"
    >
      <CardBody
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="2rem"
      >
        <Image
          src={profile.image}
          alt=""
          boxSize={["3.5rem", "4rem"]}
          borderRadius="md"
        />
        <Text fontSize={["1rem", "1.5rem"]}>{profile.login}</Text>
      </CardBody>
    </Card>
  );
}
