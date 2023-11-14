import type { StoryObj } from "@storybook/react";
import { Meta } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { reactRouterParameters } from "storybook-addon-react-router-v6";

import { EditProfile } from "@/components";
import { store } from "@/services/store.ts";

const meta = {
  title: "Auth/EditProfile",
  component: EditProfile,
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
} satisfies Meta<typeof EditProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
