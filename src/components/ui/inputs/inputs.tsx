import {
  ComponentPropsWithoutRef,
  ElementType,
  useState,
  forwardRef,
  ChangeEvent
} from "react";
import {TextField, Text, Flex} from '@radix-ui/themes';
import s from './inputs.module.scss'


import eye from './eye-button.svg'
import eyeNone from './eyenone-button.svg'
import search from './search-button.svg'

export type InputProps<T extends ElementType = "input"> = {
  // as?: T;
  variant?: "default" | "defaultToggle" | "defaultSearch";
  children?: string;
  showText?: boolean;
  type?: string;
  text?: string
  label?: string

} & ComponentPropsWithoutRef<T>;


// <T extends ElementType = "input">

export const Inputs = forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
  const {type, label, showText, children} = props;

  // const [openText, setOpenText] = useState(showText)
  const [value, setvalue] = useState('');
  const [typeInput, setTypeInput] = useState(type)

  const showHandler = () => {
    setTypeInput(typeInput === 'password' ? 'text' : 'password');
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setvalue(e.currentTarget.value)

  }

  return (<div>

      <Flex>
        <Text className={s.label}>{children === 'search' ? '' : label}</Text>
        <TextField.Slot className={s.slot}>
          {showText
            ? <img src={typeInput === 'password' ? eyeNone : eye}
                   onClick={showHandler} className={s.eyeOpenIcon}
                   alt="eye"/> : ''}
          {children === 'search'
            ? <img className={s.search} src={search} alt="search"/> : ''}


        </TextField.Slot>
        <TextField.Root className={s.root}>
          <TextField.Input
            onChange={onChangeHandler}
            ref={ref}
            value={value}
            className={children === 'search' ? s.searchInput : s.input}
            placeholder={label}
            size="1"
            type={typeInput}/>
        </TextField.Root>
      </Flex>


    </div>
  );
})