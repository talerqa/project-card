import { FC, useEffect, useState } from "react";

import { decksActions } from "../../../services/decks/decksSlice";

import s from "./infoTable.module.scss";

import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { Slider } from "@/components";
import { Button } from "@/components/ui/button";
import { IconSvgButton } from "@/components/ui/button/button.stories.tsx";
import { Input } from "@/components/ui/inputs";
import { TabSwitcher } from "@/components/ui/tab-switcher";
import { Typography } from "@/components/ui/typography";
import { ShowModalType } from "@/pages/decks";
import { useAuthMeQuery } from "@/services";
import {
  authorIdSelector,
  currentPageSelector,
  minCardCountSelector,
  searchNameSelector,
} from "@/services/decks/decksSlice/decksSelector.ts";
import { useAppDispatch, useAppSelector } from "@/services/store.ts";

type Props = {
  setShowModal: (value: ShowModalType) => void;
  setOpenMenu: (value: boolean) => void;
  maxCardsCount?: number;
  totalPage?: number;
};

export const InfoTable: FC<Props> = ({
  setShowModal,
  setOpenMenu,
  maxCardsCount,
  totalPage,
}) => {
  const dispatch = useAppDispatch();
  const { data: auth } = useAuthMeQuery();

  const currentPage = useAppSelector(currentPageSelector);
  const minCount = useAppSelector(minCardCountSelector);
  const searchName = useAppSelector(searchNameSelector);
  const authorId = useAppSelector(authorIdSelector);

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
    if (authorId) {
      setActive(0);
    }
    if (maxCardsCount) {
      dispatch(setMaxCard({ maxCard: max }));
    } else {
      return;
    }
    if (totalPage !== undefined) {
      if (currentPage > totalPage) {
        dispatch(setCurrentPage({ currentPage: 1 }));
        setPage(totalPage as number);
      }
    }
  }, [maxCardsCount, authorId, currentPage, totalPage, max]);

  const onValueChange = (value: number) => {
    setPage(currentPage);
    if (active) {
      dispatch(setAuthorId({ authorId: auth?.id as string }));
      dispatch(setCurrentPage({ currentPage: 1 }));
    } else {
      dispatch(setAuthorId({ authorId: "" }));
      dispatch(setCurrentPage({ currentPage: page }));
    }
    if (value) setActive(+value);
  };

  const onChangeSliderHandler = (ref: number[]) => {
    dispatch(setMinCard({ minCard: ref[0] }));
    dispatch(setMaxCard({ maxCard: ref[1] }));
    setMin(ref[0]);
    setMax(ref[1]);
  };

  const filteredDecksHandler = () => {
    setMin(0);
    setMax(maxCardsCount as number);
    setActive(1);
    dispatch(setClearFilter({ min: 0, max: maxCardsCount as number }));
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
          onChange={(event) =>
            dispatch(setSearchName({ name: event.target.value }))
          }
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
            value={[0, maxCardsCount as number]}
            label="Number of cards"
            min={min as number}
            max={max as number}
            onValueChange={onChangeSliderHandler}
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
          onClick={filteredDecksHandler}
        >
          <Typography variant={"subtitle2"} as={"span"}>
            Clear Filter
          </Typography>
        </Button>
      </div>
    </>
  );
};
