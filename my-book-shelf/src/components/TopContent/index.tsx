import { Flex } from "@chakra-ui/react";
import { MenuProfile, SearchBar } from "../common";

const TopContent = () => (
  <Flex alignItems="center" justifyContent="space-between" p="32px 48px">
    <SearchBar />
    <MenuProfile />
  </Flex>
);

export default TopContent;
