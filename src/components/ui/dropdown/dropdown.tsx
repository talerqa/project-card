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

export type DropDownProps = {
  variant?: "DropDownMenu" | "DropDownMenuWithIcon"
  label?: "DropDown" | "DropDownWithIcon"
  align?: 'start' | 'center' | 'end'
  children: ReactNode
  trigger: ReactNode
  className?: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>;

export const DropDown = forwardRef<ElementRef<typeof DropdownMenu.Root>, DropDownProps>((props, ref) => {
  const {
    children,
    trigger,
    align,
    variant = 'DropDownMenuWithIcon',
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
  console.log(open)
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
                ref={ref}
                className={className.content}
                {...res}>
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
  img?: string
  email?: string
  name?: string

}

const classNameProfile = {
  profileDropDownBlock: s.profileDropDownBlock,
  itemsBlock: s.itemsBlock,
  emailText: s.emailText,
  profileImg: s.profileImg,
  nameText: s.nameText,
  separator: s.separator,
}

export const ProfileItemDropDown: React.FC<ProfileDropDown> = (props) => {
  const {img, email, name} = props
  return <>
    <div className={classNameProfile.profileDropDownBlock}>
      <img src={img} alt="img-avatart" className={classNameProfile.profileImg}/>
      <div className={classNameProfile.itemsBlock}>
        <Typography variant={"subtitle2"} as={'a'}
                    children={name}
                    className={classNameProfile.nameText}/>
        <Typography variant={"caption"} as={'p'} children={email}
                    className={classNameProfile.emailText}/>
      </div>
    </div>
    <DropdownMenu.Separator className={classNameProfile.separator}/>
  </>
}

type ItemDropDownProps = {
  img: string
  title: string
  onClick?: () => void
}

const ItemDropDownClassName = {
  itemDropDown: s.itemDropDownBlock,
  itemDropDownContent: s.itemDropDownContent,
  imageSvg: s.imageSvg,
  title: s.title,
  separator: s.separator,
}

export const ItemDropDown: React.FC<ItemDropDownProps> = (props) => {
  const {img, title, onClick} = props
  return <>    {title === 'Edit' &&
      <DropdownMenu.Separator className={ItemDropDownClassName.separator}/>}
    {title === 'Sign Out' &&
        <DropdownMenu.Separator className={ItemDropDownClassName.separator}/>}
    {title === 'Delete' &&
        <DropdownMenu.Separator  className={ItemDropDownClassName.separator}/>}
    <div className={ItemDropDownClassName.itemDropDown}>
      <div className={ItemDropDownClassName.itemDropDownContent}
           onClick={onClick}>
        <img src={img} alt="svg-icon"
             className={ItemDropDownClassName.imageSvg}/>
        <Typography variant={'caption'} as={'p'} children={title}
                    className={ItemDropDownClassName.title}/>
      </div>
    </div>
  </>
}
