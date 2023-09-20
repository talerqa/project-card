import {ComponentPropsWithoutRef, ElementType, useState, forwardRef} from "react";
import {TextField, Text, Flex} from '@radix-ui/themes';
import s from './inputs.module.scss'
import {EyeOpenIcon} from "@radix-ui/react-icons";


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
  const {type, variant, children, label, showText} = props;

  // const [openText, setOpenText] = useState(showText)
  const [typeInput, setTypeInput] = useState(type)
  const showHandler = () => {
    if (type === 'password') {
      setTypeInput('text')
    }
    if (typeInput === 'text') {
      setTypeInput('password')
    }
  }

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //
  // }
  return (
    <div>
      <Flex>
        <Text className={s.label}>{label}</Text>
        <TextField.Root>
          <TextField.Slot className={s.slot}>
            {showText ? <EyeOpenIcon onClick={showHandler} className={s.eyeOpenIcon} height="20" width="20"/> : ''}
            <TextField.Input
              // onChange={onChangeHandler}
              ref={ref}
              className={s.input}
              placeholder={label}
              size="1"
              type={typeInput}/>
          </TextField.Slot>

        </TextField.Root>
      </Flex>
    </div>
  );
})