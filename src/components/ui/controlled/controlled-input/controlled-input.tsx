import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { Input, InputProps } from "@/components/ui/inputs";

type ControlledInputType<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<InputProps, "value" | "onChange">;

export const ControlledInput = <TFieldValues extends FieldValues>({
  type,
  name,
  control,
  ...res
}: ControlledInputType<TFieldValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const { value, ...restField } = field;

  return (
    <Input
      type={type}
      errorMessage={error?.message}
      value={value || ""}
      {...restField}
      {...res}
    />
  );
};
