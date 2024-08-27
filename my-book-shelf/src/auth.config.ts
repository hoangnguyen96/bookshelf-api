import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith("/home");

      if (isOnHome) {
        if (isLoggedIn) return true;
        return false;
      }
      console.log("nextUrl authorized 1: ");

      if (isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
      }

      console.log("nextUrl authorized 2: ");
      return true;
    },

    async signIn(user, account, profile) {
      console.log("signIn =============== ");
      const { user: userDetail } = user;
      console.log("userDetail: ", userDetail);
      return true;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60, // 1p
  },

  providers: [],
} satisfies NextAuthConfig;
