import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import Cart from ".";
import theme from "@app/themes";

const meta: Meta<typeof Cart> = {
  component: Cart,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof Cart> = () => <Cart />;

export const Default = Template.bind({});
Default.args = {};
