import {FieldValues, useController, UseControllerProps,} from "react-hook-form";

import {InputProps, Inputs} from "@/components/ui/inputs";

type ControlledInput<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & InputProps

export const ControlledInput = <TFieldValues extends FieldValues>
({type, name, control, ...res}: ControlledInput<TFieldValues>) => {
  const {
    field,
    fieldState: {error}
  } = useController({
    name,
    control
  });

  return <Inputs type={type}
                 label={name}
                 errorMessage={error?.message}
                 {...field}
                 {...res} />
};
