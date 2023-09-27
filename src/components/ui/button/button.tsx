import {ComponentPropsWithoutRef, ElementType} from "react";
import s from "./button.module.scss";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: "primary" | "secondary" | "tertiary" | "link" | 'secondaryWithIcon';
  fullWidth?: boolean;
  className?: string;
  children?: any
  classNameText?: string
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const {
    variant = "primary",
    fullWidth,
    className,
    classNameText,
    children,disabled,
    as: Component = "button",
    ...rest
  } = props;

  return (<div className={s.button}>
      <Component
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ""} ${className}`}
        children={<span className={classNameText}>{children}</span>}
        disabled={disabled}
        {...rest}
      />

    </div>

  );
};
