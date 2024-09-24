import { Suspense } from "react";
import { auth } from "@app/auth";
import { User } from "@app/models";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";
import { LoadingIndicator } from "@app/components/common";
import { SearchListByParams } from "@app/features/dashboard/components";

const SearchPage = async ({ params }: { params: { slug: string[] } }) => {
  const session = await auth();
  const userById = (await getUserById(session?.user?.id as string)) as User;
  const paginatedBooks = await getPaginatedBook();
  const type = params.slug[0];
  const value = params.slug[1];

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <SearchListByParams
        type={type}
        value={value}
        list={paginatedBooks}
        user={userById}
      />
    </Suspense>
  );
};

export default SearchPage;
