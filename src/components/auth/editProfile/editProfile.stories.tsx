import type { Meta, StoryObj } from "@storybook/react";

import { EditProfile } from "./editProfile";

const meta = {
  title: "Auth/EditProfile",
  component: EditProfile,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
