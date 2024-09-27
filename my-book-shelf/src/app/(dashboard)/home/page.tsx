import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import {
  getTwelveItemBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { ListCart } from "@app/features/dashboard/components";

const HomePage = async () => {
  const session = await auth();
  const dataUserById = (await getUserById(session?.user?.id as string)) as User;
  const books = (await getTwelveItemBook()) as BookType[];

  return <ListCart user={dataUserById} list={books} />;
};

export default HomePage;
