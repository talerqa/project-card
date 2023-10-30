import {PlaySvg} from "@/assets/components/play.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";
import {EditSvg} from "@/assets/components/edit.tsx";

type Props = {
  id: string
  setId: any
  setShowModal: any
}

export const TableIcon = (props: Props) => {
  console.log('TABLE ICON')
  const playModalHandler = () => {
    props.setShowModal('play')
    props.setId(props.id)
  }

  const deleteModalHandler = () => {
    props.setShowModal('delete')
    props.setId(props.id)
  }

  const editModalHandler = () => {
    props.setShowModal('edit')
    props.setId(props.id)
  }

  return (<div>
    <PlaySvg onClick={playModalHandler}/>
    <EditSvg onClick={editModalHandler}/>
    <TrashIcon onClick={deleteModalHandler}/>
  </div>)
}