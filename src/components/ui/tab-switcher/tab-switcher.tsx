import * as ToggleGroup from "@radix-ui/react-toggle-group";

import s from "./tab-switcher.module.scss";

export type TabSwitcherProps = {
  tabs: string[];
  title?: string
  activeTab?: number;
  disabled?: boolean;
  onChange?: any
  active: any
  setActive: any
  onValueChange: any
};

export const TabSwitcher = ({
                              tabs,
                              disabled,
                              active,
                              onValueChange
                            }: TabSwitcherProps) => {

  return (<ToggleGroup.Root
      type="single"
      value={`${active}`}
      onValueChange={onValueChange}
    >
      {tabs.map((tab, index) => {
        return (
          <ToggleGroup.Item
            key={index}
            value={`${index}`}
            className={
              disabled
                ? s.tabDisabled
                : active === index
                  ? s.buttonTab + " " + s.tabActive
                  : s.buttonTab + " " + s.ToggleGroupItem
            }
          >
            {tab}
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
};
