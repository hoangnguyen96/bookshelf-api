import { Box, Flex, Skeleton } from "@chakra-ui/react";

const SkeletonMyBookShelf = () => (
  <Box p="20px 44px" h="80%">
    <Flex gap="76px" mt="20px" h="100%" justifyContent="space-between">
      <Skeleton maxW={274} width="100%" height={405} borderRadius="10px" />
      <Skeleton maxW={503} width="100%" height={405} borderRadius="10px" />
      <Skeleton maxW={445} width="100%" height={418} borderRadius="10px" />
    </Flex>
  </Box>
);

export default SkeletonMyBookShelf;
