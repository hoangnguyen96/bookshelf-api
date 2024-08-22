"use client";

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { Button, Checkbox, FooterForm, HeadingForm, Input } from "..";

const FormLogin = () => {
  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Box
      w={565}
      pt="63px"
      px="70px"
      bgColor="white"
      borderRadius="10px"
      boxShadow="0 0 5px 1px #efdfde"
    >
      <HeadingForm
        title="Welcome Back !"
        description="Sign in to continue to yourDigital Library"
      />
      <form style={{ marginTop: "40px" }}>
        <FormControl isInvalid={true} mb="24px">
          <FormLabel htmlFor="email" sx={{ fontSize: "16px", fontWeight: 600 }}>
            Email
          </FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Email..." id="email" />
            )}
          />
          {/* <FormErrorMessage mt="1px">error</FormErrorMessage> */}
        </FormControl>

        <FormControl isInvalid={true} mb="50px">
          <FormLabel
            htmlFor="password"
            sx={{ fontSize: "16px", fontWeight: 600 }}
          >
            Password
          </FormLabel>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Input
                {...field}
                isTypePassword={true}
                placeholder="Password..."
                id="password"
              />
            )}
          />
          {/* <FormErrorMessage mt="1px">error</FormErrorMessage> */}
        </FormControl>

        <Checkbox />
        <Button variant="full" text="Login" mt="40px" mb="60px" />
      </form>

      <FooterForm text="New User?" textLink="Register Here" pb="160px" />
    </Box>
  );
};

export default FormLogin;
