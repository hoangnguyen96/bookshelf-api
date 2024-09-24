"use client";

import { memo, useEffect, useState } from "react";
import { BookType, User } from "@app/models";
import { Flex } from "@chakra-ui/react";
import { CartBorrow } from "@app/components";
import { getBookById, updateBookById, updateUserById } from "../actions";
import { useRouter } from "next/navigation";
import { filterBooksOnShelfByParams } from "@app/utils";

interface MyBookShelfByParamsProps {
  type?: string;
  value?: string;
  user: User;
  list: BookType[];
}

export const MyBookShelfByParams = memo(
  ({ type, value, list, user }: MyBookShelfByParamsProps) => {
    const [dataByShelf, setDataByShelf] = useState<BookType[]>([]);
    const router = useRouter();

    const fetchData = () => {
      const filteredBooks = filterBooksOnShelfByParams(
        list,
        type as string,
        value as string
      );

      setDataByShelf(filteredBooks);
    };

    useEffect(() => {
      fetchData();
    }, [type, value]);

    const handleReturnBook = async (id: string) => {
      try {
        const dataBookById = await getBookById(id);
        const updateShelfBook = user?.shelfBooks.filter(
          (item: string) => item !== id
        );

        await updateUserById(user?.id as string, {
          ...user,
          shelfBooks: updateShelfBook,
        });

        await updateBookById(id, {
          ...dataBookById,
          status: false,
        });
        return router.refresh();
      } catch (error) {
        console.error("Failed to return book:", error);
      }
    };

    return (
      <Flex gap="40px" flexWrap="wrap" overflow="hidden scroll" maxH="65vh">
        {dataByShelf.map((item) => {
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
              id={id}
              title={title}
              author={author}
              publicationYear={publicationYear}
              rating={rating}
              imgUrl={imageUrl}
              createDate={createdDate}
              onReturnBook={handleReturnBook}
            />
          );
        })}
      </Flex>
    );
  }
);
