import { auth } from "@app/auth";
import { TableList } from "@app/components/common";
import { BookType, User } from "@app/models";
import { HttpClient } from "@app/services";
import { Box, Flex, Text } from "@chakra-ui/react";

const SearchPage = async () => {
  const session = await auth();
  const dataUserById = await HttpClient.get<User[]>(
    `/user?userId=${session?.user?.id}`
  );
  const data = await HttpClient.get<BookType[]>("/books");

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
        {data.map((itemBook: BookType) => {
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
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
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

export default SearchPage;
