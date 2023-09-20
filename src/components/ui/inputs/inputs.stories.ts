import type {Meta, StoryObj} from "@storybook/react";
import {Inputs} from "./";

const meta = {
  title: "Components/Inputs",
  component: Inputs,
  tags: ["autodocs"],
  // argTypes: {
  //   variant: {
  //     options: ["primary", "toggle", "search"],
  //      // control: { type: "radio" },
  //   },
  // },
} satisfies Meta<typeof Inputs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    variant: "default",
    label: "Input",
  },
};

export const DefaultToggleInput: Story = {
  args: {
    variant: "defaultToggle",
    label: "Input",
    type: 'password',
    showText: true
  },
};

export const DefaultSearchInput: Story = {
  args: {
    variant: "defaultSearch",
    children: "search",
    label: "Input search",

    // disabled: false,
  },
};




//
// export const Secondary: Story = {
//   args: {
//     variant: "secondary",
//     children: "Secondary Button",
//     disabled: false,
//   },
// };
// export const Tertiary: Story = {
//   args: {
//     variant: "tertiary",
//     children: "Tertiary Button",
//     disabled: false,
//   },
// };
// export const Link: Story = {
//   args: {
//     variant: "link",
//     children: "Tertiary Button",
//     disabled: false,
//   },
// };
//
// export const FullWidth: Story = {
//   args: {
//     variant: "primary",
//     children: "Full Width Button",
//     disabled: false,
//     fullWidth: true,
//   },
// };
// export const AsLink: Story = {
//   args: {
//     variant: "primary",
//     children: "Link that looks like a button",
//     as: "a",
//   },
// };
