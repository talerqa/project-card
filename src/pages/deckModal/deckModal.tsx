import { EditModalForm } from "../decks/deckModal/editModalForm";

import { DialogsModal } from "@/components/ui/dialogs";
import {
  AddNewCardModal,
  DeleteCardModal,
  EditCardModal,
} from "@/pages/deck/deckModal";
import { CreateDeckForm, DeleteDeckModal, ShowModalType } from "@/pages/decks";
import { CardType, DeckType } from "@/services/decks";

type Props = {
  item: DeckType;
  activeMenu: any;
  setActiveMenu: (value: boolean) => void;
  setShowModal: (value: ShowModalType) => void;
  showModal: ShowModalType;
  pack?: CardType;
};

export const DeckModal = (props: Props) => {
  const { item, setActiveMenu, activeMenu, setShowModal, showModal, pack } =
    props;

  const closeModalHandler = () => {
    setActiveMenu(false);
    setShowModal("");
  };

  return (
    <>
      <DialogsModal open={activeMenu} setOpen={setActiveMenu} title={showModal}>
        {showModal === "Delete Pack" && (
          <>
            {" "}
            <DeleteDeckModal
              item={item as DeckType}
              closeModalHandler={closeModalHandler}
            />
          </>
        )}
        {showModal === "Edit Pack" && (
          <>
            {" "}
            <EditModalForm item={item} closeModalHandler={closeModalHandler} />
          </>
        )}
        {showModal === "Add New Pack" && (
          <>
            {" "}
            <CreateDeckForm item={item} closeModalHandler={closeModalHandler} />
          </>
        )}
        {showModal === "Add New Card" && (
          <>
            {" "}
            <AddNewCardModal
              deckId={item?.id}
              closeModalHandler={closeModalHandler}
            />
          </>
        )}
        {showModal === "Delete Card" && (
          <>
            <DeleteCardModal
              cardId={pack!.id}
              closeModalHandler={closeModalHandler}
            />
          </>
        )}
        {showModal === "Edit Card" && (
          <>
            <EditCardModal
              card={pack as CardType}
              closeModalHandler={closeModalHandler}
            />
          </>
        )}
      </DialogsModal>
    </>
  );
};
