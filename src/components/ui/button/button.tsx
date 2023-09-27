import {ComponentPropsWithoutRef, ElementType} from "react";
import s from "./button.module.scss";
import iconExit from "@/components/ui/button/img/exit.svg";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: "primary" | "secondary" | "tertiary" | "link" | 'secondaryWithIcon';
  fullWidth?: boolean;
  className?: string;
  children?: any
  classNameText?: string
  icon: boolean
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const {
    variant = "primary",
    fullWidth,
    className, icon,
    classNameText,
    children, disabled,
    as: Component = "button",
    ...rest
  } = props;

  return (<div className={s.button}>
      <Component
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ""} ${className}`}
        children={<>
          {icon && <img src={iconExit} alt="" className={s.icon}/>}
          <span className={classNameText}>{children}</span>
        </>
        }
        disabled={disabled}

        {...rest}
      />

    </div>

  );
};
