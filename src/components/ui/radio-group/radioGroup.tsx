import {
  ComponentPropsWithoutRef,
  ElementRef,
  FieldsetHTMLAttributes,
  forwardRef,
  HTMLAttributes,
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
  onValueChange: any;
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
      onValueChange,
      ...rest
    }: RadioGroupPropsType,
    ref,
  ) => {
    return (
      <form>
        <RadioGroupLib.Root
          className={s.RadioGroupRoot}
          // defaultValue={defaultValue}
          aria-label="View density"
          onValueChange={onValueChange}
          ref={ref}
          disabled={disabled}
          {...rest}
        >
          {options.map((option, index) => {
            return (
              <RadioItem key={index} value={option.value} title={option.key} />
            );
          })}
        </RadioGroupLib.Root>
      </form>
    );
  },
);

type RadioItemProps = {
  value?: number | string;
  title?: number | string;
};

const RadioItem = ({ value, title }: RadioItemProps) => {
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
        {title}
      </label>
    </div>
  );
};
