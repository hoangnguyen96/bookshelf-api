import { auth } from "@app/auth";
import { User } from "@app/models";
import { dividePaginationBooks } from "@app/utils";
import { SearchList } from "@app/features/dashboard/components";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";

const SearchPage = async () => {
  const session = await auth();
  const userById = (await getUserById(session?.user?.id as string)) as User;
  const allBooks = await getAllBook();
  const paginatedBooks = dividePaginationBooks(allBooks);

  return <SearchList list={paginatedBooks} user={userById} />;
};

export default SearchPage;
