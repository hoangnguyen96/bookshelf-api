import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { HttpClient } from "./services";
import bcrypt from "bcryptjs";
import { User as UserModel } from "./models";

const getUser = async (email: string): Promise<UserModel[] | []> => {
  try {
    const user = (await HttpClient.get(`/user?email=${email}`)) as [];
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return [];
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          const [foundUser, ...rest] = user;

          if (!foundUser || !foundUser.password) {
            console.log("User not found or user password missing");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            foundUser.password
          );

          if (passwordsMatch)
            return {
              id: foundUser.userId,
              name: foundUser.username,
              isAdmin: foundUser.isAdmin,
              image: foundUser.avatar,
              email: foundUser.email,
            };
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
