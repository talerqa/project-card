import { useEffect, useMemo, useState } from "react";

import s from "./decks.module.scss";

import { Loader } from "@/assets/components/loader";
import { Page } from "@/components/ui/page";
import { Pagination } from "@/components/ui/pagination";
import { Sort } from "@/components/ui/table";
import { InfoTable } from "@/pages/decks/infoTable";
import { TableDecks } from "@/pages/decks/tableDecks";
import { decksActions } from "@/services";
import { DeckType, GetDecks, useGetDecksQuery } from "@/services/decks";
import {
  authorIdSelector,
  currentPageSelector,
  itemsPerPageSelector,
  maxCardsCountSelector,
  minCardCountSelector,
  searchNameSelector,
} from "@/services/decks/decksSlice/decksSelector.ts";
import { useAppDispatch, useAppSelector } from "@/services/store.ts";

export type ShowModalType =
  | ""
  | "Delete Pack"
  | "Edit Pack"
  | "Learn"
  | "Add New Pack"
  | "Delete Card"
  | "Add New Card"
  | "Edit Card";

const paginationSize = [
  { title: "10", value: "10" },
  { title: "20", value: "20" },
  { title: "50", value: "50" },
  { title: "100", value: "100" },
];

export const Decks = () => {
  const dispatch = useAppDispatch();

  const searchName = useAppSelector(searchNameSelector);
  const authorId = useAppSelector(authorIdSelector);
  const currentPage = useAppSelector(currentPageSelector);
  const itemsPerPage = useAppSelector(itemsPerPageSelector);
  const minCardsCount = useAppSelector(minCardCountSelector);
  const maxCardsCount = useAppSelector(maxCardsCountSelector);

  const { setCurrentPageDecks, setItemPerPage } = decksActions;

  const [orderBy, setSort] = useState<Sort>(null);
  const [showModal, setShowModal] = useState<ShowModalType>("");
  const [pack, setPack] = useState<DeckType>();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    dispatch(setItemPerPage({ itemsPerPage: 10 }));
  }, []);

  const sortedString = useMemo(() => {
    if (!orderBy) return null;
    let sorted: GetDecks["orderBy"] = `${orderBy.key}-${orderBy.direction}`;

    return sorted;
  }, [orderBy]);

  const { data, isLoading } = useGetDecksQuery({
    currentPage,
    name: searchName,
    itemsPerPage,
    authorId,
    orderBy: sortedString,
    minCardsCount: minCardsCount?.toString(),
    maxCardsCount: maxCardsCount?.toString(),
  });

  const onChangePerPageHandler = (pageSize: number) => {
    dispatch(setItemPerPage({ itemsPerPage: pageSize }));
  };
  const onChangePagePaginationHandler = (value: number) => {
    dispatch(setCurrentPageDecks({ currentPage: value }));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Page className={s.deck}>
            <InfoTable
              setShowModal={setShowModal}
              setOpenMenu={setOpenMenu}
              maxCardsCount={data?.maxCardsCount}
              totalPage={data?.pagination.totalPages}
            />
            <TableDecks
              orderBy={orderBy}
              setSort={setSort}
              data={data}
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
              setPack={setPack}
              setShowModal={setShowModal}
              showModal={showModal}
              pack={pack}
            />
            <Pagination
              pageSizeValue={paginationSize}
              totalPages={data?.pagination.totalPages}
              className={s.pagination}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onChangePerPage={onChangePerPageHandler}
              onClick={onChangePagePaginationHandler}
            />
          </Page>
        </>
      )}
    </>
  );
};
