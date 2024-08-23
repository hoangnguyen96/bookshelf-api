import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { Box, Flex } from "@chakra-ui/react";
import { Logo, Navbar } from "@app/components/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Book Shelf",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>

      <body className={inter.className}>
        <Providers>
          <main className="app" style={{ padding: "48px 35px 38px" }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
