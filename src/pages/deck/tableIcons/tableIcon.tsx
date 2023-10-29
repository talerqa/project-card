import {EditSvg} from "@/assets/components/edit.tsx";
import {PlaySvg} from "@/assets/components/play.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";

type Props = {
  id: string
  setId: any
  setShowModal: any
}

export const TableIcon = (props: Props) => {
  return (<div>
    <PlaySvg  onClick={props.setShowModal}/>
    {/*<EditSvg  onClick={props.setShowModal}/>*/}
    <TrashIcon onClick={()=>{
      props.setShowModal('delete')
      props.setId(props.id)
    }} />
  </div>)
}