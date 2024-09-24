"use client";

import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { BookType, User } from "@app/models";
import { updateUserById } from "../actions";
import { filterBooksFavoriteByParams } from "@app/utils";
import { TableItem } from "@app/components";

interface MyBookShelfFavoritesByParamsProps {
  type?: string;
  value?: string;
  user: User;
  list: BookType[];
}

export const MyBookShelfFavoritesByParams = memo(
  ({ type, value, list, user }: MyBookShelfFavoritesByParamsProps) => {
    const [dataByFavorites, setDataByFavorites] = useState<BookType[]>([]);
    const router = useRouter();

    const fetchData = async () => {
      const filteredBooks = filterBooksFavoriteByParams(
        list,
        type as string,
        value as string
      );

      setDataByFavorites(filteredBooks);
    };

    useEffect(() => {
      fetchData();
    }, [type, value]);

    const handleUpdateFavorites = async (id: string) => {
      try {
        let listFavorite = user?.favorites;
        if (user?.favorites.includes(id)) {
          listFavorite = user?.favorites.filter((item) => item !== id);
        } else {
          listFavorite = [...(user?.favorites as string[]), id];
        }

        await updateUserById(user?.id as string, {
          ...user,
          favorites: listFavorite,
        });

        return router.refresh();
      } catch (error) {
        console.error("Failed to favorite book:", error);
      }
    };
    return (
      <Flex
        flexDir="column"
        gap="23px"
        mt="23px"
        justifyContent="space-between"
        overflow="hidden scroll"
        maxH="65vh"
      >
        {dataByFavorites.map((itemBook: BookType) => {
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
              status={user?.shelfBooks?.includes(id)}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              category={category}
              isFavorite={user?.favorites?.includes(id)}
              onUpdateFavorites={() => handleUpdateFavorites(id)}
            />
          );
        })}
      </Flex>
    );
  }
);
