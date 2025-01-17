import { Box, Flex, Text } from "@chakra-ui/react";
import { LogoMain } from "@app/assets/icons";
import { memo } from "react";

interface HeadingFormProps {
  title: string;
  description: string;
}

const HeadingForm = ({ title, description }: HeadingFormProps) => (
  <Flex flexDir="column" alignItems="center">
    <Box mb="62px">
      <LogoMain />
    </Box>
    <Text size="xl" mb="15px" color="var(--chakra-colors-chakra-body-text)">
      {title}
    </Text>
    <Text size="md" color="var(--chakra-colors-chakra-subtle-text)">
      {description}
    </Text>
  </Flex>
);

export default memo(HeadingForm);
