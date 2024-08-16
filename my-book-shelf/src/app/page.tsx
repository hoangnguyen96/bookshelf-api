import ButtonBase from "@app/components/Button";
import { Link } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
      <ButtonBase />
    </main>
  );
}
