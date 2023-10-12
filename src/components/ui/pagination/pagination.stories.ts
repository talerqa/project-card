import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "./";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    totalItemsCount: 500,
    pageSizeValue: [
      { title: "10", value: "10" },
      { title: "20", value: "20" },
      { title: "50", value: "50" },
      { title: "100", value: "100" },
    ],
  },
};
