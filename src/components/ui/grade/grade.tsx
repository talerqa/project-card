import { ComponentPropsWithoutRef, FC, forwardRef } from "react";

import s from "./grade.module.scss";

import { GradeFull } from "@/assets/components/grade-full.tsx";
import { GradeNull } from "@/assets/components/grade-null.tsx";

type Props = {
  value: number;
  maxRating: number;
} & ComponentPropsWithoutRef<"div">;

export const Grade: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ placeholder, onChange, className, maxRating, value, ...res }, ref) => {
    return (
      <div className={s.grade}>
        {[...Array(maxRating)]
          .map((_, index) => {
            return index + 1;
          })
          .map((start, index) => {
            return (
              <div ref={ref} {...res} key={index} className={s.start}>
                {value >= start ? <GradeFull /> : <GradeNull />}
              </div>
            );
          })}
      </div>
    );
  },
);
