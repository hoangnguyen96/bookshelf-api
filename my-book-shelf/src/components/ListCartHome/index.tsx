import { Flex } from "@chakra-ui/react";

// Models
import { BookType } from "@app/models";

// Services
import { HttpClient } from "@app/services";

// Component
import { Cart } from "../common";

const ListCartHome = async () => {
  const data = await HttpClient.get<BookType[]>("/books");
  console.log("data-2222", data);

  return (
    <Flex p="70px 44px" justifyContent="space-between">
      {data.map((item: BookType) => {
        const { title, author, imageUrl, publicationYear, rating } = item;

        return (
          <Cart
            key={title}
            title={title}
            author={author}
            imageUrl={imageUrl}
            publicationYear={publicationYear}
            rating={rating}
          />
        );
      })}
    </Flex>
  );
};

export default ListCartHome;
