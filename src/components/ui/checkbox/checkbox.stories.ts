import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Remember Me',
    id: 'checkBox-story'
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Remember Me',
    id: 'checkBox-story'
  },
};
