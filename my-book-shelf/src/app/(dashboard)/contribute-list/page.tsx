"use client";

import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { HttpClient } from "@app/services";
import { BookType, User } from "@app/models";
import { TableList } from "@app/components/common";

const ContributeList = async () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dataUserById = await HttpClient.get<User[]>(
    `/user?userId=${session?.user?.id}`
  );
  const data = await HttpClient.get<BookType[]>("/books");

  return (
    <Box p="20px 44px">
      <Link href="#" onClick={() => router.back()}>
        <ArrowBackIcon w={5} h={5} />
        <Text as="span" ml="9px">
          Back
        </Text>
      </Link>

      <Flex gap="90px" alignItems="center" mt="66px">
        <Text size="xl" fontWeight={500} w="100%" maxW={352}>
          Title
        </Text>
        <Flex gap="60px" w="100%" maxW={312}>
          <Text size="xl" fontWeight={500}>
            Ratings
          </Text>
          <Text size="xl" fontWeight={500}>
            Category
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        gap="23px"
        mt="23px"
        justifyContent="space-between"
      >
        {data.map((itemBook: BookType) => {
          const {
            id,
            title,
            author,
            imageUrl,
            publicationYear,
            rating,
            edition,
            category,
          } = itemBook;

          return (
            <TableList
              key={id}
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              isContribute={true}
              category={category}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              idFavorite={dataUserById[0]?.favorites.includes(id) || false}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default ContributeList;
