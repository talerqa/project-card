import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import s from './slider.module.scss'
import * as SliderGroup from '@radix-ui/react-slider';

export type SelectProps = {
  variant?: "default";
  label?: 'Slider'
  value: number[]
  array?: { title: string, value: string }[]
  placeholder?: string
  disabled: boolean
} & ComponentPropsWithoutRef<typeof SliderGroup.Root>;

export const Slider = forwardRef<ElementRef<typeof SliderGroup.Root>, SelectProps>((props, ref) => {
  const {
    value,
    // label,
    // placeholder,
    // array,
    // value,
    // disabled
  } = props;

  const [min, setMin] = useState<number>(value[0])
  const [max, setMax] = useState(value[1])

  // const [open, setOpen] = useState<boolean>(false)


  const onChangeValueMin = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) < max) {
      setMin(Number(e.currentTarget.value))
    }
  }
  const onChangeValueMax = (e: ChangeEvent<HTMLInputElement>) => {

    setMax(Number(e.currentTarget.value))

  }

  const onHandler = () => {
    console.log(value)
  }


  return (<div className={s.selectBlock}>
      <input type="text" value={min} onChange={onChangeValueMin}
             className={s.inputValue}/>
      <SliderGroup.Root className={s.SliderRoot} defaultValue={value}
                        ref={ref}
                        onValueChange={onHandler}
                        step={1}>
        <SliderGroup.Track className={s.SliderTrack}>
          <SliderGroup.Range className={s.SliderRange}/>
        </SliderGroup.Track>
        <SliderGroup.Thumb className={s.SliderThumb} aria-label="Volume"/>
        <SliderGroup.Thumb className={s.SliderThumb} aria-label="Volume"
                           ref={ref}/>
      </SliderGroup.Root>
      <input type="text" value={max} onChange={onChangeValueMax}
             className={s.inputValue}/>
    </div>



    // return (<div className={s.selectBlock}>
    //     <SelectGroup.Root value={value} onOpenChange={handlerOpenedMenu}
    //                       disabled={disabled}>
    //       <span
    //         className={disabled ? s.textLabelDisabled : s.textLabel}>{label}</span>
    //       <SelectGroup.Trigger className={s.button} tabIndex={0} ref={ref}>
    //         <div className={s.selectValueBlock}>
    //           <div
    //             className={disabled ? s.disabled + " " + s.valuePlaceholder : s.valuePlaceholder}>
    //             <SelectGroup.Value
    //               placeholder={placeholder}
    //             />
    //           </div>
    //           {open ? <ChevronUpIcon
    //               className={disabled ? s.iconDisabled + ' ' + s.icon : s.icon}/> :
    //             <ChevronDownIcon
    //               className={disabled ? s.iconDisabled + ' ' + s.icon : s.icon}/>}
    //         </div>
    //       </SelectGroup.Trigger>
    //       <SelectGroup.Content position="popper" className={s.content}>
    //
    //         <SelectGroup.Viewport className={s.viewport}>
    //           <SelectGroup.Group className={s.items}>
    //             {array?.map((item: any) => {
    //               return <Item children={item.title} value={item.value}/>
    //             })}
    //           </SelectGroup.Group>
    //         </SelectGroup.Viewport>
    //       </SelectGroup.Content>
    //     </SelectGroup.Root>
    //   </div>
  )
})
//
// type Props = {
//   children: string
//   value?: string
// }
// export const Item = (props: Props) => {
//   const {children} = props
//   return (<SelectGroup.Item value={children} className={s.item}>
//     <SelectGroup.ItemText
//       className={s.itemText}>{children}</SelectGroup.ItemText>
//   </SelectGroup.Item>)
// }
//
