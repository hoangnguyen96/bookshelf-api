"use client";

import { memo } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@app/constants";
import { BookType, User } from "@app/interface";
import { updateUserById } from "../../actions";
import { TableItem } from "@app/components";
import isEqual from "react-fast-compare";

interface MyBookShelfFavoritesProps {
  user: User;
  list: BookType[];
}

const MyBookShelfFavoritesComponent = ({
  list,
  user,
}: MyBookShelfFavoritesProps) => {
  const router = useRouter();

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
      if (error instanceof Error) {
        return error.message;
      }
      return MESSAGES.RESPONSE_ERROR;
    }
  };

  return (
    <Flex flexDir="column" gap="23px" justifyContent="space-between">
      {list.map((itemBook: BookType) => {
        const {
          id,
          title,
          author,
          imageUrl,
          publicationYear,
          rating,
          edition,
          category,
        } = itemBook || {};

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
};

const areEqual = (
  prevProps: MyBookShelfFavoritesProps,
  nextProps: MyBookShelfFavoritesProps
) => {
  return (
    isEqual(prevProps.user, nextProps.user) &&
    isEqual(prevProps.list, nextProps.list)
  );
};

export const MyBookShelfFavorites = memo(
  MyBookShelfFavoritesComponent,
  areEqual
);
