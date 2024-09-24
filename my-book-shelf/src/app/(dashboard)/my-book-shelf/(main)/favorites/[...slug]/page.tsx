import { Suspense } from "react";
import { auth } from "@app/auth";
import { User } from "@app/models";
import { filterBooksFavorite } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavoritesByParams } from "@app/features/dashboard/components";
import { LoadingIndicator } from "@app/components/common";

const MyBookShelfFavorites = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const books = await getAllBook();
  const favorites = user?.favorites || [];
  const booksByFavorites = filterBooksFavorite(books, favorites);
  const type = params.slug[0];
  const value = params.slug[1];

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <MyBookShelfFavoritesByParams
        list={booksByFavorites}
        user={user}
        type={type}
        value={value}
      />
    </Suspense>
  );
};

export default MyBookShelfFavorites;
