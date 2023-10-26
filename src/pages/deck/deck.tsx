import { HeaderTable, Sort, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  DeckType,
  Direction,
  Field,
  GetDecks,
  useCreateDeckMutation,
  useGetDecksQuery,
} from "@/services/decks";

import { useMemo, useState } from "react";

import { Inputs } from "@/components/ui/inputs";
import { Pagination } from "@/components/ui/pagination";
import { Typography } from "@/components/ui/typography";

import s from "./deck.module.scss";

import { TabSwitcher } from "@/components/ui/tab-switcher";
import { SliderWithUseState } from "@/components/ui/slider/slider.stories.tsx";
import { IconSvgButton } from "@/components/ui/button/button.stories.tsx";
import { TrashIcon } from "@/assets/components/trashIcon.tsx";
import { Page } from "@/components/ui/page";

export const Deck = () => {
  const { Root, Body, Row, Cell } = Table;
  const [name, setName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [createDeck] = useCreateDeckMutation();
  const [orderBy, setSort] = useState<Sort>(null);

  const sortedString = useMemo(() => {
    if (!orderBy) return null;
    let sorted: GetDecks["orderBy"] = `${orderBy.key}-${orderBy.direction}`;

    return sorted;
  }, [orderBy]);

  const { data } = useGetDecksQuery({
    currentPage,
    name,
    itemsPerPage,
    orderBy: sortedString,
  });

  return (
    <Page className={s.deck}>
      <div className={s.packListBlock}>
        <Typography variant={"large"} as={"p"}>
          Packs list
        </Typography>
        <Button
          type={"button"}
          onClick={() => createDeck({ name: "Подвыподверт" })}
        >
          Add New Pack
        </Button>
      </div>
      <div className={s.packListFind}>
        <Inputs
          type="search"
          placeholder="Input search"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <div>
          <Typography variant={"body2"} as={"span"}>
            Show packs cards
          </Typography>
          <TabSwitcher
            tabs={["My Cards", "All Cards"]}
            activeTab={1}
            title={"Show packs cards"}
          />
        </div>
        <div>
          <Typography variant={"body2"} as={"span"}>
            Number of cards
          </Typography>
          <SliderWithUseState
            label="Number of cards"
            value={[0, 20]}
            step={1}
            minStepsBetweenThumbs={1}
          />
        </div>
        <Button
          type={"button"}
          variant="secondaryWithIcon"
          icon={
            <IconSvgButton className={s.iconTrash} children={<TrashIcon />} />
          }
        >
          <Typography variant={"subtitle2"} as={"span"}>
            Clear Filter
          </Typography>
        </Button>
      </div>
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
          {data?.items.map((item: DeckType) => {
            return (
              <Row key={item.id}>
                <Cell className={s.cell}>{item.name}</Cell>
                <Cell className={s.cell}>{item.cardsCount}</Cell>
                <Cell className={s.cell}>
                  {new Date(item.updated).toLocaleDateString()}
                </Cell>
                <Cell className={s.createdByRow + " " + s.cell}>
                  <span> {item.author.name}</span>
                  <span> {item.author.name}</span>
                </Cell>
              </Row>
            );
          })}
        </Body>
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
        onClick={(value: number) => setCurrentPage(value)}
      />
    </Page>
  );
};
