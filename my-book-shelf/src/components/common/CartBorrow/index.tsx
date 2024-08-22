import { book1 } from "@app/assets/images";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Button } from "..";

const CartBorrow = () => {
  return (
    <Flex
      gap="25px"
      w={308}
      h="auto"
      py="15px"
      pl="15px"
      pr="20px"
      bgColor="white"
      borderRadius="10px"
      boxShadow="0 0 5px 1px #efdfde"
    >
      <Flex flexDirection="column" gap="5px" w={123}>
        <Image src={book1} alt="Don't make me think" />
        <Text size="sm">Don’t Make Me think</Text>
        <Flex>
          <Text size="xs">Steve Krug,</Text>
          <Text size="xs">2000</Text>
        </Flex>
        <Flex>
          <Text size="xs">4.5/</Text>
          <Text size="xs" color="dark.70">
            5
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" justifyContent="space-between">
        <Box>
          <Text size="md" mb="10px">
            Borrowed on
          </Text>
          <Text size="xs">11 Mar 2023 09:00 AM</Text>
        </Box>
        <Button
          variant="outline"
          size="md"
          w={125}
          boxShadow="none"
          text="Return"
        />
      </Flex>
    </Flex>
  );
};

export default CartBorrow;
