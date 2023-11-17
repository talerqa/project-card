import { HeaderTable, Table } from "@/components/ui/table";
import { RowTable } from "@/pages";
import { DeckModal } from "@/pages/deckModal";
import { DeckType } from "@/services/decks";

export type ShowModalType =
  | ""
  | "Delete Pack"
  | "Edit Pack"
  | "Learn"
  | "Add New Pack"
  | "Delete Card"
  | "Add New Card"
  | "Edit Card";

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

export const TableDecks = ({
  orderBy,
  setSort,
  data,
  setOpenMenu,
  openMenu,
  setPack,
  setShowModal,
  showModal,
  pack,
}: any) => {
  const { Root, Body } = Table;

  return (
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
        item={pack as DeckType}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </Root>
  );
};
