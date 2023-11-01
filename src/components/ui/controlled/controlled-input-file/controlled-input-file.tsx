import {FieldValues, useController, UseControllerProps,} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ReactNode
} from "react";
import {Typography} from "@/components/ui/typography";
import s from './controlled-input-file.module.scss';

type ControlledInputType<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<InputFileProps, 'onChange'>
export const ControlledInputFile = <TFieldValues extends FieldValues>({
                                                                        type,
                                                                        name,
                                                                        control,
                                                                        ...res
                                                                      }: ControlledInputType<TFieldValues>): JSX.Element => {
  const {
    field: {onChange},
    fieldState: {error},
  } = useController({
    name,
    control,
  });


  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      onChange?.(file)
    }
  };

  return (<>
      <Button type={'button'}
              variant='secondary'
      />
      <InputFile type={type} label={name}
                 changeHandler={uploadHandler}
                 errorMessage={error?.message} {...res}/>
    </>
  );
};

export type InputFileProps<T extends ElementType = "input"> = {
  type?: any
  label?: string
  errorMessage?: string;
  children?: ReactNode;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | File>) => void
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void
} & ComponentPropsWithoutRef<T>;

const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const {onChange, type, errorMessage, changeHandler, className, ...res} = props

  return <>
    <input
      onChange={changeHandler}
      ref={ref}
      className={`${s.input} ${className}`}
      type={type}
      {...res}
    />
    <Typography
      variant={"caption"}
      as={"span"}
      className={s.labelError}
      children={errorMessage}
    />
  </>
})