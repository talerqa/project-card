import { FC } from "react";

import s from "./tableOwnDeck.module.scss";

import { Pagination } from "@/components/ui/pagination";
import { HeaderTable, Table } from "@/components/ui/table";
import { ShowModalType } from "@/pages";
import { RowDeckTable } from "@/pages/deck/tableDeck";
import {
  headerTitleTableArray,
  paginationSize,
} from "@/pages/deck/tableDeck/dataTable.ts";
import { CardType, DeckType, GetResponseTypeCard } from "@/services/decks";

type TableOwnDeckType = {
  deckData?: DeckType;
  cards?: GetResponseTypeCard;
  handleOpenModal: (modalType: ShowModalType, isModalOpen: boolean) => void;
  isOwn: boolean;
  setPack: (pack: CardType) => void;
};

export const TableOwnDeck: FC<TableOwnDeckType> = ({
  deckData,
  cards,
  handleOpenModal,
  isOwn,
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
          {deckData?.cardsCount &&
            cards?.items.map((item: CardType) => {
              return (
                <RowDeckTable
                  key={item.id}
                  item={item}
                  handleOpenModal={handleOpenModal}
                  isOwn={isOwn}
                  setPack={setPack}
                />
              );
            })}
        </Body>
      </Root>
      <Pagination
        pageSizeValue={paginationSize}
        totalPages={cards?.pagination.totalPages}
        itemsPerPage={cards?.pagination.itemsPerPage}
        // currentPage={currentPage}
        // className={s.pagination}
        // onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
        // onClick={(value: number) => setCurrentPage(value)}
      />
    </>
  );
};
