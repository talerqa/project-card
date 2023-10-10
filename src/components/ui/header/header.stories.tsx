import type {Meta, StoryObj} from "@storybook/react";
import {Header} from "./";

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    // variant: {
    //   options: ["default", "defaultToggle", "defaultSearch"],
    //     control: { type: "radio" },
    // },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderAuth: Story = {
  args: {
    isAuth: true,
    label: "HeaderAuth",
    avatarImg: './src/assets/img/el.png',
    name: 'Ivan',
    email: "j&johnson@gmail.com",
  },
};

export const HeaderNonAuth: Story = {
  args: {
    isAuth: false,
    label: "HeaderNonAuth",
    avatarImg: '',
  },
};



