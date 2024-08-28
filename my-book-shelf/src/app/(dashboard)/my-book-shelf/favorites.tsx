import { auth } from "@app/auth";
import { Box, Flex, Text } from "@chakra-ui/react";
import { BookType, User } from "@app/models";
import { HttpClient } from "@app/services";
import { TableList } from "@app/components/common";

const Favorites = async () => {
  const session = await auth();
  const dataUserById = await HttpClient.get<User[]>(
    `/user?userId=${session?.user?.id}`
  );
  const data = await HttpClient.get<BookType[]>("/books");

  console.log("dataUserById-shelf", dataUserById[0].favorites);

  return (
    <Flex flexDir="column" gap="23px" mt="23px" justifyContent="space-between">
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
  );
};

export default Favorites;
