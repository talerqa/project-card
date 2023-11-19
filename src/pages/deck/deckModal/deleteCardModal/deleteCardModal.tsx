import s from "./deleteCardModal.module.scss";

import { Button, Typography } from "@/components";
import { useDeleteCardMutation } from "@/services/cards";

type DeleteCardModalPropsType = {
  closeModalHandler: () => void;
  cardId?: string;
};

export const DeleteCardModal = ({
  closeModalHandler,
  cardId,
}: DeleteCardModalPropsType) => {
  const [deleteCard, { isLoading }] = useDeleteCardMutation();

  const handleDeleteClick = async () => {
    if (cardId) {
      await deleteCard(cardId);
      closeModalHandler();
    }
  };

  return (
    <div className={s.modal}>
      <Typography variant="body1" as="span">
        <div>Are you sure you want to delete this card? </div>
        <div>Deleted cards can&apos;t be restored</div>
      </Typography>
      <div className={s.buttonGroup}>
        <Button
          type={"button"}
          variant={"secondary"}
          className={s.deleteModalButton + " " + s.cancelButton}
          onClick={closeModalHandler}
        >
          <Typography variant="body1" as="span">
            Cancel
          </Typography>
        </Button>
        <Button
          type="button"
          className={s.deleteModalButton}
          onClick={handleDeleteClick}
          disabled={isLoading}
        >
          <Typography variant="body1" as="span">
            Delete
          </Typography>
        </Button>
      </div>
    </div>
  );
};
