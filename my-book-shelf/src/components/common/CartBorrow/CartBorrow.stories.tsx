import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import CartBorrow from ".";

const meta: Meta<typeof CartBorrow> = {
  component: CartBorrow,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof CartBorrow> = () => <CartBorrow />;

export const Default = Template.bind({});
Default.args = {};
