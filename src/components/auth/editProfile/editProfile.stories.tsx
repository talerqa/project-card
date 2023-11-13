import type { StoryObj } from "@storybook/react";

import { EditProfile } from "@/components";

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
