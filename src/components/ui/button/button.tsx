import {ComponentPropsWithoutRef, ElementType} from "react";
import s from "./button.module.scss";
import iconExit from "./img/exit.svg";
import iconExitDisabled from "./img/exitDisabled.svg";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: "primary" | "secondary" | 'primaryWithIcon' | "tertiary" | "link" | 'secondaryWithIcon';
  className?: string;
  children?: string
  classNameText?: string
  icon: boolean
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const {
    variant = "primary",
    className, icon,
    classNameText, children, disabled,
    as: Component = "button",
    ...rest
  } = props;

  return (<div className={s.button}>
      <Component
        className={`${s[variant]} ${className}`}
        children={<>
          {icon && <img src={!disabled ? iconExit : iconExitDisabled} alt=""
                        className={s.icon}/>}
          {variant !== 'link' &&
              <span className={classNameText}>{children}</span>
          }
          {variant === 'link' && <>{children}</>}
        </>
        }
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};
