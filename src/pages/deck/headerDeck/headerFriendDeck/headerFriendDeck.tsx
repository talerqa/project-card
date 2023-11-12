import { FC } from "react";

import { useNavigate } from "react-router-dom";

import s from "./headerDeck.module.scss";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ModalType, ShowModalType } from "@/pages";
import { DeckType, GetResponseTypeCard } from "@/services/decks";

type Props = {
  deck?: DeckType;
  setShowModal: (value: ModalType | ShowModalType) => void;
  setOpen: (value: boolean) => void;
  cards?: GetResponseTypeCard;
};

export const HeaderFriendDeck: FC<Props> = ({ deck, cards }) => {
  const navigate = useNavigate();

  return (
    <div className={s.informationBlock}>
      <div className={s.leftBlock}>
        <Typography className={s.title} variant={"large"} as={"h2"}>
          Friends Pack
        </Typography>
        {deck?.cover && (
          <img
            src={deck.cover.toString()}
            alt="cover-deck"
            className={s.imageCover}
          />
        )}
      </div>
      {cards?.items.length !== 0 ? (
        <Button
          type={"button"}
          variant={"primary"}
          className={s.button}
          onClick={() => navigate(`../decks/${deck?.id}/learn`)}
        >
          Learn to Pack
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
