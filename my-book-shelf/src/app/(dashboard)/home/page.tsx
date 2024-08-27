import { auth } from "@app/auth";
import { ListCartHome } from "@app/components";

const HomePage = async () => {
  const session = await auth();
  console.log("HomePage: ", session);

  return (
    <>
      <ListCartHome />;
    </>
  );
};

export default HomePage;
