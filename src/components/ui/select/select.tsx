import {ComponentPropsWithoutRef, ElementRef, forwardRef,} from "react";
import s from './select.module.scss'

import * as SelectGroup from "@radix-ui/react-select"
import {CheckIcon, ChevronDownIcon} from '@radix-ui/react-icons';


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


  return (<div className={s.selectBlock}>
      <SelectGroup.Root value={value}>
        <span className={s.textLabel}>{label}</span>
        <SelectGroup.Trigger className={s.button} ref={ref}/>
        <div className={s.selectValueBlock}>
          <SelectGroup.Value placeholder={placeholder}
                             className={s.placeholder}/>
          <ChevronDownIcon/>
        </div>
        <SelectGroup.Content position="popper">
          <SelectGroup.Viewport className="SelectViewport">
            <SelectGroup.Group>
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

  return (<SelectGroup.Item value={children}>
    <SelectGroup.ItemText>{children}</SelectGroup.ItemText>
    <SelectGroup.ItemIndicator className="SelectItemIndicator">
      <CheckIcon/>
    </SelectGroup.ItemIndicator>
  </SelectGroup.Item>)
}

