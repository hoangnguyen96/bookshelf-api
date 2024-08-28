import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Books from "./books";
import Favorites from "./favorites";

const MyBookShelfPage = () => {
  return (
    <Flex p="18px 44px" flexDir="column">
      <Text size="xxl">
        Your{" "}
        <Text as="span" size="xxl" color="brand.70">
          Shelf
        </Text>
      </Text>
      <Tabs mt="37px">
        <TabList>
          <Tab w={130} mr="50px">
            All Books
          </Tab>
          <Tab w={130} mr="50px">
            Favorite
          </Tab>
        </TabList>

        <TabPanels mt="34px">
          <TabPanel p={0}>
            <Books />
          </TabPanel>
          <TabPanel p={0}>
            <Favorites />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MyBookShelfPage;
