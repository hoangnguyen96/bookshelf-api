"use client";

import { memo } from "react";
import { Session } from "next-auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import isEqual from "react-fast-compare";
import { useRouter } from "next/navigation";
import { ROUTES } from "@app/constants";
import { logout } from "@app/features/auth/actions";
import { Avatar } from "../common";

interface MenuProfileProps {
  session?: Session;
}

const MenuProfile = ({ session }: MenuProfileProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  const handleRedirectProfile = () => router.push(ROUTES.PROFILE);

  const handleRedirectFavorites = () =>
    router.push(ROUTES.MY_BOOK_SHELF_FAVORITES);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon color="dark.90" />}
        variant="outline"
        borderColor="borderDefault"
        bgColor="var(--chakra-colors-chakra-body-bg)"
        minW={{ base: 180, "2xl": 205 }}
        h={50}
        borderRadius="33px"
        py="3px"
        pl="2px"
        pr="30px"
        boxShadow="0 0 4px -1px #a9a9a9"
        justifyContent="space-between"
        sx={{ "& span": { display: "contents" } }}
      >
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          gap={4}
          height="100%"
        >
          <Avatar
            image={session?.user?.image || ""}
            width={45}
            height={45}
            border="2px solid var(--chakra-colors-chakra-body-bg)"
          />
          <Text size="xl" flex={1}>
            {session?.user?.name || ""}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList
        minW={205}
        borderRadius="10px"
        boxShadow="0 0 3px 0px #a9a9a9"
        zIndex={15}
      >
        <MenuItem onClick={handleRedirectProfile}>
          <Text lineHeight="30px" w="100%">
            Profile
          </Text>
        </MenuItem>
        <MenuItem onClick={handleRedirectFavorites}>
          <Text lineHeight="30px" w="100%">
            Favorites
          </Text>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Text lineHeight="30px" w="100%">
            Logout
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const areEqual = (prevProps: MenuProfileProps, nextProps: MenuProfileProps) => {
  return isEqual(prevProps, nextProps);
};

export default memo(MenuProfile, areEqual);
