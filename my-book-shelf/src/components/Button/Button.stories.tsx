import type { Meta, StoryObj } from "@storybook/react";
import ButtonBase from ".";

const meta: Meta<typeof ButtonBase> = {
  component: ButtonBase,
};

export default meta;
type Story = StoryObj<typeof ButtonBase>;

export const Solid: Story = {
  args: {
    label: "Button",
    variant: "solid",
  },
};

export const Outlined: Story = {
  args: {
    label: "Button",
    variant: "outlined",
  },
};

export const Ghost: Story = {
  args: {
    label: "Button",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    label: "Button",
    variant: "link",
  },
};
