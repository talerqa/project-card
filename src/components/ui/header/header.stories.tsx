import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./";

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    // variant: {
    //   options: ["default", "defaultToggle", "defaultSearch"],
    //     control: { type: "radio" },
    // },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderAuth: Story = {
  args: {
    isAuth: true,
    label: "HeaderAuth",
    name: "Ivan",
    onShowProfileHandler: () => console.log("show profile"),
    onLogOutHandler: () => console.log("sign out"),
  },
};

export const HeaderNonAuth: Story = {
  args: {
    isAuth: false,
    label: "HeaderNonAuth",
    onSignInHandler: () => console.log("sign in"),
  },
};
