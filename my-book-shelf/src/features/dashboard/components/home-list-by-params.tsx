"use client";

import { BookType, User } from "@app/models";
import { Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { getTwelveItemBook, updateUserById } from "../actions";
import { Cart } from "@app/components/common";

interface ListCartProps {
  type?: string;
  value?: string;
  user: User;
  list: BookType[];
}

export const ListCartByParams = memo(
  ({ type, value, list, user }: ListCartProps) => {
    const [listData, setListData] = useState<BookType[]>([]);
    const [dataUserById, setDataUserById] = useState<User>(user);
    const router = useRouter();

    const fetchData = async () => {
      try {
        let dataBookByParams: BookType[] = [];
        if (type && value) {
          dataBookByParams = await getTwelveItemBook(`${type}=${value}&`);
        }

        const listData: BookType[] =
          type && value ? dataBookByParams || [] : list || [];

        setListData(listData);
        setDataUserById(user);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [type, value]);

    const handleUpdateFavorites = async (id: string) => {
      try {
        let listFavorite = dataUserById?.favorites;
        if (dataUserById?.favorites.includes(id)) {
          listFavorite = dataUserById.favorites.filter((item) => item !== id);
        } else {
          listFavorite = [...(dataUserById?.favorites as string[]), id];
        }

        await updateUserById(dataUserById?.id as string, {
          ...dataUserById,
          favorites: listFavorite,
        });

        return router.refresh();
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    return (
      <Grid p="70px 44px" gridTemplateColumns="repeat(6, 1fr)" gap="40px 10px">
        {listData.map((item: BookType) => {
          const { id, title, author, imageUrl, publicationYear, rating } = item;

          return (
            <Cart
              key={id}
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              publicationYear={publicationYear}
              rating={rating}
              isFavorite={dataUserById?.favorites?.includes(id)}
              onUpdateFavorites={() => handleUpdateFavorites(id)}
            />
          );
        })}
      </Grid>
    );
  }
);
