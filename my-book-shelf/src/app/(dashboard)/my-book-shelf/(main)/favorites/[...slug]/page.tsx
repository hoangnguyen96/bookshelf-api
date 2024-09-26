import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { filterBooksFavorite } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavoritesByParams } from "@app/features/dashboard/components";
import { Suspense } from "react";
import { SkeletonSearchList } from "@app/components";

const MyBookShelfFavorites = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const books = (await getAllBook()) as BookType[];
  const favorites = user?.favorites || [];
  const booksByFavorites = filterBooksFavorite(books, favorites);
  const type = params.slug[0];
  const value = params.slug[1];

  return (
    <Suspense fallback={<SkeletonSearchList />}>
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
