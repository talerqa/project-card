import type {Meta, StoryObj} from "@storybook/react";
import {DropDown} from "./";

const meta = {
  title: "Components/Slider",
  component: DropDown,
  tags: ["autodocs"],

} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;



export const DropDownMenu: Story = {
  args: {
    label: "DropDown",
    children: '',
  }
};

export const DropDownMenuWithIcon: Story = {
  args: {
    label: "DropDownWithIcon",
    children: '',
  }
};


// const SliderWithUseState = (args: SliderProps) => {
//   const [min, setMin] = useState<number>(args.value[0])
//   const [max, setMax] = useState<number>(args.value[1])
//
//   const onHandler = (ref: number[]) => {
//     setMin(ref[0])
//     setMax(ref[1])
//   }
//
//   return <Slider {...args} min={min} max={max} onValueChange={onHandler}/>
// }
