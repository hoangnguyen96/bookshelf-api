import { Box, Flex } from "@chakra-ui/react";
import { Logo, Navbar } from "@app/components/common";
import { TopContent } from "@app/components";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Flex bgColor="white" borderRadius="10px" height="100%">
      <Flex
        flexDir="column"
        gap="100px"
        padding="38px 66px"
        alignItems="center"
      >
        <Logo />
        <Navbar />
      </Flex>
      <Box
        w="100%"
        h="100%"
        bgColor="backgroundContent"
        borderRightRadius="10px"
      >
        <TopContent />
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
