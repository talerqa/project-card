import {Table} from "@/components/ui/table";
import s from "@/pages/deck/decks.module.scss";
import {PlaySvg} from "@/assets/components/play.tsx";
import {EditSvg} from "@/assets/components/edit.tsx";
import {TrashIcon} from "@/assets/components/trashIcon.tsx";
import {DeckType} from "@/services/decks";
import {ShowModalType} from "@/pages/deck";
import {useAuthMeQuery} from "@/services/auth";
import {NavLink} from "react-router-dom";

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
  console.log(item?.cover)
  return (
    <Row key={item.id}>
      <Cell className={s.cell}>
        <NavLink to={`${item.id}/cards`} className={s.name}>
          {item.name}
          {item.cover ? <img src={item?.cover as string}
                             alt="cover"
                             className={s.image}/> : <></>}
        </NavLink>
      </Cell>
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
          <NavLink to={`${item.id}/learn`}>
            <PlaySvg/>
          </NavLink>
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