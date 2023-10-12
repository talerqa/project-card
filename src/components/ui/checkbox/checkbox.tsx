import * as CheckboxRadix from "@radix-ui/react-checkbox";
import {CheckIcon} from "@radix-ui/react-icons";

import s from "./checkbox.module.scss";
import {Typography} from "@/components/ui/typography";

export type CheckboxProps = {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  id: string;
  className?: string,
};

export const Checkbox = ({  className,
                           checked,
                           id,
                           onChange,
                           label,
                           disabled,
                           required,
                         }: CheckboxProps): JSX.Element => (
    <div className={`${s.checkBox} ${className}`}>
      <div className={s.checkBoxWrapper}>
        <CheckboxRadix.Root
          disabled={disabled}
          className={s.CheckboxRoot}
          checked={checked}
          onCheckedChange={onChange}
          required={required}
          id={id}
        >
          <CheckboxRadix.Indicator
            aria-disabled={disabled}
            className={s.CheckboxIndicator}
          >
            <CheckIcon/>
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>
      <Typography variant={'body2'}
                  as={'label'}
                  htmlFor={id}
                  children={label}
                  className={s.Label}/>
    </div>
);
