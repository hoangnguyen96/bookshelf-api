import { Suspense } from "react";
import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { SearchList } from "@app/features/dashboard/components";
import {
  getAllBook,
  getPaginatedBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { DEFAULT_LIMIT } from "@app/constants";
import { SkeletonSearchList } from "@app/components";

interface SearchPageProps {
  searchParams: {
    page: number;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await auth();
  const page = searchParams.page || 1;
  const userById = (await getUserById(session?.user?.id as string)) as User;
  const listAllBook = await getAllBook();
  const listBooks = (await getPaginatedBook(page, "")) as BookType[];

  const totalPages = Math.ceil(listAllBook.length / DEFAULT_LIMIT);

  return (
    <Suspense fallback={<SkeletonSearchList />}>
      <SearchList totalPages={totalPages} list={listBooks} user={userById} />
    </Suspense>
  );
};

export default SearchPage;
