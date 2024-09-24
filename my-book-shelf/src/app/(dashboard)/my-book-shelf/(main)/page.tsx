import { auth } from "@app/auth";
import { User } from "@app/models";
import { filterBooksOnShelf } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelf } from "@app/features/dashboard/components";

const MyBookShelfPage = async () => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const allBooks = await getAllBook();
  const shelfBooks = user?.shelfBooks || [];
  const booksOnShelf = filterBooksOnShelf(allBooks, shelfBooks);

  return <MyBookShelf list={booksOnShelf} user={user} />;
};

export default MyBookShelfPage;
