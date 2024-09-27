import { SkeletonSearchList } from "@app/components";
import { Box, Flex, Skeleton } from "@chakra-ui/react";

const Loading = () => (
  <Box p="20px 44px">
    <Skeleton ml="9px" w="200px" h={25} borderRadius="10px" />
    <Flex gap="10%" alignItems="center" mt="66px">
      <Skeleton w="100%" maxW={352} h={25} borderRadius="10px" />
      <Flex gap="10%" w="100%" maxW={312}>
        <Skeleton w="100%" h={25} borderRadius="10px" />
        <Skeleton w="100%" h={25} borderRadius="10px" />
      </Flex>
    </Flex>
    <Flex
      flexDir="column"
      gap="23px"
      mt="23px"
      justifyContent="space-between"
      maxH="65vh"
    >
      <SkeletonSearchList />
    </Flex>
  </Box>
);

export default Loading;
