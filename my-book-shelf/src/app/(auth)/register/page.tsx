"use client";

import { useCallback, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { authenticate } from "@app/actions/auth";
import bcrypt from "bcryptjs";

// Constants
import { MESSAGES, ROUTES } from "@app/constants";

// Api
import { addUser } from "@app/features/dashboard/actions";

// Models
import { User } from "@app/models";

// Utils
import { generateSevenDigitUUID } from "@app/utils";

// Components
import { FooterForm, FormRegister, HeadingForm } from "@app/components";

const RegisterPage = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(async (values: Partial<User>) => {
    const uuid = generateSevenDigitUUID();
    const { username, email, password } = values;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const payload: Partial<User> = {
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      phone: "",
      bio: "",
      avatar: "https://i.ibb.co/SKHPQYq/avatar-default.webp",
      favorites: [],
      shelfBooks: [],
      userId: uuid,
    };

    try {
      await addUser(payload);
      await authenticate({ email, password });

      toast({
        title: "Register Successful.",
        description: MESSAGES.REGISTER_SUCCESS,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push(ROUTES.HOME);
    } catch (error) {
      toast({
        title: "Register Failed!",
        description: MESSAGES.CREATE_FAILED,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, []);

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
        title="Registration"
        description="For Both Staff & Students"
      />
      <FormRegister onSubmit={handleSubmit} />
      <FooterForm
        text="Already a User?"
        textLink="Login now"
        pb="80px"
        link={ROUTES.LANDING_PAGE}
      />
    </Box>
  );
};

export default RegisterPage;
