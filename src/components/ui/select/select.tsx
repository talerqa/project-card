import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import s from './select.module.scss'

import * as SelectGroup from "@radix-ui/react-select"
import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons';


export type InputProps = {
  variant?: "default";
  label?: 'Select-box'
  children?: any
  array?: any
  placeholder?: string
  // type: 'text' | "search" | 'password';
  // text?: string
  // label?: string
  // error?: boolean
  // disabled?: boolean,
  // placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectGroup.Root>;

export const Select = forwardRef<ElementRef<typeof SelectGroup.Root>, InputProps>((props, ref) => {
  const {label, placeholder, array, value} = props;

  const [open, setOpen] = useState<boolean>(false)

  const handlerOpenedMenu = () => {
    setOpen(!open)
  }

  return (<div className={s.selectBlock}>
      <SelectGroup.Root value={value} onOpenChange={handlerOpenedMenu}>
        <span className={s.textLabel}>{label}</span>
        <SelectGroup.Trigger className={s.button} ref={ref}/>
        <div className={s.selectValueBlock}>
          <div className={s.valuePlaceholder}><SelectGroup.Value
            placeholder={placeholder}
          /></div>
          {open ? <ChevronUpIcon className={s.iconDown}/> :
            <ChevronDownIcon className={s.iconDown}/>}
        </div>
        <SelectGroup.Content position="popper" className={s.content}>
          <SelectGroup.Viewport className={s.viewport}>
            <SelectGroup.Group className={s.items}>
              {array.map((item: any) => {
                return <Item children={item.title} value={item.value}/>
              })}
            </SelectGroup.Group>
          </SelectGroup.Viewport>
        </SelectGroup.Content>
      </SelectGroup.Root>
    </div>
  )
})


type Props = any
export const Item = (props: Props) => {
  const {children} = props
  return (<SelectGroup.Item value={children} className={s.item}>
    <SelectGroup.ItemText
      className={s.itemText}>{children}</SelectGroup.ItemText>
    <SelectGroup.ItemIndicator className={s.selectIndicator}>
      <CheckIcon/>
    </SelectGroup.ItemIndicator>
  </SelectGroup.Item>)
}

