import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { reactRouterParameters } from "storybook-addon-react-router-v6";

import { CreateNewPassword } from "@/components";
import { store } from "@/services/store.ts";

const meta = {
  title: "Auth/CreateNewPassword",
  component: CreateNewPassword,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
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
