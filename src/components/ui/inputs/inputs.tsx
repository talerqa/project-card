import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  KeyboardEvent,
  ReactNode,
  useState,
} from "react";
import s from "./inputs.module.scss";
import {EyeOpenIcon} from "@/assets/components/eyeOpenIcon.tsx";
import {EyeNoneIcon} from "@/assets/components/eyeNoneIcon.tsx";
import {SearchIcon} from "@/assets/components/searchIcon.tsx";
import clsx from "clsx";
import {Typography} from "@/components/ui/typography";

export type InputProps<T extends ElementType = "input"> = {
  type: "text" | "search" | "password";
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  children?: ReactNode
  disabled?: boolean;
  className?: string,
} & ComponentPropsWithoutRef<T>;

export const Inputs = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const {
      type,
      label,
      placeholder,
      errorMessage,
      onChange,
      className,
      disabled,
      onKeyDown,
      ...res
    } = props;

    const [value, setValue] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      setValue(e.currentTarget.value);
    };

    const classname = clsx(type === "search" && !errorMessage && s.searchInput,
      errorMessage && type === "search" && s.searchInput + " " + s.error,
      errorMessage && (type === "text" || type === "password") && s.input + " " + s.error,
      s.input)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        onKeyDown?.(e);
      }
    };

    return (<div className={`${s.inputBlock} ${className}`}>
      <Typography variant={'body2'} as={'span'} className={s.label}
                  children={type === "search" ? "" : label}/>
      <div className={s.buttonBlock}>
        {type === 'password' &&
            <button className={s.eyeButton} disabled={disabled}
                    onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeNoneIcon/> :
                <EyeOpenIcon disabled={disabled}/>}
            </button>}
      </div>
      <div className={s.root}>
        {type === 'search' && <SearchIcon/>}
        <input
          tabIndex={0}
          onChange={onChangeHandler}
          ref={ref}
          value={value}
          className={classname}
          placeholder={placeholder}
          disabled={disabled}
          type={type === 'password' && !showPassword ? 'password' : type === 'search' ? 'search' : 'text'}
          onKeyDown={onKeyPressHandler}
          {...res}
        />
        <Typography variant={'caption'} as={'span'} className={s.labelError}
                    children={errorMessage}/>
      </div>
    </div>);
  }
);
