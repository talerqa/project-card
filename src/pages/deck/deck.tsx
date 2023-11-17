import { useState } from "react";

import { useParams } from "react-router-dom";

import s from "./deck.module.scss";

import { Loader } from "@/assets/components/loader";
import { Pagination } from "@/components";
import { BackToPage } from "@/components/common/backToPage";
import { Page } from "@/components/ui/page";
import { HeaderDeck } from "@/pages";
import { TableDeck } from "@/pages/deck/tableDeck";
import { paginationSize } from "@/pages/deck/tableDeck/dataTable.ts";
import { ShowModalType } from "@/pages/decks";
import { useAuthMeQuery } from "@/services/auth";
import { CardType, useGetCardsQuery, useGetDeckQuery } from "@/services/decks";

export const Deck = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState<ShowModalType>("");
  const [pack, setPack] = useState<CardType>();

  const { data } = useGetDeckQuery({ id });
  const { data: auth } = useAuthMeQuery();
  const { data: cards, isLoading } = useGetCardsQuery({ id, question });

  const isOwn = data?.userId === auth?.id;

  const addNewCardHandler = () => {
    setShowModal("Add New Card");
    setOpen(true);
  };

  const handleOpenModal = (modalType: ShowModalType, isModalOpen: boolean) => {
    setShowModal(modalType);
    setOpen(isModalOpen);
  };

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
        pack={pack as CardType}
      />
      <TableDeck
        isOwn={isOwn}
        setPack={setPack}
        deck={data}
        cards={cards}
        addNewCardHandler={addNewCardHandler}
        handleOpenModal={handleOpenModal}
      />
      {data?.cardsCount !== 0 ? (
        <Pagination
          pageSizeValue={paginationSize}
          totalPages={cards?.pagination.totalPages}
          itemsPerPage={cards?.pagination.itemsPerPage}
          // currentPage={currentPage}
          className={s.pagination}
          // onChangePerPage={(pageSize: number) => setItemsPerPage(pageSize)}
          // onClick={(value: number) => setCurrentPage(value)}
        />
      ) : (
        <></>
      )}
    </Page>
  );
};
