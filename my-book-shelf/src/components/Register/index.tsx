"use client";

import { Box } from "@chakra-ui/react";
import { FooterForm, FormRegister, HeadingForm } from "../common";
import { useCallback } from "react";
import { User } from "@app/models";
import { generateSevenDigitUUID } from "@app/utils";
import { HttpClient } from "@app/services";

// Components

const Register = () => {
  const handleSubmit = useCallback(async (values: Partial<User>) => {
    const uuid = generateSevenDigitUUID();
    const { username, email, password } = values;

    const payload: Partial<User> = {
      username,
      email,
      password,
      isAdmin: false,
      phone: "",
      bio: "",
      avatar: "https://i.ibb.co/88X1WfZ/avatar-default.png",
      favorites: [],
      shelfBooks: [],
      userId: uuid,
    };

    try {
      //TODO: Handle success (e.g., redirect, clear form, show message)
      await HttpClient.post("/user", payload);
    } catch (error) {
      throw new Error("Failed to add user!");
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
      <FooterForm text="Already a User?" textLink="Login now" pb="80px" />
    </Box>
  );
};

export default Register;
