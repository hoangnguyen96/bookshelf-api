import { Flex } from "@chakra-ui/react";
import { BookType } from "@app/models";
import { HttpClient } from "@app/services";
import { CartBorrow } from "@app/components/common";

const Books = async () => {
  const data = await HttpClient.get<BookType[]>("/books");

  return (
    <Flex gap="69px">
      {data.map((item) => {
        const {
          id,
          title,
          author,
          publicationYear,
          rating,
          imageUrl,
          createdDate,
        } = item;

        return (
          <CartBorrow
            key={id}
            title={title}
            author={author}
            publicationYear={publicationYear}
            rating={rating}
            imgUrl={imageUrl}
            createDate={createdDate}
          />
        );
      })}
    </Flex>
  );
};

export default Books;
