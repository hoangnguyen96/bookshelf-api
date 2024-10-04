import { auth } from "@app/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@app/constants";

const Main = async () => {
  const session = await auth();

  if (!session) {
    return redirect(ROUTES.LOGIN);
  }

  return redirect(ROUTES.HOME);
};

export default Main;
