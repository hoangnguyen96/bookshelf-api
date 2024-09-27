import { Box, Flex, Skeleton } from "@chakra-ui/react";

const SkeletonProfile = () => (
  <Box p="5px 44px 20px">
    <Flex
      flexDir="column"
      bgColor="white"
      borderRadius="10px"
      width="100%"
      maxW={1136}
      p="48px 24px 24px"
      boxShadow="0 0 5px 1px rgb(0 0 0 / 10%)"
    >
      <Skeleton ml="9px" w="200px" h={25} borderRadius="10px" />
      <Flex
        flexDir="column"
        alignItems="center"
        alignSelf="flex-start"
        mt="50px"
      >
        <Skeleton ml="9px" w="300px" h={185} borderRadius="10px" mb="34px" />
      </Flex>
      <Flex alignItems="center" gap="40px" justifyContent="center" mt="50px">
        <Skeleton ml="9px" w="100%" h={45} borderRadius="10px" mb="34px" />
        <Skeleton ml="9px" w="100%" h={45} borderRadius="10px" mb="30px" />
      </Flex>
      <Flex alignItems="center" gap="40px" justifyContent="center">
        <Skeleton ml="9px" w="100%" h={45} borderRadius="10px" mb="34px" />
        <Skeleton ml="9px" w="100%" h={45} borderRadius="10px" mb="34px" />
      </Flex>
      <Skeleton ml="9px" w="100%" h={100} borderRadius="10px" mb="34px" />
      <Skeleton ml="9px" w="200px" h={50} borderRadius="10px" mb="34px" />
    </Flex>
  </Box>
);

export default SkeletonProfile;
