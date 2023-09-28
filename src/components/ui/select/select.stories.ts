import type {Meta, StoryObj} from "@storybook/react";
import {Select} from "./";
1
const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    // variant: {
    //   options: ["default", "defaultToggle", "defaultSearch"],
    //     control: { type: "radio" },
    // },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectBox: Story = {
  args: {
    label: "Select-box",
    variant: "default",
    children: ['Select-box', 'Select-box']
    // type: 'text',
    // placeholder: "Input",
    // error: false,
    // disabled: false,
  },
};
