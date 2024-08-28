import type {
  NextAuthConfig,
  Session as NextAuthSession,
  User as NextAuthUser,
} from "next-auth";

export interface CustomUser extends NextAuthUser {
  id: string;
  isAdmin: boolean;
}

export interface CustomSession extends NextAuthSession {
  user: CustomUser;
  accessToken: string;
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith("/home");
      const isOnSearch = nextUrl.pathname.startsWith("/search");
      const isOnBookShelf = nextUrl.pathname.startsWith("/my-book-shelf");
      const isOnContribute = nextUrl.pathname.startsWith("/contribute");
      const isOnPreview = nextUrl.pathname.startsWith("/preview");

      if (
        isOnHome ||
        isOnSearch ||
        isOnBookShelf ||
        isOnContribute ||
        isOnPreview
      ) {
        if (isLoggedIn) return true;
        return false;
      }
      console.log("nextUrl authorized 1: ");

      if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      console.log("nextUrl authorized 2: ");
      return true;
    },

    async session({ session, token }) {
      Object.assign(session.user, token);
      return session;
    },

    async jwt({ token, user }) {
      if (token) Object.assign(token, user);
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1d
  },

  providers: [],
} satisfies NextAuthConfig;
