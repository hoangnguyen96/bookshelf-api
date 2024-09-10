"use client";

import {
  getAllBook,
  getBookById,
  getUserById,
  updateBookById,
  updateUserById,
} from "@app/api";
import { CartBorrow } from "@app/components/common";
import { BookType, User } from "@app/models";
import { filterBooksOnShelf, filterBooksOnShelfByParams } from "@app/utils";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyBookShelfByParams = ({ params }: { params: { slug: string[] } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dataByShelf, setDataByShelf] = useState<BookType[]>([]);
  const [dataUserById, setDataUserById] = useState<User>();
  const type = params.slug[0];
  const value = params.slug[1];

  const fetchData = async () => {
    try {
      const user = (await getUserById(session?.user?.id || "")) as User;
      const allBooks = await getAllBook();
      const shelfBooks = user?.shelfBooks || [];
      const booksOnShelf = filterBooksOnShelf(allBooks, shelfBooks);

      const filteredBooks = filterBooksOnShelfByParams(
        booksOnShelf,
        type,
        value
      );

      setDataUserById(user);
      setDataByShelf(filteredBooks);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.id, type, value]);

  const handleReturnBook = async (id: string) => {
    if (!dataUserById) return;

    try {
      const dataBookById = await getBookById(id);
      const updateShelfBook = dataUserById.shelfBooks.filter(
        (item: string) => item !== id
      );

      await updateUserById(dataUserById.id, {
        ...dataUserById,
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
};

export default MyBookShelfByParams;
