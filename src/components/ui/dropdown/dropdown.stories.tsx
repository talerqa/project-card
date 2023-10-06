import type {Meta, StoryObj} from "@storybook/react";
import {DropDown, ItemDropDown, ProfileDropDown} from "./";
import avatar from "./../../../assets/img/avatart-template.png"
import person from "./../../../assets/img/person.svg"
import logout from "./../../../assets/img/exit.svg"

const meta = {
  title: "Components/DropDown",
  component: DropDown,
  tags: ["autodocs"],

} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;


export const DropDownMenu: Story = {
  args: {
    label: "DropDown",
    children: (
      <>

      </>
    ),
    align: 'end',
    trigger: (<button>!!!!</button>)
  }
};

export const DropDownMenuWithIcon: Story = {
    args: {
      label: "DropDownWithIcon",
      children: (<>
          <ProfileDropDown img={avatar}/>
          <ItemDropDown img={person} title={'My Profile'}/>
          <ItemDropDown img={logout} title={'Sign Out'}/>
        </>
      ),
      align: 'end',
      trigger: (<button><img src={avatar} alt=""/></button>)
    }
  }
;

