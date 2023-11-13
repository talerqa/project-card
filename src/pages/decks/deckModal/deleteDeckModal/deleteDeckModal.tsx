import { useNavigate } from "react-router-dom";

import s from "./deckDeleteModal.module.scss";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { DeckType, useDeleteDeckMutation } from "@/services/decks";

type Props = {
  closeModalHandler: () => void;
  item: DeckType;
};

export const DeleteDeckModal = (props: Props) => {
  const { item, closeModalHandler } = props;

  const Navigate = useNavigate();

  const [deletePack] = useDeleteDeckMutation();

  return (
    <div className={s.deckModal}>
      <div className={s.textBlock}>
        <Typography variant={"body1"} className={s.text} as={"p"}>
          Do you really want to remove
          <Typography
            variant={"subtitle1"}
            className={s.namePack}
            as={"span"}
          >{` ${item.name} ?`}</Typography>
        </Typography>
        <Typography variant={"body1"} className={s.text} as={"span"}>
          All cards will be deleted
        </Typography>
      </div>
      <div className={s.buttonsBlock}>
        <Button
          type={"button"}
          variant={"secondary"}
          onClick={closeModalHandler}
        >
          Cancel
        </Button>
        <Button
          type={"submit"}
          onClick={() => {
            deletePack({ id: item?.id });
            Navigate("/decks");
            closeModalHandler();
          }}
        >
          Delete Pack
        </Button>
      </div>
    </div>
  );
};
