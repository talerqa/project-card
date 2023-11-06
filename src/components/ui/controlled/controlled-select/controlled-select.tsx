import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { Select, SelectProps } from "@/components/ui/select";

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<SelectProps, "onChange" | "value">;
export const ControlledSelect = <TFieldValues extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  array,
  ...selectProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  });

  return (
    <Select
      array={array}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      {...selectProps}
    />
  );
};
