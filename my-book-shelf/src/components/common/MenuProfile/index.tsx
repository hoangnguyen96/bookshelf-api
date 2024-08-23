"use client";

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
import Avatar from "../Avatar";

const MenuProfile = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon color="dark.90" />}
        variant="outline"
        borderColor="borderDefault"
        bgColor="white"
        minW={205}
        h={50}
        borderRadius="33px"
        py="3px"
        pl="2px"
        pr="30px"
        boxShadow="0 0 4px -1px #a9a9a9"
      >
        <Flex justifyContent="flex-start" alignItems="center" gap={4}>
          <Avatar width={45} height={45} border="2px solid white" />
          <Text size="xl" flex={1}>
            Kenson
          </Text>
        </Flex>
      </MenuButton>
      <MenuList minW={205} borderRadius="10px" boxShadow="0 0 3px 0px #a9a9a9">
        <MenuItem>Profile</MenuItem>
        <MenuItem>Favorite</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuProfile;
