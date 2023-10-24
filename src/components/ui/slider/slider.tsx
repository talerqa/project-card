import {ComponentPropsWithoutRef, ElementRef, forwardRef,} from "react";
import s from './slider.module.scss'
import * as SliderGroup from '@radix-ui/react-slider';
import {Typography} from "@/components/ui/typography";

export type SliderProps = {
  label: string
  value: number[]
  step: number
  minStepsBetweenThumbs: number
  disabled?: boolean
} & ComponentPropsWithoutRef<typeof SliderGroup.Root>;

export const Slider = forwardRef<ElementRef<typeof SliderGroup.Root>, SliderProps>((props, ref) => {
  const {
    value, disabled, minStepsBetweenThumbs, step,
    min = value[0], max = value[1], onValueChange,
    ...res
  } = props;

  return (<div className={s.sliderBlock}>
      <Typography variant={"body1"} as={"p"} children={min}
                  className={s.valueText}/>
      <SliderGroup.Root className={s.SliderRoot}
                        defaultValue={value}
                        value={[min, max]}
                        min={value[0]}
                        max={value[1]}
                        minStepsBetweenThumbs={minStepsBetweenThumbs}
                        ref={ref}
                        onValueChange={onValueChange}
                        step={step}
                        disabled={disabled}
                        {...res}>
        <SliderGroup.Track className={s.SliderTrack}>
          <SliderGroup.Range className={s.SliderRange}/>
        </SliderGroup.Track>
        {value.map((index: number) => {
          return <SliderGroup.Thumb key={index} className={s.SliderThumb}/>
        })}
      </SliderGroup.Root>
      <Typography variant="body1" as="span" children={max}
                  className={s.valueText}/>
    </div> )
})

