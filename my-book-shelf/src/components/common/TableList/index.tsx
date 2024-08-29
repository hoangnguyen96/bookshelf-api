"use client";

import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { book1 } from "@app/assets/images";
import { Button, HeartIcon, StatusBook } from "..";
import { useRouter } from "next/navigation";
import { ROUTES } from "@app/constants";

interface TableListProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
  edition: string;
  publicationYear: number;
  rating: number;
  idFavorite: boolean;
  isContribute?: boolean;
}

const TableList = ({
  id,
  title,
  author,
  imageUrl,
  edition,
  category,
  idFavorite,
  publicationYear,
  rating,
  isContribute = false,
}: TableListProps) => {
  const router = useRouter();

  const handleRedirectPreview = () => {
    router.push(isContribute ? ROUTES.CONTRIBUTE : `${ROUTES.PREVIEW}/${id}`);
  };

  return (
    <Flex
      bgColor="white"
      borderRadius="10px"
      boxShadow="0 0 5px 0px rgb(0 0 0 / 10%)"
      py="12px"
      px="24px"
      gap="90px"
      alignItems="center"
    >
      <Flex gap="47px" alignItems="center" maxW={329} w="100%">
        <Image
          src={imageUrl || book1}
          alt="Don't make me think"
          width={75}
          height={100}
        />
        <Flex flexDir="column">
          <Text size="xl" mb="20px">
            {title}
          </Text>
          <Flex mb="10px">
            <Text size="md">{author},</Text>
            <Text size="md">{publicationYear}</Text>
          </Flex>
          <Text size="xs">{edition} Edition</Text>
        </Flex>
      </Flex>
      <Flex gap="72px" alignItems="center" maxW={312} w="100%">
        <Text size="xl" w="60px">
          {rating}
          <Text as="span" size="md" color="dark.70">
            /5
          </Text>
        </Text>
        <Flex flexDir="column" gap="11px">
          <Text size="xl">{category}</Text>
          <Text size="md">UX Design</Text>
        </Flex>
      </Flex>
      {!isContribute && <StatusBook />}
      <Flex
        gap={isContribute ? "36px" : "64px"}
        alignItems="center"
        maxW={179}
        w="100%"
      >
        {!isContribute && <HeartIcon isFavorite={idFavorite} />}
        <Button
          size="sm"
          variant="outline"
          text="Preview"
          onClick={handleRedirectPreview}
        />
        {isContribute && <Button size="sm" variant="outline" text="Delete" />}
      </Flex>
    </Flex>
  );
};

export default TableList;
