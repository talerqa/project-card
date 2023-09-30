import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup } from "./";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    options: [
      { label: "one", value: 1 },
      { label: "two", value: 2 },
      { label: "three", value: 3 },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [{ value: "one" }, { value: "two" }, { value: "three" }],
  },
};

export const Disabled: Story = {
  args: {
    options: [{ value: "one" }, { value: "two" }, { value: "three" }],
    disabled: true,
  },
};
