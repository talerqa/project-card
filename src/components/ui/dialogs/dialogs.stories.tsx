import type { Meta, StoryObj } from "@storybook/react";

import { DialogsModal } from "@/components/ui/dialogs/dialogsModal.tsx";

const meta = {
  title: "Components/DialogsModal",
  component: DialogsModal,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DialogsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogsModalStory: Story = {
  args: {
    title: "Edit Pack",
    open: true,
    children: <></>,
  },
};
