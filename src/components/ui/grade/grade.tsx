import {ComponentPropsWithoutRef, ElementRef, forwardRef,} from "react";
import * as SelectGroup from "@radix-ui/react-select";

import s from "./grade.module.scss";
import {GradeFull} from "@/assets/components/grade-full.tsx";
import {GradeNull} from "@/assets/components/grade-null.tsx";

export type SelectProps = {
  value: number
  maxRating: number
} & ComponentPropsWithoutRef<'div'>;

export const Grade = forwardRef<
  ElementRef<typeof SelectGroup.Root>,
  SelectProps
>((props, ref) => {
  const {
    placeholder,
    onChange,
    className,
    maxRating,
    value,
    ...res
  } = props;


  return (
    <div ref={ref} {...res} className={s.grade}>
      {[...Array(maxRating)].map((_, index) => {
        return index + 1
      }).map((start) => {
        return <div className={s.start}>{value >= start ? <GradeFull/> : <GradeNull/>}</div>
      })}
    </div>
  );
});

