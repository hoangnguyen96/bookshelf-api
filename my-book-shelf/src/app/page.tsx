import { Box, Link } from "@chakra-ui/react";
import {
  Avatar,
  Button,
  Cart,
  CartBorrow,
  Checkbox,
  ContributeComplete,
  FormLogin,
  FormRegister,
  Input,
  Logo,
  MenuProfile,
  ModalSuccessProgress,
  Navbar,
  SearchBar,
} from "@app/components/common";
import IconHeart from "@app/components/common/HeartIcon";

export default function Home() {
  return (
    <main>
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
      <Box w={800} background="#ffffff" p="40px" mb="50px">
        <Logo />
        <Button>Add</Button>
        <Input placeholder="Text..." />
        <Input placeholder="Password..." isTypePassword={true} />
        <SearchBar />
        <Checkbox />
        <IconHeart />
        <MenuProfile />
        <Cart />
        <br />
        <CartBorrow />
        <br />
        <FormLogin />
        <br />
        <FormRegister />
        <br />
        <Navbar />
      </Box>
      <ContributeComplete />
      <ModalSuccessProgress />

      <Avatar />
    </main>
  );
}
