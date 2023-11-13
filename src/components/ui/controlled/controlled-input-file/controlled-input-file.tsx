import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ReactNode,
} from "react";

import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import s from "./controlled-input-file.module.scss";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

type ControlledInputType<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<InputFileProps, "onChange">;

export const ControlledInputFile = <TFieldValues extends FieldValues>({
  title,
  onLoadCover,
  type,
  name,
  className,
  control,
  ...res
}: ControlledInputType<TFieldValues>): JSX.Element => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      onChange?.(file);
      onLoadCover(file);
    }
  };

  return (
    <div className={className}>
      <Button
        type={"button"}
        variant="secondary"
        className={s.button}
        disabled={false}
      >
        <Typography variant={"body1"} as={"span"} className={s.textButton}>
          {title}
        </Typography>
        <InputFile
          type={type}
          label={name}
          changeHandler={uploadHandler}
          {...res}
        />
      </Button>
      <Typography variant={"caption"} as={"span"} className={s.labelError}>
        {error?.message}
      </Typography>
    </div>
  );
};

export type InputFileProps<T extends ElementType = "input"> = {
  type?: any;
  label?: string;
  children?: ReactNode;
  onLoadCover?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement | File>) => void;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<T>;

const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { onChange, type, changeHandler, ...res } = props;

  return (
    <input
      onChange={changeHandler}
      ref={ref}
      className={s.input}
      type={type}
      title={""}
      {...res}
    />
  );
});
