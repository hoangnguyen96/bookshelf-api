import { auth } from "@app/auth";
import { ListContribute } from "@app/components";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { User } from "@app/models";
import { getThreeTopBook } from "@app/utils";

const List = async () => {
  const session = await auth();
  const dataUserById = (await getUserById(session?.user?.id as string)) as User;
  const dataBooks = await getAllBook();
  const dataTop = getThreeTopBook(dataBooks);

  return <ListContribute list={dataTop} user={dataUserById} />;
};

export default List;
