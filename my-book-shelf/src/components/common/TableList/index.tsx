import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { book1 } from "@app/assets/images";
import { Button, HeartIcon } from "..";

interface TableListProps {
  isContribute?: boolean;
}

const TableList = ({ isContribute = false }: TableListProps) => {
  return (
    <Flex
      bgColor="white"
      borderRadius="10px"
      boxShadow="0 0 5px 1px #efdfde"
      py="12px"
      px="24px"
      gap="90px"
      alignItems="center"
    >
      <Flex gap="47px" alignItems="center">
        <Image src={book1} alt="Don't make me think" width={75} />
        <Flex flexDir="column">
          <Text size="xl" mb="20px">
            Don’t Make Me think
          </Text>
          <Flex mb="10px">
            <Text size="md">Steve Krug,</Text>
            <Text size="md">2000</Text>
          </Flex>
          <Text size="xs">Second Edition</Text>
        </Flex>
      </Flex>
      <Flex gap="72px" alignItems="center">
        <Text size="xl">
          4.5
          <Text as="span" size="md" color="dark.70">
            /5
          </Text>
        </Text>
        <Flex flexDir="column" gap="11px">
          <Text size="xl">Computer Science</Text>
          <Text size="md">UX Design</Text>
        </Flex>
      </Flex>
      {!isContribute && (
        <Box w={85} height={26} bgColor="green.100" borderRadius="5px">
          <Text size="md" color="white" lineHeight="26px" textAlign="center">
            In-Shelf
          </Text>
        </Box>
      )}
      <Flex gap={isContribute ? "36px" : "64px"} alignItems="center">
        {!isContribute && <HeartIcon />}
        <Button size="sm" variant="outline" text="Preview" />
        {isContribute && <Button size="sm" variant="outline" text="Delete" />}
      </Flex>
    </Flex>
  );
};

export default TableList;
