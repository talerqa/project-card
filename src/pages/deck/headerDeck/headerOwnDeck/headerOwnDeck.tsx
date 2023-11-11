import { useNavigate } from "react-router-dom";

import s from "./headerOwnDeck.module.scss";

import { TriggerDropDown } from "@/assets/components/triggerDropDown.tsx";
import edit from "@/assets/img/edit.svg";
import play from "@/assets/img/play.svg";
import trash from "@/assets/img/trash.svg";
import { Button } from "@/components/ui/button";
import { DropDown, ItemDropDown } from "@/components/ui/dropdown";
import { Typography } from "@/components/ui/typography";
import { ModalType } from "@/pages/deck";
import { ShowModalType } from "@/pages/decks";
import { DeckType, GetResponseTypeCard } from "@/services";

export type Props = {
  deck?: DeckType;
  setShowModal: (value: ModalType | ShowModalType) => void;
  setOpen: (value: boolean) => void;
  cards?: GetResponseTypeCard;
};

export const HeaderOwnDeck = ({
  deck,
  setOpen,
  setShowModal,
  cards,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={s.informationBlock}>
      <div className={s.leftBlock}>
        <div className={s.blockTitleDeck}>
          <Typography className={s.title} variant={"large"} as={"h2"}>
            My Pack
          </Typography>
          {deck?.cardsCount !== 0 && (
            <>
              <DropDown
                className={s.dropDown}
                align={"end"}
                trigger={
                  <button className={s.trigger}>
                    <TriggerDropDown />
                  </button>
                }
              >
                <div className={s.menu}>
                  <ItemDropDown
                    img={play}
                    title={"Learn"}
                    onClick={() => navigate(`../decks/${deck?.id}/learn`)}
                  />
                  <ItemDropDown
                    img={edit}
                    title={"Edit"}
                    onClick={() => {
                      setOpen(true);
                      setShowModal("Edit Pack");
                    }}
                  />
                  <ItemDropDown
                    img={trash}
                    title={"Delete"}
                    onClick={() => {
                      setOpen(true);
                      setShowModal("Delete Pack");
                    }}
                  />
                </div>
              </DropDown>
            </>
          )}
        </div>
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
          className={s.button}
          variant={"primary"}
          onClick={() => {
            setShowModal("Add New Card");
            setOpen(true);
          }}
        >
          {" "}
          Add New Card
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
