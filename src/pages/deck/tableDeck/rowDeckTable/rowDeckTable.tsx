import { FC } from "react";

import s from "./rowDeckTable.module.scss";

import { EditSvg } from "@/assets/components/edit.tsx";
import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { useFormattedDate } from "@/assets/hooks";
import { Grade } from "@/components/ui/grade";
import { Table } from "@/components/ui/table";
import { ShowModalType } from "@/pages";
import { CardType } from "@/services/decks";

type Props = {
  item: CardType;
  handleOpenModal: (modalType: ShowModalType, isModalOpen: boolean) => void;
  isOwn: boolean;
  setPack: (pack: CardType) => void;
};

export const RowDeckTable: FC<Props> = ({
  item,
  handleOpenModal,
  isOwn,
  setPack,
}) => {
  const { Row, Cell } = Table;

  const handleEditCardClick = () => {
    handleOpenModal("Edit Card", true);
    setPack(item);
  };

  const handleDeleteCardClick = () => {
    handleOpenModal("Delete Card", true);
    setPack(item);
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
        {useFormattedDate(new Date(item.updated).toLocaleDateString())}
      </Cell>
      <Cell className={s.cell + " " + s.createdByRow}>
        <Grade value={item.grade} maxRating={5} />
        {isOwn ? (
          <div className={s.buttonBlock}>
            <button className={s.button} onClick={handleEditCardClick}>
              <EditSvg />
            </button>
            <button className={s.button} onClick={handleDeleteCardClick}>
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
