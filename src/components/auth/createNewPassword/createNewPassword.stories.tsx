import type { Meta, StoryObj } from "@storybook/react";

import { CreateNewPassword } from "./createNewPassword.tsx";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-react-router-v6";

const meta = {
  title: "Auth/CreateNewPassword",
  component: CreateNewPassword,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
    }),
  },
} satisfies Meta<typeof CreateNewPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
