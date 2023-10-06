import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
  useState,
} from "react";
import s from './dropdown.module.scss'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {Typography} from "@/components/ui/typography";

export type SliderProps = {
  label: "DropDown" | "DropDownWithIcon"
  align?: 'start' | 'center' | 'end'
  children: ReactNode
  trigger: ReactNode
  className?: string
  // value: number[]
  // step: number
  // minStepsBetweenThumbs: number
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>;

export const DropDown = forwardRef<ElementRef<typeof DropdownMenu.Root>, SliderProps>((props, ref) => {
  const {
    label, children, trigger, align,
    ...res
  } = props;

  const [open, setOpen] = useState<boolean>(false)

  const className = {
    trigger: s.trigger,
    content: s.content,
    root: s.root,
    portal: s.portal,
    item: s.item,
    arrow: s.arrow,

  }


  return (
    <div className={className.root}>

      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild className={className.trigger}>
          {trigger}
        </DropdownMenu.Trigger>

        {open && <DropdownMenu.Portal>
            <DropdownMenu.Content
                align={align}
                onClick={event => event.stopPropagation()}
                className={className.content}>
                <DropdownMenu.Label>
                    <DropdownMenu.Item className={className.item}>
                      {children}

                    </DropdownMenu.Item>
                </DropdownMenu.Label>
                <DropdownMenu.Arrow className={className.arrow}>
                </DropdownMenu.Arrow>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>}
      </DropdownMenu.Root>
    </div>)
})


type ProfileDropDown = {
  img: string
}
const dataProfile = {
  name: 'Ivan',
  email: 'j&johnson@gmail.com'
}

const classNameProfile = {
  profileDropDownBlock: s.profileDropDownBlock,
  itemsBlock: s.itemsBlock,
  emailText: s.emailText,
  profileImg: s.profileImg,
  nameText: s.nameText,

}

export const ProfileDropDown: React.FC<ProfileDropDown> = (props) => {
  const {img} = props
  return <div className={classNameProfile.profileDropDownBlock}>
    <img src={img} alt="img-avatart" className={classNameProfile.profileImg}/>
    <div className={classNameProfile.itemsBlock}>
      <Typography variant={"subtitle2"} as={'p'}
                  children={dataProfile.name}
                  className={classNameProfile.nameText}/>
      <Typography variant={"caption"} as={'p'} children={dataProfile.email}
                  className={classNameProfile.emailText}/>
    </div>
  </div>
}


type ItemDropDownProps = {
  img: string
  title: string
}

const ItemDropDownClassName = {
  itemDropDown: s.itemDropDownBlock,
  itemDropDownContent: s.itemDropDownContent,
  imageSvg: s.imageSvg,
  title: s.title,
  separator: s.separator,
}

export const ItemDropDown: React.FC<ItemDropDownProps> = (props) => {

  const {img, title} = props
  return <div className={ItemDropDownClassName.itemDropDown}>
    <DropdownMenu.Separator className={ItemDropDownClassName.separator}/>
    <div className={ItemDropDownClassName.itemDropDownContent}>
      <img src={img} alt="svg-icon" className={ItemDropDownClassName.imageSvg}/>
      <Typography variant={'caption'} as={'p'} children={title}
                  className={ItemDropDownClassName.title}/>
    </div>
  </div>
}
