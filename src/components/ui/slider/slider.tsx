import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import s from './slider.module.scss'
import * as SliderGroup from '@radix-ui/react-slider';
import {Typography} from "@/components/ui/typography";

export type SelectProps = {
  label?: 'Slider'
  variant?: "default";
  value: number[]
  step: number
  disabled: boolean
} & ComponentPropsWithoutRef<typeof SliderGroup.Root>;

export const Slider = forwardRef<ElementRef<typeof SliderGroup.Root>, SelectProps>((props, ref) => {
  const {
    value,
    disabled,
    step,
  } = props;

  const [min, setMin] = useState<number>(value[0])
  const [max, setMax] = useState(value[1])

  const onHandler = (ref: number[]) => {
    setMin(ref[0])
    setMax(ref[1])
  }

  return (<div className={s.sliderBlock}>
      <Typography variant={"body1"} as={"p"} children={min}
                  className={s.valueText}/>
      <SliderGroup.Root className={s.SliderRoot}
                        defaultValue={value}
                        value={[min, max]}
                        max={value[1]}
                        minStepsBetweenThumbs={step}
                        ref={ref}
                        onValueChange={onHandler}
                        step={step}
      disabled={disabled}>
        <SliderGroup.Track className={s.SliderTrack}>
          <SliderGroup.Range className={s.SliderRange}/>
        </SliderGroup.Track>
        {value.map((_, index: number) => {
          return <SliderGroup.Thumb key={index} className={s.SliderThumb}
                                    aria-label="Volume"
          />
        })}
      </SliderGroup.Root>
      <Typography variant={"body1"} as={"span"} children={max}
                  className={s.valueText}/>
    </div>

  )
})

