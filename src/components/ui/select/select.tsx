import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";

import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import * as SelectGroup from "@radix-ui/react-select";

import s from "./select.module.scss";
import clsx from "clsx";

export type SelectProps = {
  variant?: "default";
  label?: string;
  array?: { title: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: any) => void;
  className?: string
  value?: string
} & ComponentPropsWithoutRef<typeof SelectGroup.Root>;

export const Select = forwardRef<
  ElementRef<typeof SelectGroup.Root>,
  SelectProps
>((props, ref) => {
  const {
    label,
    placeholder,
    array,
    value,
    disabled,
    onChange,
    className,
    ...res
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  console.log(
    value
  )

  const selectClasses = {
    selectContainer: clsx(s.selectBlock, className),
    content: clsx(s.content, className),
    viewport: clsx(s.viewport, className),
    button: clsx(s.button, className),
    item: clsx(s.item, className),
  };

  const handlerOpenedMenu = () => {
    setOpen(!open);
  };

  const onValueChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className={selectClasses.selectContainer}>
      <SelectGroup.Root
        value={value}
        onOpenChange={handlerOpenedMenu}
        disabled={disabled}
        onValueChange={(value) => onValueChange(value)}
        {...res}>
        <span className={disabled ? s.textLabelDisabled : s.textLabel}>
          {label}
        </span>
        <SelectGroup.Trigger
          className={s.button}
          tabIndex={0}
          ref={ref}>
          <div className={s.selectValueBlock}>
            <div
              className={disabled
                ? `${s.disabled} ${s.valuePlaceholder}`
                : s.valuePlaceholder}>
              <SelectGroup.Value placeholder={placeholder}/>
            </div>
            <div>
              {open
                ? (<ChevronUpIcon
                  className={disabled ? `${s.iconDisabled} ${s.icon}` : s.icon}
                />)
                : (<ChevronDownIcon
                    className={disabled ? `${s.iconDisabled} ${s.icon}` : s.icon}
                  />
                )}
            </div>
          </div>
        </SelectGroup.Trigger>
        <SelectGroup.Content position="popper"
                             className={selectClasses.content}>
          <SelectGroup.Viewport className={selectClasses.viewport}>
            <SelectGroup.Group className={s.items}>
              {array?.map(
                (item: { title: string; value: string }, key: number) => {
                  return <Item key={key} value={item.value}
                               itemClassName={selectClasses.item}>
                    {item.title}
                  </Item>
                })}
            </SelectGroup.Group>
          </SelectGroup.Viewport>
        </SelectGroup.Content>
      </SelectGroup.Root>
    </div>
  );
});

type ItemProps = {
  children: string;
  value?: string;
  itemClassName: string;
};

export const Item = (props: ItemProps) => {
  const {children, itemClassName,} = props;

  return (
    <SelectGroup.Item value={children} className={itemClassName}>
      <SelectGroup.ItemText className={s.itemText}>
        {children}
      </SelectGroup.ItemText>
    </SelectGroup.Item>
  );
};
