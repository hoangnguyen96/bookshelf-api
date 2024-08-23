import { Box } from "@chakra-ui/react";
import { FooterForm, FormLogin, HeadingForm } from "../common";

const Login = () => {
  return (
    <Box
      w="100%"
      maxW={565}
      pt="63px"
      px="70px"
      bgColor="white"
      borderRadius="10px"
      boxShadow="0 0 5px 1px rgb(0 0 0 / 25%)"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <HeadingForm
        title="Welcome Back !"
        description="Sign in to continue to yourDigital Library"
      />
      <FormLogin />
      <FooterForm text="New User?" textLink="Register Here" pb="160px" />
    </Box>
  );
};

export default Login;
