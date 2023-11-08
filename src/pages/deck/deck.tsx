import { useState } from "react";

import { useParams } from "react-router-dom";

import s from "./deck.module.scss";

import { Loader } from "@/assets/components/loader";
import { BackToPage } from "@/components/common/backToPage";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/ui/page";
import { Pagination } from "@/components/ui/pagination";
import { HeaderTable, Table } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { HeaderDeck, RowDeckTable } from "@/pages";
import { ShowModalType } from "@/pages/decks";
import { useAuthMeQuery } from "@/services/auth";
import { CardType, useGetCardsQuery, useGetDeckQuery } from "@/services/decks";

export type ModalType =
  | ""
  | "Delete Card"
  | "Edit Card"
  | "Learn"
  | "Add New Card";

const HeaderTitleTableArray = [
  {
    key: "question",
    title: "Question",
  },
  {
    key: "answer",
    title: "Answer",
  },
  {
    key: "updated",
    title: "Last Updated",
  },
  {
    key: "",
    title: "Grade",
  },
];

export const Deck = () => {
  let { id } = useParams();
  const [question, setQuestion] = useState<string>("");
  const { data } = useGetDeckQuery({ id });
  const { data: auth } = useAuthMeQuery();
  const { data: cards, isLoading } = useGetCardsQuery({
    id,
    question,
  });

  const [open, setOpen] = useState(false);
  const { Root, Body } = Table;
  const [showModal, setShowModal] = useState<ModalType | ShowModalType>("");
  // const [pack, setPack] = useState()

  const isOwn = data?.userId === auth?.id;

  if (isLoading) return <Loader />;

  return (
    <Page className={s.deck}>
      <BackToPage className={s.backToDecks} />
      <HeaderDeck
        open={open}
        setOpen={setOpen}
        showModal={showModal}
        auth={auth}
        setShowModal={setShowModal}
        deck={data}
        cards={cards}
        setQuestion={setQuestion}
        question={question}
      />
      <div className={s.mainBlock}>
        {isOwn ? (
          <>
            {data?.cardsCount === 0 ? (
              <>
                <Typography
                  variant={"body1"}
                  as={"span"}
                  className={s.emptyDeck}
                >
                  This pack is empty. Click add new learnCard to fill this pack
                </Typography>
                <Button
                  className={s.buttonAddNewCard}
                  type={"button"}
                  variant={"primary"}
                  onClick={() => {
                    setShowModal("Add New Card");
                    setOpen(true);
                  }}
                >
                  Add New Card
                </Button>
              </>
            ) : (
              <>
                <Root className={s.rootTable}>
                  <HeaderTable
                    columns={HeaderTitleTableArray}
                    // sort={orderBy}
                    // onSort={setSort}
                  />
                  <Body className={s.headerTable}>
                    {data?.cardsCount &&
                      cards?.items.map((item: CardType, index) => {
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
                  pageSizeValue={[
                    { title: "10", value: "10" },
                    { title: "20", value: "20" },
                  ]}
                  totalPages={cards?.pagination.totalPages}
                  itemsPerPage={cards?.pagination.itemsPerPage}
                  // currentPage={currentPage}
                  // className={s.pagination}
                  // onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
                  // onClick={(value: number) => setCurrentPage(value)}
                />
              </>
            )}
          </>
        ) : (
          <Root className={s.rootTable}>
            <HeaderTable
              columns={HeaderTitleTableArray}
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
        )}
      </div>
    </Page>
  );
};
