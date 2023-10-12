import type {Meta, StoryObj} from "@storybook/react";
import {Card} from "./";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ['defaultCard'],
    },
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardDefaultStory: Story = {
  args: {
    variant: "defaultCard",
    label: "card",
  }
};
