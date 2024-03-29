import type { Meta, StoryObj } from "@storybook/react";

import { TabSwitcher } from "./";

const meta = {
  title: "Components/TabSwitcher",
  component: TabSwitcher,
  tags: ["autodocs"],
  argTypes: {
    tabs: ["Switcher", "Switcher", "Switcher", "Switcher", "Switcher"],
  },
} satisfies Meta<typeof TabSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: ["Switcher", "Switcher", "Switcher", "Switcher", "Switcher"],
  },
};

export const Active: Story = {
  args: {
    tabs: ["Switcher", "Switcher", "Switcher", "Switcher", "Switcher"],

  },
};

export const Disabled: Story = {
  args: {
    tabs: ["Switcher", "Switcher", "Switcher", "Switcher", "Switcher"],

    disabled: true,
  },
};
