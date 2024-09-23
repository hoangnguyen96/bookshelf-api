import { Suspense } from "react";
import { auth } from "@app/auth";
import { User } from "@app/models";
import {
  getTwelveItemBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { ListCartByParams } from "@app/features/dashboard/components";
import { LoadingIndicator } from "@app/components/common";

const HomePage = async ({ params }: { params?: { slug: string[] } }) => {
  const type = params?.slug[0];
  const value = params?.slug[1];
  const session = await auth();
  const dataUserById = (await getUserById(session?.user?.id as string)) as User;
  const books = await getTwelveItemBook();

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ListCartByParams
        type={type}
        value={value}
        list={books}
        user={dataUserById}
      />
    </Suspense>
  );
};

export default HomePage;
