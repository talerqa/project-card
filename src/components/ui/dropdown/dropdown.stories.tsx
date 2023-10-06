import type {Meta, StoryObj} from "@storybook/react";
import {DropDown, ItemDropDown, ProfileItemDropDown} from "./";
import avatar from "./../../../assets/img/avatart-template.png"
import person from "./../../../assets/img/person.svg"
import logout from "./../../../assets/img/exit.svg"
import play from "./../../../assets/img/play.svg"
import edit from "./../../../assets/img/edit.svg"
import trash from "./../../../assets/img/trash.svg"

const meta = {
  title: "Components/DropDown",
  component: DropDown,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ['DropDownMenu', 'DropDownMenuWithIcon'],
      defaultValue: "DropDownMenuWithIcon",
      control: {type: 'radio'},
    },
    align: {
      options: ['start', 'center', 'end'],
      control: {type: 'radio'},
    }
  }
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropDownMenu: Story = {
  args: {
    variant: "DropDownMenu",
    label: "DropDown",
    children: (
      <>
        <ItemDropDown img={play} title={'Learn'}/>
        <ItemDropDown img={edit} title={'Edit'}/>
        <ItemDropDown img={trash} title={'Delete'}/>
      </>
    ),
    align: 'end',
    trigger: (<button>TRRRRRIGER</button>)
  }
};

export const DropDownMenuWithIcon: Story = {
    args: {
      variant: "DropDownMenuWithIcon",
      label: "DropDownWithIcon",
      children: (<>
          <ProfileItemDropDown img={avatar} name={'Ivan'} email={"j&johnson@gmail.com"}/>
          <ItemDropDown img={person} title={'My Profile'}/>
          <ItemDropDown img={logout} title={'Sign Out'}/>
        </>
      ),
      align: 'end',
      trigger: (<button><img src={avatar} alt=""/></button>)
    }
  }
;

