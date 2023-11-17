import { NavLink, useNavigate } from "react-router-dom";

import s from "./rowTable.module.scss";

import { EditSvg } from "@/assets/components/edit.tsx";
import { PlaySvg } from "@/assets/components/play.tsx";
import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { Table } from "@/components/ui/table";
import { ShowModalType } from "@/pages/decks";
import { useAuthMeQuery } from "@/services/auth";
import { DeckType } from "@/services/decks";

type Props = {
  item: DeckType;
  setActiveMenu: (value: boolean) => void;
  setPack: (value: DeckType) => void;
  setShowModal: (value: ShowModalType) => void;
};

export const RowTable = (props: Props) => {
  const { item, setPack, setActiveMenu, setShowModal } = props;
  const { Row, Cell } = Table;
  const { data } = useAuthMeQuery();
  const navigate = useNavigate();

  const learnDeckHandler = () => {
    setPack(item);
    setActiveMenu(true);
    setShowModal("Learn");
    item.cardsCount === 0
      ? navigate(`${item.id}/cards`)
      : navigate(`${item.id}/learn`);
  };

  const editDeckHandler = () => {
    setPack(item);
    setActiveMenu(true);
    setShowModal("Edit Pack");
  };

  const deleteDeckHandler = () => {
    setPack(item);
    setActiveMenu(true);
    setShowModal("Delete Pack");
  };

  return (
    <Row key={item.id}>
      <Cell className={s.cell}>
        <NavLink to={`${item.id}/cards`} className={s.name}>
          {item.name}
          {item.cover ? (
            <img src={item?.cover as string} alt="cover" className={s.image} />
          ) : (
            <></>
          )}
        </NavLink>
      </Cell>
      <Cell className={s.cell}>{item.cardsCount}</Cell>
      <Cell className={s.cell}>
        {new Date(item.updated).toLocaleDateString()}
      </Cell>
      <Cell className={`${s.cell} ${s.createdByRow}`}>
        <span>{item.author.name}</span>
        <div className={s.buttonBlock}>
          <button className={s.button} onClick={learnDeckHandler}>
            <PlaySvg />
          </button>
          {data?.id === item.userId && (
            <button className={s.button} onClick={editDeckHandler}>
              <EditSvg />
            </button>
          )}
          {data?.id === item.userId && (
            <button className={s.button} onClick={deleteDeckHandler}>
              <TrashIcon />
            </button>
          )}
        </div>
      </Cell>
    </Row>
  );
};
