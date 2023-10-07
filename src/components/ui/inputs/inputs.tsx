import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  KeyboardEvent, ReactNode,
  useState,
} from "react";
import searchIconFocus from "../../../assets/img/magnifying-glass-focus.svg";
import searchIcon from "../../../assets/img/magnifying-glass.svg";
import s from "./inputs.module.scss";
import {EyeOpenIcon} from "@/assets/components/eyeOpenIcon.tsx";
import {EyeNoneIcon} from "@/assets/components/eyeNoneIcon.tsx";
import {SearchIcon} from "@/assets/components/searchIcon.tsx";


export type InputProps<T extends ElementType = "input"> = {
  variant?: "default" | "toggle" | "search";
  type: "text" | "search" | "password";
  text?: string;
  label?: string;
  error?: string;
  children?: ReactNode
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
} & ComponentPropsWithoutRef<T>;

//JSX.Element any because with return type of JSXElement appears an error Property 'children' is missing in type 'Element' but required in type 'ReactPortal'
export const Inputs = forwardRef<HTMLInputElement, InputProps>(
  (props, ref): JSX.Element => {
    const {
      onChange,
      onBlur,
      type = "text",
      error,
      disabled,
      label,children,
      placeholder,
      variant = "default",
      onKeyDown,
      errorMessage,
      ...res
    } = props;

    const [value, setValue] = useState<string>("");

    const [focus, setFocus] = useState<boolean>(false);

    //const [open, setOpen] = useState(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      setValue(e.currentTarget.value);
    };

    const result =
      variant === "search" && !errorMessage
        ? s.searchInput
        : errorMessage && variant === "search"
          ? s.searchInput + " " + s.error
          : errorMessage && (variant === "default" || variant === "toggle")
            ? s.input + " " + s.error
            : s.input;

    const handler = () => setFocus((focus) => !focus);
    const onBlurHandler = () => {
      setFocus(false);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        onKeyDown?.(e);
      }
    };

    // const searchIconToRender = () => {
    //   if (variant === "search" && focus) {
    //     return (
    //       <img src={searchIconFocus} alt="search-icon" className={s.search}/>
    //     );
    //   } else if (variant === "search") {
    //     return <img src={searchIcon} alt="search-icon" className={s.search}/>;
    //   } else {
    //     return "";
    //   }
    // };
    return (
      <div className={s.inputBlock}>
        <span className={s.label}>{variant === "search" ? "" : label}</span>
        <div className={s.buttonBlock}>
          {type === 'password' &&
              <button className={s.eyeButton} disabled={disabled}
                      onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeNoneIcon/> : <EyeOpenIcon disabled={disabled}/>}
              </button>}
          {type === 'search' &&
              <button disabled={disabled} className={s.search}>
                <SearchIcon/>
              </button>}


          {/* {variant === "search" && focus ? (
            <img src={searchIconFocus} alt="search-icon" className={s.search} />
          ) : variant === "search" ? (
            <img src={searchIcon} alt="search-icon" className={s.search} />
          ) : (
            ""
          )} */}
          {/* !!!! Implemented a func instead of code above */}
         {/*{searchIconToRender()}*/}
        </div>
        <div className={s.root}>
          <input
            tabIndex={0}
            onFocus={handler}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            ref={ref}
            value={value}
            className={result}
            placeholder={placeholder}
            disabled={disabled}

            type={type === 'password' && !showPassword ? 'password' : 'text'}
            onKeyDown={onKeyPressHandler}
            {...res}
          />
        </div>
        <span className={s.labelError}>{errorMessage}</span>
        {/*<InputIcon icon={searchIconFocus}/>*/}

      </div>

    );
  }
);

// type InputIconType = {
//   icon: ReactNode
// }

// const InputIcon = (props: InputIconType) => {
//   return <button> {props.icon}</button>
// }