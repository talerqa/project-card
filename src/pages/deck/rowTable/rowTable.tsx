import {Table} from "@/components/ui/table";
import s from "@/pages/deck/deck.module.scss";
import {PlaySvg} from "@/assets/components/play.tsx";
import {EditSvg} from "@/assets/components/edit.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";
import {DeckType} from "@/services/decks";
import {ShowModalType} from "@/pages/deck";
import {useAuthMeQuery} from "@/services/auth";

type Props = {
  item: DeckType
  setActiveMenu: (value: boolean) => void
  setPack: any
  setShowModal: (value: ShowModalType) => void
}

export const RowTable = (props: Props) => {

  const {data} = useAuthMeQuery();
  const {Row, Cell} = Table;
  const {item, setPack, setActiveMenu, setShowModal} = props

  return (
    <Row key={item.id}>
      <Cell className={s.cell} onClick={() => {

      }}>{item.name}</Cell>
      <Cell className={s.cell}>{item.cardsCount}</Cell>
      <Cell className={s.cell}>
        {new Date(item.updated).toLocaleDateString()}
      </Cell>
      <Cell className={`${s.createdByRow} ${s.cell}`}>
        <span> {item.author.name}</span>


        <button onClick={() => {
          setPack(item)
          setActiveMenu(true)
          setShowModal('Learn')
        }}>
          <PlaySvg/>
        </button>

        {data?.id === item.userId && <button onClick={() => {
          setPack(item)
          setActiveMenu(true)
          setShowModal('Edit Pack')
        }}>
            <EditSvg/>
        </button>}

        {data?.id === item.userId && <button onClick={() => {
          setPack(item)
          setActiveMenu(true)
          setShowModal('Delete Pack')
        }}>
            <TrashIcon/>
        </button>}


      </Cell>
    </Row>)
}