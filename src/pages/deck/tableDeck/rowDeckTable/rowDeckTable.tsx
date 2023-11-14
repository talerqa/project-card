import { FC } from "react";

import s from "./rowDeckTable.module.scss";

import { EditSvg } from "@/assets/components/edit.tsx";
import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { Grade } from "@/components/ui/grade";
import { Table } from "@/components/ui/table";
import { useDeleteCardMutation } from "@/services/cards";
import { CardType } from "@/services/decks";

type Props = {
  item: CardType;
  setOpen: (value: boolean) => void;
  isOwn: boolean;
};

export const RowDeckTable: FC<Props> = ({ item, setOpen, isOwn }) => {
  const { Row, Cell } = Table;

  const [deleteCard] = useDeleteCardMutation();

  const handleDeleteCard = () => {
    setOpen(true);
    deleteCard(item.id);
  };

  return (
    <Row key={item.id}>
      <Cell className={s.cell}>
        <p className={s.name}>
          {item.question}
          {item.questionImg ? (
            <img
              src={item?.questionImg as string}
              alt="cover"
              className={s.image}
            />
          ) : (
            <></>
          )}
        </p>
      </Cell>
      <Cell className={s.cell}>
        <p className={s.name}>
          {item.answer}
          {item.answerImg ? (
            <img
              src={item?.answerImg as string}
              alt="cover"
              className={s.image}
            />
          ) : (
            <></>
          )}
        </p>
      </Cell>
      <Cell className={s.cell}>
        {new Date(item.updated).toLocaleDateString()}
      </Cell>
      <Cell className={s.cell + " " + s.createdByRow}>
        <Grade value={item.grade} maxRating={5} />
        {isOwn ? (
          <div className={s.buttonBlock}>
            <button
              className={s.button}
              onClick={() => {
                // setPack(item)
                setOpen(true);
                // setShowModal('Edit Pack')
              }}
            >
              <EditSvg />
            </button>
            <button className={s.button} onClick={handleDeleteCard}>
              <TrashIcon />
            </button>
          </div>
        ) : (
          <></>
        )}
      </Cell>
    </Row>
  );
};
