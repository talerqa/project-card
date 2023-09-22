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
  variant?: "default" | "toggle" | "search";
  type: 'text' | "search" | 'password';
  text?: string
  label?: string
  error?: boolean
  disabled?: boolean,
  placeholder?: string
} & ComponentPropsWithoutRef<T>;

export const Inputs = forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
  const {
    type = 'password', error, disabled, label, placeholder, variant = 'default'
  } = props;

  // const [openText, setOpenText] = useState(showText)
  const [value, setvalue] = useState('');
  const [typeInput, setTypeInput] = useState(type)

  const [focus, setFocus] = useState<boolean>(false)

  const showHandler = () => {
    setTypeInput(typeInput === 'password' ? 'text' : 'password');
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setvalue(e.currentTarget.value)

  }
  // variant?: "default" | "defaultToggle" | "defaultSearch";
  const result =
    variant === 'search' && !error
      ? s.searchInput
      : error && variant === 'search'
        ? s.searchInput + ' ' + s.error
        : (error && (variant === 'default' || variant === 'toggle'))
          ? s.input + ' ' + s.error
          : s.input;


  const handler = () => setFocus(focus => !focus)
  const onBlurHandler = () => {
    setFocus(false)
  }

  return (<div>
    <Flex>
      <Text className={s.label}>{variant === 'search' ? '' : label}</Text>
      <TextField.Slot className={s.slot}>


        {variant === 'default' || variant === 'search'
          ? ''
          : disabled
            ? <EyeOpenIcon className={s.eyeOpenIconDisabled}
                           onClick={showHandler}/>
            : typeInput === 'password' ? <EyeNoneIcon className={s.eyeOpenIcon}
                                                      onClick={showHandler}/>
          : <EyeOpenIcon className={s.eyeOpenIcon}
                      onClick={showHandler}/> }

      {variant === 'search'
        ? <MagnifyingGlassIcon
          className={focus ? s.searchFocused : s.search}/> : ''}

    </TextField.Slot>
    <TextField.Root className={s.root}>
      <TextField.Input
        onFocus={handler}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        ref={ref}
        value={value}
        className={result}
        placeholder={placeholder}
        size="1"
        disabled={disabled}
        type={typeInput}/>
    </TextField.Root>
  </Flex>
{
  error && <Text className={s.labelError}>Error!</Text>
}
</div>
)
})