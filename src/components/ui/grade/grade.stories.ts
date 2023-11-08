import type {Meta, StoryObj} from "@storybook/react";
import {Grade} from "@/components/ui/grade/grade.tsx";


const meta = {
  title: "Components/Grade",
  component: Grade,
  tags: ["autodocs"],
} satisfies Meta<typeof Grade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GradeRating: Story = {
  args: {
    maxRating: 5,
    value: 4,
  }
};
