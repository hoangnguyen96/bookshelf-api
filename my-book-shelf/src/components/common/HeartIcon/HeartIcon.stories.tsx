import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import HeartIcon from ".";
import theme from "@app/themes";

const meta: Meta<typeof HeartIcon> = {
  component: HeartIcon,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof HeartIcon> = (args) => <HeartIcon />;

export const Icon = Template.bind({});
Icon.args = {};
