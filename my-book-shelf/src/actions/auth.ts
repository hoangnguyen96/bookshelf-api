"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@app/auth";
import { ERROR_MESSAGES } from "@app/constants";
import { User } from "@app/models";

export const authenticate = async (formData: Partial<User>) => {
  console.log("-form:", formData);

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return ERROR_MESSAGES.EMAIL_PASSWORD_INVALID;
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut();
};
