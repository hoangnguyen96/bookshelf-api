"use client";

import { FooterForm, FormLogin, HeadingForm } from "@app/components";
import { MESSAGES, ROUTES } from "@app/constants";
import { User } from "@app/models";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { authenticate } from "../actions";

export const Login = () => {
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (formData: Partial<User>) => {
    const errorMessage = await authenticate(formData);

    if (errorMessage) {
      toast({
        title: "Login failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login successful",
        description: MESSAGES.LOGIN_SUCCESS,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(ROUTES.HOME);
    }
  };
  return (
    <Box
      w="100%"
      maxW="565px"
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
      <FormLogin onSubmit={handleLogin} />
      <FooterForm
        text="New User?"
        textLink="Register Here"
        pb="160px"
        link={ROUTES.REGISTER}
      />
    </Box>
  );
};