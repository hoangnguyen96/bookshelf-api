import { memo } from "react";
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

interface NavbarProps {
  isAdmin?: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const listNavbar = [
    {
      title: NAVBAR_STEP.HOME,
      link: ROUTES.HOME,
      icon: () => <HomeIcon />,
    },
    {
      title: NAVBAR_STEP.SEARCH,
      link: ROUTES.SEARCH,
      icon: () => <SearchIcon />,
    },
    {
      title: NAVBAR_STEP.MY_SHELF,
      link: ROUTES.MY_BOOK_SHELF,
      icon: () => <BookshelfIcon />,
    },
    {
      ...(isAdmin && {
        title: NAVBAR_STEP.CONTRIBUTE,
        link: ROUTES.CONTRIBUTE,
        icon: () => <GiftIcon />,
      }),
    },
  ];

  return (
    <Flex flexDir="column" gap="34px">
      {listNavbar.map((item, index) => {
        const { title, link = "", icon } = item;

        return (
          <Link key={index} href={link}>
            <Flex gap="12px">
              {icon && icon()}
              <Text size="xl">{title}</Text>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};

export default memo(Navbar);
