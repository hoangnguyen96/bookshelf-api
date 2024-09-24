"use client";

import { TableItem } from "@app/components";
import { BookType, User } from "@app/models";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getBookByParams, updateUserById } from "../actions";
import { memo, useEffect, useState } from "react";
import {
  dividePaginationBooks,
  getDataByParams,
  getListDataByTypeAndValue,
} from "@app/utils";
import { Pagination } from "@app/components/common";

interface SearchListByParamsProps {
  type?: string;
  value?: string;
  user: User;
  list: BookType[][];
}

export const SearchListByParams = memo(
  ({ type, value, list, user }: SearchListByParamsProps) => {
    const [dataPagination, setDataPagination] = useState<BookType[][]>(list);
    const [listData, setListData] = useState<BookType[]>([]);
    const [pagination, setPagination] = useState<number>(0);
    const router = useRouter();

    const fetchData = async () => {
      try {
        let dataBookByParams: BookType[][] = [];
        if (type && value) {
          const dataParams = await getBookByParams(`${type}=${value}`);
          dataBookByParams = dividePaginationBooks(dataParams);
        }

        const listData: BookType[] = getListDataByTypeAndValue(
          type as string,
          value as string,
          dataBookByParams,
          list,
          pagination
        );

        const dataPagination = getDataByParams(
          type as string,
          value as string,
          dataBookByParams,
          list
        );

        setDataPagination(dataPagination);
        setListData(listData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [pagination, type, value]);

    const handleUpdateFavorites = async (id: string) => {
      try {
        let listFavorite = user?.favorites || [];
        if (user?.favorites?.includes(id)) {
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
          maxH="62vh"
        >
          {listData.map((itemBook: BookType) => {
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
          data={dataPagination}
          pagination={pagination}
          setPagination={setPagination}
        />
      </>
    );
  }
);
