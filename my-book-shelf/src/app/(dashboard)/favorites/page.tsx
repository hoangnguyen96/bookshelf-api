import { auth } from "@app/auth";
import { filterBooksFavorite, filterBooksFavoriteByParams } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";
import { Metadata } from "next";
import { BookType, User } from "@app/interface";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const MyBookShelfFavoritesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  const type = Object.keys(searchParams)[0];
  const value = Object.values(searchParams)[0];
  let user = null;
  let books = [];

  try {
    const { data: userData } = await getUserById(session?.user?.id as string);
    const { data: booksData } = await getAllBook();

    user = userData;
    books = booksData;
  } catch (error) {
    user = {} as User;
    books = [] as BookType[];
  }

  const favorites = user?.favorites || [];
  const booksByFavorites = filterBooksFavorite(books, favorites);
  const filteredBooks =
    type && value
      ? filterBooksFavoriteByParams(booksByFavorites, type, value as string)
      : booksByFavorites;

  return <MyBookShelfFavorites list={filteredBooks} user={user} />;
};

export default MyBookShelfFavoritesPage;
