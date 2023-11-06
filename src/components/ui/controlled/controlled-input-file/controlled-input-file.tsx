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
    <>
      <Button
        type={"button"}
        variant="secondary"
        className={s.button}
        disabled={false}
      >
        <Typography
          variant={"body1"}
          as={"span"}
          children={title}
          className={s.textButton}
        />
        <InputFile
          type={type}
          label={name}
          changeHandler={uploadHandler}
          {...res}
        />
      </Button>
      <Typography
        variant={"caption"}
        as={"span"}
        className={s.labelError}
        children={error?.message}
      />
    </>
  );
};

export type InputFileProps<T extends ElementType = "input"> = {
  type?: any;
  label?: string;
  children?: ReactNode;
  className?: string;
  onLoadCover?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement | File>) => void;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<T>;

const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { onChange, type, changeHandler, className, ...res } = props;

  return (
    <input
      onChange={changeHandler}
      ref={ref}
      className={`${s.input} ${className}`}
      type={type}
      title={""}
      {...res}
    />
  );
});
