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
  step: number
  array?: { title: string, value: string }[]
  placeholder?: string
  disabled: boolean
} & ComponentPropsWithoutRef<typeof SliderGroup.Root>;

export const Slider = forwardRef<ElementRef<typeof SliderGroup.Root>, SelectProps>((props, ref) => {
  const {
    value,
    step,
  } = props;

  const [min, setMin] = useState<number>(value[0])
  const [max, setMax] = useState(value[1])

  const onHandler = (ref: any) => {
    setMin(ref[0])
    setMax(ref[1])
  }

  const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMin(Number(e.currentTarget.value))
  }

  const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMax(Number(e.currentTarget.value))
  }


  console.log(min, max)

  return (<div className={s.selectBlock}>
      <input type="text" value={min} onChange={onChangeMinHandler}
             className={s.inputValue}/>
      <SliderGroup.Root className={s.SliderRoot}
                        defaultValue={value}
                        value={[min, max]}
                        max={value[1]}
                        minStepsBetweenThumbs={step}
                        ref={ref}
                        onValueChange={onHandler}
                        step={step}>
        <SliderGroup.Track className={s.SliderTrack}>
          <SliderGroup.Range className={s.SliderRange}/>
        </SliderGroup.Track>
        {value.map((i: any, index: number) => {
          return <SliderGroup.Thumb key={index} className={s.SliderThumb}
                                    aria-label="Volume"
          />
        })}

      </SliderGroup.Root>
      <input type="text" value={max} onChange={onChangeMaxHandler}
             className={s.inputValue}/>
    </div>

  )
})

