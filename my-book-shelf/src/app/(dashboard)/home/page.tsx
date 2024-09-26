import { Suspense } from "react";
import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import {
  getTwelveItemBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { ListCart } from "@app/features/dashboard/components";
import { SkeletonHomeList } from "@app/components";

const HomePage = async () => {
  const session = await auth();
  const dataUserById = (await getUserById(session?.user?.id as string)) as User;
  const books = (await getTwelveItemBook()) as BookType[];

  return (
    <Suspense fallback={<SkeletonHomeList />}>
      <ListCart user={dataUserById} list={books} />
    </Suspense>
  );
};

export default HomePage;
