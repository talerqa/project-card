import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { InputProps, Inputs } from "@/components/ui/inputs";

// type ControlledInputType<TFieldValues extends FieldValues> =
//   UseControllerProps<TFieldValues> & Omit<InputProps, "value" | "onChange">;

type ControlledInputType<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<InputProps, "value" | "onChange">;

export const ControlledInput = <TFieldValues extends FieldValues>({
  type,
  name,
  control,
  ...res
}: ControlledInputType<TFieldValues>): JSX.Element => {
  //
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Inputs type={type} errorMessage={error?.message} {...field} {...res} />
  );
};
