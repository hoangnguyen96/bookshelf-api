"use client";

import { BookType, User } from "@app/models";
import { HttpClient } from "@app/services";
import { Box, Flex, Text } from "@chakra-ui/react";
import { TableList } from "../common";
import { useEffect, useState } from "react";

const ListSearch = async () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUserById = await HttpClient.get<User[]>(
          `/user?email=minh123@gmail.com`
        );
        const data = await HttpClient.get<BookType[]>("/books");

        setUser(dataUserById[0]);
        setBooks(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p="70px 44px">
      <Flex gap="90px" alignItems="center">
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
        <Text size="xl" fontWeight={500}>
          Status
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        gap="23px"
        mt="23px"
        justifyContent="space-between"
      >
        {books.map((itemBook: BookType) => {
          const {
            id,
            title,
            author,
            imageUrl,
            publicationYear,
            rating,
            edition,
          } = itemBook;

          return (
            <TableList
              key={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              idFavorite={user?.favorites.includes(id) || false}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default ListSearch;
