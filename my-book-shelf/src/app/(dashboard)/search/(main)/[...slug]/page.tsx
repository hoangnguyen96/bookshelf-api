import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import {
  getAllBook,
  getPaginatedBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { DEFAULT_LIMIT } from "@app/constants";
import { Suspense } from "react";
import { SkeletonSearchList } from "@app/components";
import { SearchListByParams } from "@app/features/dashboard/components";

interface SearchPageProps {
  params: { slug: string[] };
  searchParams: {
    page?: number;
  };
}

const SearchPage = async ({ params, searchParams }: SearchPageProps) => {
  const session = await auth();
  const page = searchParams.page || 1;
  const type = params.slug[0];
  const value = params.slug[1];
  const paramSearch = type && value ? `${type}=${value}&` : "";

  const userById = (await getUserById(session?.user?.id as string)) as User;
  const listAllBook = await getAllBook();
  const paginatedBooks = (await getPaginatedBook(
    page,
    paramSearch
  )) as BookType[];

  const totalPages = Math.ceil(listAllBook.length / DEFAULT_LIMIT);

  return (
    <Suspense fallback={<SkeletonSearchList />}>
      <SearchListByParams
        totalPages={totalPages}
        list={paginatedBooks}
        user={userById}
      />
    </Suspense>
  );
};

export default SearchPage;
