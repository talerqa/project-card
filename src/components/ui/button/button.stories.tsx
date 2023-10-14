import type {Meta, StoryObj} from "@storybook/react";
import {Button} from "./";
import iconExit from "../../../assets/img/exit.svg";
import iconExitDisabled from "../../../assets/img/exitDisabled.svg";
import {Typography} from "@/components/ui/typography";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", 'primaryWithIcon', "tertiary", "link", "secondaryWithIcon"],
      control: {type: "radio"},
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

type IconButtonType = {
  disabled?: boolean
  className?: string
  image?: any
}

const IconButton = (props: IconButtonType) => {
  const {disabled, image} = props
  return <img src={!disabled ? image[0] : image[1]}
              alt="icon"
              style={{width: '16px', height: '16px', margin: '0 12px 0 0'}}/>
}

export const DefaultButton: Story = {
  args: {
    variant: "primary",
    children: (<Typography variant={'subtitle2'} as={'span'}
                           children={'Button primary'}/>),
    disabled: false,
  },
};

export const ButtonLogOut: Story = {
  args: {
    variant: "primaryWithIcon",
    children: (<Typography variant={'subtitle2'} as={'span'}
                           children={'Button primary'}/>),
    disabled: false,
    icon: (<IconButton disabled={false} image={[iconExit, iconExitDisabled]}/>),
  },
};

export const ButtonSecondary: Story = {
  args: {
    variant: "secondary",
    children: (<Typography variant={'subtitle2'} as={'span'}
                           children={'Button Secondary'}/>),
    disabled: false,
  },
};

export const ButtonTertiary: Story = {
  args: {
    variant: "tertiary",
    children: (
      <Typography variant={'subtitle2'} as={'span'} children={'Tertiary'}/>),
    disabled: false,
  },
};

export const ButtonLink: Story = {
  args: {
    variant: "link",
    children: (
      <Typography variant={'subtitle1'} as={'a'} children={"Link-button"}/>),
    as: "a",
    disabled: false,
  },
};

export const ButtonSecondaryLogout: Story = {
  args: {
    variant: "secondaryWithIcon",
    children: (<Typography variant={'subtitle2'} as={'span'}
                           children={'Button primary'}/>),
    disabled: false,
    icon: (<IconButton disabled={false} image={[iconExit, iconExitDisabled]}/>),
  },
};