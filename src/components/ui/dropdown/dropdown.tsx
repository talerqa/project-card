import {ComponentPropsWithoutRef, ElementRef, forwardRef,} from "react";
import s from './dropdown.module.scss'
import * as SliderGroup from '@radix-ui/react-slider';
import {Typography} from "@/components/ui/typography";

export type SliderProps = {
  label: "DropDown" | "DropDownWithIcon"
  children: string
  // value: number[]
  // step: number
  // minStepsBetweenThumbs: number
} & ComponentPropsWithoutRef<typeof SliderGroup.Root>;

export const DropDown = forwardRef<ElementRef<typeof SliderGroup.Root>, SliderProps>((props, ref) => {
  const {
    label, children,
    ...res
  } = props;

  return (<div className={s.sliderBlock}>
      <Typography variant={"body1"} as={"p"}
                  className={s.valueText}/>

      <Typography variant="body1" as="span"
                  className={s.valueText}/>
    </div>
  )
})

