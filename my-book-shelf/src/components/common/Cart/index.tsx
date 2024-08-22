import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { book1 } from "@app/assets/images";
import { HeartIcon } from "..";

const Cart = () => {
  return (
    <Flex
      w={160}
      flexDirection="column"
      gap="5px"
      h="auto"
      px="15px"
      pt="15px"
      pb="13px"
      bgColor="white"
      borderRadius="10px"
      boxShadow="0 0 5px 1px #efdfde"
      position="relative"
    >
      <Image src={book1} alt="Don't make me think" width={130} />
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
      <HeartIcon position="absolute" right="10px" bottom="5px" />
    </Flex>
  );
};

export default Cart;
