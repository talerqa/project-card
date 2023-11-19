import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { decksActions } from "../../../services/decks/decksSlice";

import { Slider, SliderProps } from "./";

import { useAppDispatch } from "@/services/store.ts";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SliderWithUseState = (args: SliderProps) => {
  const dispatch = useAppDispatch();

  const { setMinCard, setMaxCard } = decksActions;
  const [min, setMin] = useState<number>(args.value[0]);
  const [max, setMax] = useState<number>(args.value[1]);

  dispatch(setMaxCard({ maxCard: max }));
  dispatch(setMinCard({ minCard: min }));

  const onHandler = (ref: number[]) => {
    setMin(ref[0]);
    setMax(ref[1]);
  };

  return <Slider {...args} min={min} max={max} onValueChange={onHandler} />;
};

export const SliderDefault: Story = {
  args: {
    label: "Slider",
    value: [1, 18],
    step: 1,
    minStepsBetweenThumbs: 1,
    disabled: false,
  },
  render: (args) => <SliderWithUseState {...args} />,
};
