import type {Meta, StoryObj} from "@storybook/react";
import {Slider} from "./";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SliderDefault: Story = {
  args: {
    label: "Slider",
    variant: "default",
    value: [1, 42],
    step: 1,
    disabled: false,
  },
};
