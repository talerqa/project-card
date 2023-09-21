import type {Meta, StoryObj} from "@storybook/react";
import {Inputs} from "./";

const meta = {
  title: "Components/Inputs",
  component: Inputs,
  tags: ["autodocs"],
  argTypes: {
    // variant: {
    //   options: ["default", "defaultToggle", "defaultSearch"],
    //     control: { type: "radio" },
    // },
  },
} satisfies Meta<typeof Inputs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    variant: "default",
    type: 'text',
    label: "Input",
    placeholder: "Input",
    error: false,
    disabled: false,
  },
};

export const ToggleInput: Story = {
  args: {
    variant: "toggle",
    type: 'password',
    label: "Input",
    placeholder: "Input",
    error: false,
    disabled: false,
  },
};

export const SearchInput: Story = {
  args: {
    variant: "search",
    type: 'search',
    label: "Input search",
    placeholder: "Input search",
    error: false,
    disabled: false,
  },
};

