import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import FormRegister from ".";

const meta: Meta<typeof FormRegister> = {
  component: FormRegister,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof FormRegister> = () => <FormRegister />;

export const Default = Template.bind({});
Default.args = {};
