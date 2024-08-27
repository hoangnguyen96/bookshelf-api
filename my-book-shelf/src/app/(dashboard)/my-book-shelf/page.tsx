import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

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

        <TabPanels>
          <TabPanel>
            <p>All Books!</p>
          </TabPanel>
          <TabPanel>
            <p>Favorite!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MyBookShelfPage;