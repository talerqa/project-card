import { FC, useState } from "react";

import s from "./infoTable.module.scss";

import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { Button } from "@/components/ui/button";
import { IconSvgButton } from "@/components/ui/button/button.stories.tsx";
import { Input } from "@/components/ui/inputs";
import { SliderWithUseState } from "@/components/ui/slider/slider.stories.tsx";
import { TabSwitcher } from "@/components/ui/tab-switcher";
import { Typography } from "@/components/ui/typography";
import { ShowModalType } from "@/pages/decks";
import { decksActions } from "@/services/decksSlice";
import {
  currentPageSelector,
  searchNameSelector,
} from "@/services/decksSlice/decksSelector.ts";
import { useAppDispatch, useAppSelector } from "@/services/store.ts";

type Props = {
  setShowModal: (value: ShowModalType) => void;
  setOpenMenu: (value: boolean) => void;

  maxCardsCount?: number;
  auth: any;
};

export const InfoTable: FC<Props> = ({
  setShowModal,
  setOpenMenu,
  // setCurrentPage,
  auth,
}) => {
  const dispatch = useAppDispatch();
  const searchName = useAppSelector(searchNameSelector);
  const { setSearchName, setAuthorId, setCurrentPage } = decksActions;

  const [page, setPage] = useState(1);

  const [active, setActive] = useState(1);

  const currentPage = useAppSelector(currentPageSelector);

  const onValueChange = (value: number) => {
    setPage(currentPage);
    if (active) {
      dispatch(setAuthorId({ authorId: auth.id }));
      dispatch(setCurrentPage({ currentPage: 1 }));
    } else {
      dispatch(setAuthorId({ authorId: "" }));
      dispatch(setCurrentPage({ currentPage: page }));
    }
    if (value) setActive(+value);
  };

  return (
    <>
      <div className={s.packListBlock}>
        <Typography variant={"large"} as={"p"}>
          Packs list
        </Typography>
        <Button
          type={"button"}
          onClick={() => {
            setShowModal("Add New Pack");
            setOpenMenu(true);
          }}
        >
          Add New Pack
        </Button>
      </div>
      <div className={s.packListFind}>
        <Input
          type="search"
          placeholder="Input search"
          value={searchName}
          onChange={(event) => {
            dispatch(setSearchName({ name: event.target.value }));
          }}
        />
        <div>
          <Typography variant={"body2"} as={"span"}>
            Show packs cards
          </Typography>
          <TabSwitcher
            tabs={["My Cards", "All Cards"]}
            active={active}
            onValueChange={onValueChange}
          />
        </div>
        <div>
          <Typography variant={"body2"} as={"span"}>
            Number of cards
          </Typography>
          <SliderWithUseState
            label="Number of cards"
            value={[0, 61]}
            step={1}
            minStepsBetweenThumbs={1}
          />
        </div>
        <Button
          type={"button"}
          variant="secondaryWithIcon"
          icon={
            <IconSvgButton className={s.iconTrash}>
              {" "}
              <TrashIcon />{" "}
            </IconSvgButton>
          }
        >
          <Typography variant={"subtitle2"} as={"span"}>
            Clear Filter
          </Typography>
        </Button>
      </div>
    </>
  );
};
