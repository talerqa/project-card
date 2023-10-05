import {
  ComponentPropsWithoutRef,
  ElementRef,
  FieldsetHTMLAttributes,
  HTMLAttributes,
  forwardRef,
} from "react";

import * as RadioGroupLib from "@radix-ui/react-radio-group";

import s from "./radioGroup.module.scss";

type Option = {
  value: string | number;
  key?: number | string;
} & ComponentPropsWithoutRef<"input">;

type CustomFieldSetType = Omit<
  HTMLAttributes<FieldsetHTMLAttributes<HTMLFieldSetElement>>,
  "dir"
>;

export type RadioGroupPropsType = RadioGroupLib.RadioGroupProps & {
  options: Option[];
  disabled?: boolean;
  defaultValue?: string;
} & CustomFieldSetType;

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupLib.Root>,
  RadioGroupPropsType
>(
  (
    {
      options,
      disabled = false,
      defaultValue,
      dir,
      ...rest
    }: RadioGroupPropsType,
    ref
  ) => {
    return (
      <form>
        <RadioGroupLib.Root
          className={s.RadioGroupRoot}
          // defaultValue={defaultValue}
          aria-label="View density"
          ref={ref}
          disabled={disabled}
          {...rest}
        >
          {options.map((option) => {
            return <RadioItem key={option.value} value={option.value} />;
          })}
        </RadioGroupLib.Root>
      </form>
    );
  }
);

const RadioItem = ({ value }: Option) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <RadioGroupLib.Item
        className={s.RadioGroupItem}
        value={`${value}`}
        id={`${value}`}
      >
        <RadioGroupLib.Indicator className={s.RadioGroupIndicator} />
      </RadioGroupLib.Item>
      <label className={s.Label} htmlFor={`${value}`}>
        {value}
      </label>
    </div>
  );
};
