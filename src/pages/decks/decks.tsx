import { useMemo, useState } from "react";

import s from "./decks.module.scss";

import { Loader } from "@/assets/components/loader";
import { Page } from "@/components/ui/page";
import { Pagination } from "@/components/ui/pagination";
import { HeaderTable, Sort, Table } from "@/components/ui/table";
import { DeckModal } from "@/pages/decks/deckModal";
import { InfoTable } from "@/pages/decks/infoTable";
import { RowTable } from "@/pages/decks/rowTable";
import { useAuthMeQuery } from "@/services";
import { DeckType, GetDecks, useGetDecksQuery } from "@/services/decks";
import { decksActions } from "@/services/decksSlice";
import {
  authorIdSelector,
  currentPageSelector,
  searchNameSelector,
} from "@/services/decksSlice/decksSelector.ts";
import { useAppDispatch, useAppSelector } from "@/services/store.ts";

export type ShowModalType =
  | ""
  | "Delete Pack"
  | "Edit Pack"
  | "Learn"
  | "Add New Pack";

const HeaderTitleTableArray = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "cardsCount",
    title: "Cards",
  },
  {
    key: "updated",
    title: "Last Updated",
  },
  {
    key: "created",
    title: "Created by",
  },
];

export const Decks = () => {
  const { Root, Body } = Table;
  const dispatch = useAppDispatch();
  const searchName = useAppSelector(searchNameSelector);
  const authorId = useAppSelector(authorIdSelector);
  const currentPage = useAppSelector(currentPageSelector);

  const { setCurrentPage } = decksActions;

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [orderBy, setSort] = useState<Sort>(null);

  // const [currentPage, setCurrentPage] = useState<any>(1);
  // const [authorId, setAuthorId] = useState<string | undefined>("");

  const sortedString = useMemo(() => {
    if (!orderBy) return null;
    let sorted: GetDecks["orderBy"] = `${orderBy.key}-${orderBy.direction}`;

    return sorted;
  }, [orderBy]);

  const { data: auth } = useAuthMeQuery();

  const { data, isLoading } = useGetDecksQuery({
    currentPage,
    name: searchName,
    itemsPerPage,
    authorId,
    orderBy: sortedString,
  });

  const [showModal, setShowModal] = useState<ShowModalType>("");
  const [pack, setPack] = useState<DeckType>();
  const [openMenu, setOpenMenu] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <Page className={s.deck}>
      <InfoTable
        setShowModal={setShowModal}
        setOpenMenu={setOpenMenu}
        // setCurrentPage={setCurrentPage}
        auth={auth}
        maxCardsCount={data?.maxCardsCount}
      />
      <Root>
        <HeaderTable
          columns={HeaderTitleTableArray}
          sort={orderBy}
          onSort={setSort}
        />
        <Body>
          {data?.items.length ? (
            data.items.map((item: DeckType) => {
              return (
                <RowTable
                  key={item.id}
                  item={item}
                  setActiveMenu={setOpenMenu}
                  setPack={setPack}
                  setShowModal={setShowModal}
                />
              );
            })
          ) : (
            <></>
          )}
        </Body>
        <DeckModal
          activeMenu={openMenu}
          setActiveMenu={setOpenMenu}
          item={pack}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </Root>
      <Pagination
        pageSizeValue={[
          { title: "10", value: "10" },
          { title: "20", value: "20" },
          { title: "50", value: "50" },
          { title: "100", value: "100" },
        ]}
        totalPages={data?.pagination.totalPages}
        itemsPerPage={data?.pagination.itemsPerPage}
        currentPage={currentPage}
        className={s.pagination}
        onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
        onClick={(value: number) =>
          dispatch(setCurrentPage({ currentPage: value }))
        }
      />
    </Page>
  );
};
