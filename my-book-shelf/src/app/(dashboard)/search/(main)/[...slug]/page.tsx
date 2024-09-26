import { Suspense } from "react";
import { auth } from "@app/auth";
import { User } from "@app/models";
import {
  getAllBook,
  getPaginatedBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { LoadingIndicator } from "@app/components/common";
import { SearchListByParams } from "@app/features/dashboard/components";
import { DEFAULT_LIMIT } from "@app/constants";

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
  const paginatedBooks = await getPaginatedBook(page, paramSearch);

  const totalPages = Math.ceil(listAllBook.length / DEFAULT_LIMIT);

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <SearchListByParams
        totalPages={totalPages}
        list={paginatedBooks}
        user={userById}
      />
    </Suspense>
  );
};

export default SearchPage;
