import { Box, Link } from "@chakra-ui/react";
import {
  Avatar,
  Button,
  Checkbox,
  ContributeComplete,
  Input,
  Logo,
  MenuProfile,
  ModalSuccessProgress,
  SearchBar,
} from "@app/components/common";
import IconHeart from "@app/components/common/HeartIcon";

export default function Home() {
  return (
    <main>
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
      <Box w={559} h={559} background="#ffffff">
        <Logo />
        <Button>Add</Button>
        <Input placeholder="Text..." />
        <Input placeholder="Password..." isTypePassword={true} />
        <SearchBar />
        <Checkbox />
        <IconHeart />
        <MenuProfile />
      </Box>
      <ContributeComplete />
      <ModalSuccessProgress />

      <Avatar />
    </main>
  );
}
