import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import s from "./checkbox.module.scss";

export type CheckboxProps = {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  id?: string;
};

export const Checkbox = ({
  checked,
  onChange,
  disabled,
  required,
  id,
}: CheckboxProps) => (
  <form>
    <div style={{ display: "flex", alignItems: "center" }}>
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
            <CheckIcon />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>
      <label className={s.Label} htmlFor="c1">
        Accept terms and conditions.
      </label>
    </div>
  </form>
);
