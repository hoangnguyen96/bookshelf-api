"use client";

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { Button, Checkbox, FooterForm, HeadingForm, Input } from "..";

const FormRegister = () => {
  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        title="Registration"
        description="For Both Staff & Students"
      />
      <form onSubmit={() => {}} style={{ marginTop: "40px" }}>
        {/* Name */}
        <FormControl isInvalid={true} mb="24px">
          <FormLabel htmlFor="name" sx={{ fontSize: "16px", fontWeight: 600 }}>
            Name
          </FormLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Username..." id="name" />
            )}
          />
          {/* <FormErrorMessage mt="1px">error</FormErrorMessage> */}
        </FormControl>

        {/* Email */}
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

        {/* Password */}
        <FormControl isInvalid={true} mb="24px">
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

        {/* Confirm Password */}
        <FormControl isInvalid={true}>
          <FormLabel
            htmlFor="confirmPassword"
            sx={{ fontSize: "16px", fontWeight: 600 }}
          >
            Confirm Password
          </FormLabel>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: "Confirm Password is required" }}
            render={({ field }) => (
              <Input
                {...field}
                isTypePassword={true}
                placeholder="ConfirmPassword..."
                id="confirmPassword"
              />
            )}
          />
          {/* <FormErrorMessage mt="1px">error</FormErrorMessage> */}
        </FormControl>
        <Button variant="full" text="Register" my="40px" />
      </form>

      <FooterForm text="New User?" textLink="Register Here" pb="80px" />
    </Box>
  );
};

export default FormRegister;
