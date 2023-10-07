import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
} from "react";

import s from "./button.module.scss";
import iconExit from "../../../assets/img/exit.svg";
import iconExitDisabled from "../../../assets/img/exitDisabled.svg";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?:
    | "primary"
    | "secondary"
    | "primaryWithIcon"
    | "tertiary"
    | "link"
    | "secondaryWithIcon";
  className?: string;
  children?: string;
  classNameText?: string;
  icon: boolean;
  type?: ButtonHTMLAttributes<HTMLAttributes<T>>["type"];
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = "primary",
    className,
    icon,
    classNameText,
    children,
    disabled,
    as: Component = "button",
    type,
    ...rest
  } = props;

  return (
    <div className={s.button}>
      <Component
        className={`${s[variant]} ${className}`}
        type={type}
        disabled={disabled}
        children={<>
          {icon && (
            <img
              src={!disabled ? iconExit : iconExitDisabled}
              alt=""
              className={s.icon}
            />
          )}
          {variant !== "link" &&
              <span className={classNameText}>{children}</span>}
          {variant === "link" && <>{children}</>}</>}
        {...rest}
      />

    </div>
  );
};
