import { DialogsModal } from "@/components/ui/dialogs";
import { AddNewCardModal } from "@/pages/deck/deckModal";
import { CreateDeckForm, DeleteDeckModal, ShowModalType } from "@/pages/decks";
import { EditModalForm } from "@/pages/decks/deckModal/editModlaForm";
import { DeckType } from "@/services/decks";

type Props = {
  item?: DeckType;
  activeMenu: any;
  setActiveMenu: (value: boolean) => void;
  setShowModal: (value: ShowModalType) => void;
  showModal: any;
};

export const DeckModal = (props: Props) => {
  const { item, setActiveMenu, activeMenu, setShowModal, showModal } = props;

  const closeModalHandler = () => {
    setActiveMenu(false);
    setShowModal("");
  };

  return (
    <DialogsModal open={activeMenu} setOpen={setActiveMenu} title={showModal}>
      {showModal === "Delete Pack" && (
        <>
          {" "}
          <DeleteDeckModal item={item} closeModalHandler={closeModalHandler} />
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

      {/*  /!*{showModal === 'Delete Pack' &&*!/*/}
      {/*  /!*    <DeleteDeckModal item={pack}*!/*/}
      {/*  /!*                     closeModalHandler={closeModalHandler}/>}*!/*/}
      {/*  /!*{showModal === 'Edit Pack' &&*!/*/}
      {/*  /!*    <EditModalForm item={pack} closeModalHandler={closeModalHandler}/>}*!/*/}
      {/*  /!*{showModal === 'Add New Pack' &&*!/*/}
      {/*  /!*    <AddNewCardModal item={pack} closeModalHandler={closeModalHandler}/>}*!/*/}
    </DialogsModal>
  );
};
