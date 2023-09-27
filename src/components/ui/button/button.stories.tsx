import type {Meta, StoryObj} from "@storybook/react";
import {Button} from "./";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "tertiary", "link"],
      control: {type: "radio"},
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    variant: "primary",
    children: 'Button primary',
    className: 'buttonPrimary',
    classNameText: 'buttonPrimaryText',
    disabled: false,
  },
};

export const ButtonLogOut: Story = {
  args: {
    variant: "primary",
    children: "Button primary",
    className: 'buttonPrimary',
    classNameText: 'buttonPrimaryText',
    disabled: false,
    icon: true,
  },
};

export const ButtonSecondary: Story = {
  args: {
    variant: "secondary",
    children: "Button Secondary",
    className: 'buttonSecondary',
    classNameText: 'buttonSecondaryText',
    disabled: false,
  },
};

export const ButtonTertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary",
    disabled: false,
  },
};

export const ButtonLink: Story = {
  args: {
    variant: "link",
    children: "Link-button",
    as: "a",
  },
};

export const ButtonSecondaryLogout: Story = {
  args: {
    variant: "secondaryWithIcon",
    children: "Button primary",
    disabled: false,
    fullWidth: true,
    icon: true
  },
};

