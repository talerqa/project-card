import {HeaderTable, Sort, Table} from "@/components/ui/table";
import {DeckType, GetDecks, useGetDecksQuery,} from "@/services/decks";
import {useMemo, useState} from "react";
import {Pagination} from "@/components/ui/pagination";
import s from "./decks.module.scss";
import {Page} from "@/components/ui/page";
import {RowTable} from "@/pages/deck/rowTable";
import {InfoTable} from "@/pages/deck/infoTable";
import {DeckModal} from "@/pages/deck/deckModal";

export  type ShowModalType = '' | 'Delete Pack' | 'Edit Pack' | 'Learn' |
  'Add New Pack'

export const Decks = () => {
  const {Root, Body} = Table;
  const [name, setName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [orderBy, setSort] = useState<Sort>(null);

  const sortedString = useMemo(() => {
    if (!orderBy) return null;
    let sorted: GetDecks["orderBy"] = `${orderBy.key}-${orderBy.direction}`;
    return sorted;
  }, [orderBy]);

  const {data} = useGetDecksQuery({
    currentPage,
    name,
    itemsPerPage,
    orderBy: sortedString,
  });

  const [showModal, setShowModal] = useState<ShowModalType>('')
  const [pack, setPack] = useState()
  const [openMenu, setOpenMenu] = useState(false)

  return (<Page className={s.deck}>
    <InfoTable setShowModal={setShowModal}
               setOpenMenu={setOpenMenu}
               setName={setName}
               name={name}
               maxCardsCount={data?.maxCardsCount}
    />
    <Root className={s.rootTable}>
      <HeaderTable
        columns={[
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
        ]}
        sort={orderBy}
        onSort={setSort}
      />
      <Body className={s.headerTable}>
        {data?.items.length && data.items.map((item: DeckType) => {
          return <RowTable
            key={item.id}
            item={item}
            setActiveMenu={setOpenMenu}
            setPack={setPack}
            setShowModal={setShowModal}
          />
        })}
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
        {title: "10", value: "10"},
        {title: "20", value: "20"},
        {title: "50", value: "50"},
        {title: "100", value: "100"},
      ]}
      totalPages={data?.pagination.totalPages}
      itemsPerPage={data?.pagination.itemsPerPage}
      currentPage={currentPage}
      className={s.pagination}
      onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
      onClick={(value: number) => setCurrentPage(value)}
    />
  </Page>)
}