import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

// Constants
import { NAVBAR_STEP, ROUTES } from "@app/constants";

// Icons
import {
  BookshelfIcon,
  GiftIcon,
  HomeIcon,
  SearchIcon,
} from "@app/assets/icons";

const listNavbar = {
  [NAVBAR_STEP.HOME]: {
    title: NAVBAR_STEP.HOME,
    link: ROUTES.HOME,
    icon: () => <HomeIcon />,
  },
  [NAVBAR_STEP.SEARCH]: {
    title: NAVBAR_STEP.SEARCH,
    link: ROUTES.SEARCH,
    icon: () => <SearchIcon />,
  },
  [NAVBAR_STEP.MY_SHELF]: {
    title: NAVBAR_STEP.MY_SHELF,
    link: ROUTES.MY_BOOK_SHELF,
    icon: () => <BookshelfIcon />,
  },
  [NAVBAR_STEP.CONTRIBUTE]: {
    title: NAVBAR_STEP.CONTRIBUTE,
    link: ROUTES.CONTRIBUTE,
    icon: () => <GiftIcon />,
  },
};

const Navbar = () => {
  return (
    <Flex flexDir="column" gap="34px">
      {Object.entries(listNavbar || {}).map(([_, stepDetail]) => {
        const { title, link, icon } = stepDetail;
        return (
          <Link key={title} href={link}>
            <Flex gap="12px">
              {icon()}
              <Text size="xl">{title}</Text>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};

export default Navbar;
