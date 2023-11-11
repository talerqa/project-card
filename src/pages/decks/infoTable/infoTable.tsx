import { FC, useEffect, useState } from "react";

import s from "./infoTable.module.scss";

import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { Slider } from "@/components";
import { Button } from "@/components/ui/button";
import { IconSvgButton } from "@/components/ui/button/button.stories.tsx";
import { Input } from "@/components/ui/inputs";
import { TabSwitcher } from "@/components/ui/tab-switcher";
import { Typography } from "@/components/ui/typography";
import { ShowModalType } from "@/pages/decks";
import { decksActions } from "@/services/decksSlice";
import {
  currentPageSelector,
  minCardCountSelector,
  searchNameSelector,
} from "@/services/decksSlice/decksSelector.ts";
import { useAppDispatch, useAppSelector } from "@/services/store.ts";

type Props = {
  setShowModal: (value: ShowModalType) => void;
  setOpenMenu: (value: boolean) => void;
  maxCardsCount: any;
  auth: any;
};

export const InfoTable: FC<Props> = ({
  setShowModal,
  setOpenMenu,
  auth,
  maxCardsCount,
}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(currentPageSelector);
  const minCount = useAppSelector(minCardCountSelector);
  //const maxCount = useAppSelector(maxCardsCountSelector);
  const searchName = useAppSelector(searchNameSelector);
  const {
    setSearchName,
    setAuthorId,
    setCurrentPage,
    setClearFilter,
    setMinCard,
    setMaxCard,
  } = decksActions;
  const [min, setMin] = useState<number>(minCount as number);
  const [max, setMax] = useState<number>(maxCardsCount as number);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (maxCardsCount) {
      dispatch(setMaxCard({ maxCard: maxCardsCount }));
    } else {
      return;
    }
  }, [maxCardsCount]);

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

  const onHandler = (ref: number[]) => {
    dispatch(setMinCard({ minCard: ref[0] }));
    dispatch(setMaxCard({ maxCard: ref[1] }));
    setMin(ref[0]);
    setMax(ref[1]);
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
          <Slider
            value={[0, maxCardsCount]}
            label="Number of cards"
            min={min as number}
            max={max as number}
            onValueChange={onHandler}
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
          onClick={() => {
            setMin(0);
            setMax(maxCardsCount);
            setActive(1);
            dispatch(setClearFilter({ min: 0, max: maxCardsCount }));
          }}
        >
          <Typography variant={"subtitle2"} as={"span"}>
            Clear Filter
          </Typography>
        </Button>
      </div>
    </>
  );
};
