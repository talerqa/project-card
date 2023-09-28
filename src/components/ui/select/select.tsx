import {ComponentPropsWithoutRef, ElementType, forwardRef,} from "react";
import s from './select.module.scss'

import * as SelectGroup from "@radix-ui/react-select"

export type InputProps<T extends ElementType = "input"> = {
  variant?: "default" | "toggle" | "search";
  label?: 'Select-box'
  children?: String[]
  // type: 'text' | "search" | 'password';
  // text?: string
  // label?: string
  // error?: boolean
  // disabled?: boolean,
  // placeholder?: string
} & ComponentPropsWithoutRef<T>;

export const Select = forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
  const {label, children} = props;


  return (<div className={s.selectBlock}>

      <SelectGroup.Root  value="Select-box" >
        <span className={s.textLabel}>{label}</span>
        <SelectGroup.Trigger className={s.button} />
        <SelectGroup.Content ref={ref} position="popper" defaultValue="children[0]" >
          {children?.map((item: any) => {
            return <SelectGroup.Item value="item" className={s.itemText}>{item}</SelectGroup.Item>
          })}
        </SelectGroup.Content>
      </SelectGroup.Root>

    </div>
  )
})