import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import FormLogin from ".";

const meta: Meta<typeof FormLogin> = {
  component: FormLogin,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof FormLogin> = () => <FormLogin />;

export const Default = Template.bind({});
Default.args = {};
