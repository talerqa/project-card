import type {Meta, StoryObj} from "@storybook/react";
import {Select} from "./";

1
const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectBox: Story = {
  args: {
    label: "Select-box",
    variant: "default",
    array: [
      {
        value: 'value1',
        title: "Select-box1"
      },
      {
        value: 'value2',
        title: "Select-box2"
      },
      {
        value: 'value3',
        title: "Select-box3"
      },
      {
        value: 'value4',
        title: "Select-box4"
      }
    ],
    placeholder: 'Select-box',
    disabled: false,
  },
};
