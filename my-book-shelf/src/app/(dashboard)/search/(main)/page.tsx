import { auth } from "@app/auth";
import { User } from "@app/models";
import { SearchList } from "@app/features/dashboard/components";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";

const SearchPage = async () => {
  const session = await auth();
  const userById = (await getUserById(session?.user?.id as string)) as User;
  const paginatedBooks = await getPaginatedBook();

  return <SearchList list={paginatedBooks} user={userById} />;
};

export default SearchPage;
