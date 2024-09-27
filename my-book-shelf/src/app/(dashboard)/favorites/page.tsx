import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { filterBooksFavorite } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";

const MyBookShelfFavoritesPage = async () => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const books = (await getAllBook()) as BookType[];
  const favorites = user?.favorites || [];
  const booksByFavorites = filterBooksFavorite(books, favorites);

  return <MyBookShelfFavorites list={booksByFavorites} user={user} />;
};

export default MyBookShelfFavoritesPage;