import {DeckType,} from "@/services/decks";
import {DialogsModal} from "@/components/ui/dialogs";
import {ShowModalType} from "@/pages/deck";
import {CreateDeckForm, DeleteDeckModal} from "@/pages/deck/deckModal";
import {EditModalForm} from "@/pages/deck/deckModal/editModlaForm";


type Props = {
  item?: DeckType
  activeMenu: any
  setActiveMenu: (value: boolean) => void
  setShowModal: (value: ShowModalType) => void
  showModal: any
}

export const DeckModal = (props: Props) => {

  const {item, setActiveMenu, activeMenu, setShowModal, showModal} = props

  const closeModalHandler = () => {
    setActiveMenu(false)
    setShowModal('')
  }

  return <DialogsModal open={activeMenu} setOpen={setActiveMenu}
                       title={showModal}>
    {showModal === 'Delete Pack' &&
        <DeleteDeckModal item={item}
                         closeModalHandler={closeModalHandler}/>}
    {showModal === 'Edit Pack' &&
        <EditModalForm item={item} closeModalHandler={closeModalHandler}/>}
    {showModal === 'Add New Pack' &&
        <CreateDeckForm item={item} closeModalHandler={closeModalHandler}/>}
  </DialogsModal>
}
