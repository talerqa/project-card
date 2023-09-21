import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  useState
} from "react";
import {Flex, Text, TextField} from '@radix-ui/themes';
import s from './inputs.module.scss'
import {
  EyeNoneIcon,
  EyeOpenIcon,
  MagnifyingGlassIcon
} from "@radix-ui/react-icons";


export type InputProps<T extends ElementType = "input"> = {
  // as?: T;
  variant?: "default" | "defaultToggle" | "defaultSearch";
  children?: string;
  showText?: boolean;
  type?: string;
  text?: string
  label?: string
  error?: boolean
  disabled?: boolean,
} & ComponentPropsWithoutRef<T>;


// <T extends ElementType = "input">

export const Inputs = forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
  const {
    type, error, disabled, label,
    children, showText
  } = props;

  // const [openText, setOpenText] = useState(showText)
  const [value, setvalue] = useState('');
  const [typeInput, setTypeInput] = useState(type)

  const showHandler = () => {
    setTypeInput(typeInput === 'password' ? 'text' : 'password');
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setvalue(e.currentTarget.value)

  }

  const result =
    children === 'search' && !error ? s.searchInput :
      error && children === 'search' ? s.searchInput + ' ' + s.error :
        (error && (children === 'text' || children === 'password')) ? s.input + ' ' + s.error :
          s.input;


  return (<div>
      <Flex>
        <Text className={s.label}>{children === 'search' ? '' : label}</Text>
        <TextField.Slot className={s.slot}>


          {!showText
            ? ''
            : disabled
              ? <EyeOpenIcon className={s.eyeOpenIconDisabled}
                             onClick={showHandler}/>
              : typeInput === 'password' ?
                <EyeNoneIcon className={s.eyeOpenIcon}
                             onClick={showHandler}/> :
                <EyeOpenIcon className={s.eyeOpenIcon}
                             onClick={showHandler}/>}

          {children === 'search'
            ? <MagnifyingGlassIcon className={s.search}/> : ''}

        </TextField.Slot>
        <TextField.Root className={s.root}>

          <TextField.Input
            onChange={onChangeHandler}
            ref={ref}
            value={value}
            className={result}
            placeholder={label}
            size="1"
            disabled={disabled}
            type={typeInput}/>
        </TextField.Root>
      </Flex>
      {error && <Text className={s.labelError}>Error!</Text>}
    </div>
  )
})