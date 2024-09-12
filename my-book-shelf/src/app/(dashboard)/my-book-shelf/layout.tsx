"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { HeadingFavorites } from "@app/components";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Flex p="18px 44px" flexDir="column" height="80%">
    <Text size="xxl">
      Your{" "}
      <Text as="span" size="xxl" color="brand.70">
        Shelf
      </Text>
    </Text>
    <Flex flexDir="column" mt="37px" height="100%">
      <HeadingFavorites />
      <Box mt="34px" height="100%">
        {children}
      </Box>
    </Flex>
  </Flex>
);

export default Layout;