import {Table} from "@/components/ui/table";
import s from "@/pages/deck/deck.module.scss";
import {PlaySvg} from "@/assets/components/play.tsx";
import {EditSvg} from "@/assets/components/edit.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";

type Props = {

}

export const RowTable = (props: any) => {

  const {Row, Cell} = Table;
  const {data: item, setItem, setActiveMenu, setShowModal, setId} = props

  return (
    <Row key={item.id}>
      <Cell className={s.cell} onClick={() => {
        setId(item.id)
      }}>{item.name}</Cell>
      <Cell className={s.cell}>{item.cardsCount}</Cell>
      <Cell className={s.cell}>
        {new Date(item.updated).toLocaleDateString()}
      </Cell>
      <Cell className={`${s.createdByRow} ${s.cell}`}>
        <span> {item.author.name}</span>


        <button onClick={() => {
          setItem(item)
          setActiveMenu(true)
          setShowModal('Edit Pack')
        }}>
          <PlaySvg/>
        </button>




        <button onClick={() => {
          setItem(item)
          setActiveMenu(true)
          setShowModal('Edit Pack')
        }}>
          <EditSvg/>
        </button>

        <button onClick={() => {
          setItem(item)
          setActiveMenu(true)
          setShowModal('Delete Pack')
        }}>
          <TrashIcon/>
        </button>

      </Cell>
    </Row>)
}