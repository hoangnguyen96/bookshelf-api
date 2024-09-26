"use client";

import { memo } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BookType, User } from "@app/models";
import { updateUserById } from "../actions";
import { Pagination } from "@app/components/common";
import { TableItem } from "@app/components";

interface SearchListProps {
  user: User;
  totalPages: number;
  list: BookType[];
}

export const SearchList = memo(
  ({ totalPages, list, user }: SearchListProps) => {
    const router = useRouter();

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
        <Pagination totalPages={totalPages} />
      </>
    );
  }
);
