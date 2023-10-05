import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./";

const meta = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: [
        "large",
        "h1",
        "h2",
        "h3",
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "caption",
        "overline",
        "link1",
        "link2",
        "error",
      ],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const h1: Story = {
    args: {
      variant: 'h1',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const h2: Story = {
    args: {
      variant: 'h2',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const h3: Story = {
    args: {
      variant: 'h3',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const body1: Story = {
    args: {
      variant: 'body1',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const body2: Story = {
    args: {
      variant: 'body2',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const subtitle1: Story = {
    args: {
      variant: 'subtitle1',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const subtitle2: Story = {
    args: {
      variant: 'subtitle2',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const caption: Story = {
    args: {
      variant: 'caption',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const overline: Story = {
    args: {
      variant: 'overline',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
    },
  }

  export const link1: Story = {
    args: {
      variant: 'link1',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
      as:"a"
    },
  }

  export const link2: Story = {
    args: {
      variant: 'link2',
      children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
      as:"a"
    },
  }


