import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./";

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderAuth: Story = {
  args: {
    isAuthorized: true,
    label: "HeaderAuth",
    name: "Ivan",
    setLogout: () => console.log("sign out"),
  },
};

export const HeaderNonAuth: Story = {
  args: {
    isAuthorized: false,
    label: "HeaderNonAuth",
    onSignInHandler: () => console.log("sign in"),
  },
};
