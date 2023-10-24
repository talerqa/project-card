import {useState} from "react";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

import s from "./tab-switcher.module.scss";

export type TabSwitcherProps = {
  tabs: string[];
  title?: string
  activeTab?: number;
  disabled?: boolean;
};

export const TabSwitcher = ({
                              tabs,
                              activeTab,
                              disabled,
                            }: TabSwitcherProps) => {
  const [active, setActive] = useState(activeTab || NaN);

  return (<ToggleGroup.Root
      type="single"
      value={`${active}`}
      onValueChange={(value) => {
        if (value) setActive(+value);
      }}
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
