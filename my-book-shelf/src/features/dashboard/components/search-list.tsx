"use client";

import { memo, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BookType, User } from "@app/models";
import { updateUserById } from "../actions";
import { Pagination } from "@app/components/common";
import { TableItem } from "@app/components";

interface SearchListProps {
  user: User;
  list: BookType[][];
}

export const SearchList = memo(({ list, user }: SearchListProps) => {
  const [pagination, setPagination] = useState<number>(0);
  const [listPage, setListPage] = useState<BookType[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setListPage(list[pagination]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const handleUpdateFavorites = async (id: string) => {
    try {
      let listFavorite = user?.favorites;
      if (user?.favorites.includes(id)) {
        listFavorite = user.favorites.filter((item) => item !== id);
      } else {
        listFavorite = [...(user?.favorites as string[]), id];
      }

      await updateUserById(user?.id as string, {
        ...user,
        favorites: listFavorite,
      });

      return router.refresh();
    } catch (error) {
      console.error("Failed to update favorite book:", error);
    }
  };

  return (
    <>
      <Flex
        flexDir="column"
        gap="23px"
        mt="23px"
        justifyContent="space-between"
        overflowY="scroll"
        maxH="75%"
      >
        {listPage.map((itemBook: BookType) => {
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
            <TableItem
              key={id}
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              category={category}
              status={user?.shelfBooks?.includes(id)}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              isFavorite={user?.favorites?.includes(id) || false}
              onUpdateFavorites={() => handleUpdateFavorites(id)}
            />
          );
        })}
      </Flex>
      <Pagination
        data={list}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
});
