import { FC } from "react";

import s from "./tableFriendDeck.module.scss";

import { Pagination } from "@/components/ui/pagination";
import { HeaderTable, Table } from "@/components/ui/table";
import { RowDeckTable } from "@/pages/deck/tableDeck";
import {
  headerTitleTableArray,
  paginationSize,
} from "@/pages/deck/tableDeck/dataTable.ts";
import { CardType, DeckType, GetResponseTypeCard } from "@/services/decks";

type TableFriendDeckType = {
  deckData?: DeckType;
  cards?: GetResponseTypeCard;
  setOpen: (value: boolean) => void;
  isOwn: boolean;
};

export const TableFriendDeck: FC<TableFriendDeckType> = ({
  cards,
  setOpen,
  isOwn,
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
                setOpen={setOpen}
                isOwn={isOwn}
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
