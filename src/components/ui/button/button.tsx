import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import s from "./button.module.scss";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: | "primary" | "secondary" | "primaryWithIcon" | "tertiary" | 'link' | 'secondaryWithIcon'
  children?: ReactNode
  icon?: ReactNode;
  type: ButtonHTMLAttributes<HTMLAttributes<T>>["type"];
} & ComponentPropsWithoutRef<T>;

//ref???

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>,
    keyof ButtonProps<T>>
): JSX.Element => {
  const {
    variant = "primary",
    as: Component = "button",
    type = 'button',
    icon,
    children,
    disabled,
    ...res
  } = props;

  return (<div className={s.button}>
      <Component
        className={`${s[variant]}`}
        type={type}
        disabled={disabled}
        children={<>{icon} {children}</>}
        {...res}
      />
    </div>
  );
}
