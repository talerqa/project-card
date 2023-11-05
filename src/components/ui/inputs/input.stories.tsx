import type { Meta, StoryObj } from "@storybook/react";

import { Input } from ".";

const meta = {
  title: "Components/Inputs",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    type: "text",
    label: "Input",
    placeholder: "Input",
    errorMessage: "",
    disabled: false,
  },
};

export const ToggleInput: Story = {
  args: {
    type: "password",
    label: "Input",
    placeholder: "Input",
    errorMessage: "",
    disabled: false,
  },
};

export const SearchInput: Story = {
  args: {
    type: "search",
    label: "Input search",
    placeholder: "Input search",
    errorMessage: "",
    disabled: false,
  },
};
