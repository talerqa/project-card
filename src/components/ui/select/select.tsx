import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectGroup from "@radix-ui/react-select";

import s from "./select.module.scss";

export type SelectProps = {
  variant?: "default";
  label?: "Select-box";
  array?: { title: string; value: string }[];
  placeholder?: string;
  disabled: boolean;
  onChange: (value: any) => void;
} & ComponentPropsWithoutRef<typeof SelectGroup.Root>;

export const Select = forwardRef<
  ElementRef<typeof SelectGroup.Root>,
  SelectProps
>((props, ref) => {
  const { label, placeholder, array, value, disabled, onChange, ...res } =
    props;

  const [open, setOpen] = useState<boolean>(false);

  const handlerOpenedMenu = () => {
    setOpen(!open);
  };

  const onValueChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className={s.selectBlock}>
      <SelectGroup.Root
        value={value}
        onOpenChange={handlerOpenedMenu}
        disabled={disabled}
        onValueChange={(value) => onValueChange(value)}
        {...res}
      >
        <span className={disabled ? s.textLabelDisabled : s.textLabel}>
          {label}
        </span>
        <SelectGroup.Trigger className={s.button} tabIndex={0} ref={ref}>
          <div className={s.selectValueBlock}>
            <div
              className={
                disabled
                  ? s.disabled + " " + s.valuePlaceholder
                  : s.valuePlaceholder
              }
            >
              <SelectGroup.Value placeholder={placeholder} />
            </div>
            {open ? (
              <ChevronUpIcon
                className={disabled ? s.iconDisabled + " " + s.icon : s.icon}
              />
            ) : (
              <ChevronDownIcon
                className={disabled ? s.iconDisabled + " " + s.icon : s.icon}
              />
            )}
          </div>
        </SelectGroup.Trigger>
        <SelectGroup.Content position="popper" className={s.content}>
          <SelectGroup.Viewport className={s.viewport}>
            <SelectGroup.Group className={s.items}>
              {array?.map(
                (item: { title: string; value: string }, key: number) => {
                  return (
                    <Item key={key} value={item.value}>
                      {item.title}
                    </Item>
                  );
                }
              )}
            </SelectGroup.Group>
          </SelectGroup.Viewport>
        </SelectGroup.Content>
      </SelectGroup.Root>
    </div>
  );
});

type Props = {
  children: string;
  value?: string;
};
export const Item = (props: Props) => {
  const { children } = props;

  return (
    <SelectGroup.Item value={children} className={s.item}>
      <SelectGroup.ItemText className={s.itemText}>
        {children}
      </SelectGroup.ItemText>
    </SelectGroup.Item>
  );
};
