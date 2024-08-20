import { Box, Link } from "@chakra-ui/react";
import { Avatar, Button, Input, SearchBar } from "@app/components/common";

export default function Home() {
  return (
    <main>
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
      <Box w={559} h={559} background="#ffffff">
        <Button>Add</Button>
        <Input placeholder="accc" />
        <Input placeholder="okkkkkkkkkkk" isTypePassword={true} />
        <SearchBar />
      </Box>

      <Avatar />
    </main>
  );
}
