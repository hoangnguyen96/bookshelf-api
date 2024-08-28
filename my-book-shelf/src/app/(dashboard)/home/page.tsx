import { auth } from "@app/auth";
import { Flex } from "@chakra-ui/react";
import { BookType, User } from "@app/models";
import { HttpClient } from "@app/services";
import { Cart } from "@app/components/common";

const HomePage = async () => {
  const session = await auth();
  const dataUserById = await HttpClient.get<User[]>(
    `/user?userId=${session?.user?.id}`
  );
  const data = await HttpClient.get<BookType[]>("/books");
  console.log("session-000", session);

  return (
    <Flex p="70px 44px" justifyContent="space-between">
      {data.map((item: BookType) => {
        const { id, title, author, imageUrl, publicationYear, rating } = item;

        return (
          <Cart
            key={id}
            title={title}
            author={author}
            imageUrl={imageUrl}
            publicationYear={publicationYear}
            rating={rating}
            isFavorite={dataUserById[0]?.favorites.includes(id) || false}
          />
        );
      })}
    </Flex>
  );
};

export default HomePage;
