import { useNavigate } from "react-router-dom";

import s from "./headerDeck.module.scss";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { DeckType } from "@/services/decks";

export const HeaderFriendDeck = ({ deck }: { deck?: DeckType }) => {
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
      <Button
        type={"button"}
        variant={"primary"}
        onClick={() => navigate(`../decks/${deck?.id}/learn`)}
      >
        Learn to Pack
      </Button>
    </div>
  );
};
