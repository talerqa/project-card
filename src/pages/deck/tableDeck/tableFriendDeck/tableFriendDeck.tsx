import { FC } from "react";

import s from "./tableFriendDeck.module.scss";

import { HeaderTable, Table } from "@/components/ui/table";
import { ShowModalType } from "@/pages";
import { RowDeckTable } from "@/pages/deck/tableDeck";
import { headerTitleTableArray } from "@/pages/deck/tableDeck/dataTable.ts";
import { CardType, GetResponseTypeCard } from "@/services/decks";

type TableFriendDeckType = {
  cards?: GetResponseTypeCard;
  isOwn: boolean;
  handleOpenModal: (modalType: ShowModalType, isModalOpen: boolean) => void;
  setPack: (pack: CardType) => void;
};

export const TableFriendDeck: FC<TableFriendDeckType> = ({
  cards,
  isOwn,
  handleOpenModal,
  setPack,
}) => {
  const { Root, Body } = Table;

  return (
    <>
      <Root className={s.rootTable}>
        <HeaderTable
          columns={headerTitleTableArray}
          // sort={orderBy}
          // onSort={setSort}
        />
        <Body className={s.headerTable}>
          {cards?.items.map((item: CardType, index) => {
            return (
              <RowDeckTable
                key={index}
                item={item}
                isOwn={isOwn}
                setPack={setPack}
                handleOpenModal={handleOpenModal}
              />
            );
          })}
        </Body>
      </Root>
    </>
  );
};
