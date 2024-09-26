import { Suspense } from "react";
import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { filterBooksOnShelf } from "@app/utils";
import { MyBookShelfByParams } from "@app/features/dashboard/components";
import { SkeletonMyBookShelf } from "@app/components";

const MyBookShelfByParamsPage = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const allBooks = (await getAllBook()) as BookType[];
  const shelfBooks = user?.shelfBooks || [];
  const booksOnShelf = filterBooksOnShelf(allBooks, shelfBooks);
  const type = params.slug[0];
  const value = params.slug[1];

  return (
    <Suspense fallback={<SkeletonMyBookShelf />}>
      <MyBookShelfByParams
        list={booksOnShelf}
        user={user}
        type={type}
        value={value}
      />
    </Suspense>
  );
};

export default MyBookShelfByParamsPage;
