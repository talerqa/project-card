import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import s from "./deck.module.scss";

import { Loader } from "@/assets/components/loader";
import { Pagination } from "@/components";
import { BackToPage } from "@/components/common/backToPage";
import { Page } from "@/components/ui/page";
import { HeaderDeck } from "@/pages";
import { TableDeck } from "@/pages/deck/tableDeck";
import { ShowModalType } from "@/pages/decks";
import { useAuthMeQuery } from "@/services/auth";
import { cardActions } from "@/services/cards";
import {
  currentPageCardsSelector,
  itemsPerPageCardsSelector,
  searchNameQuestionCard,
} from "@/services/cards/cardsSlice/cardsSelector.ts";
import { CardType, useGetCardsQuery, useGetDeckQuery } from "@/services/decks";
import { useAppDispatch, useAppSelector } from "@/services/store.ts";

const paginationSize = [
  { title: "10", value: "10" },
  { title: "20", value: "20" },
  { title: "50", value: "50" },
];

export const Deck = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(currentPageCardsSelector);
  const itemsPerPage = useAppSelector(itemsPerPageCardsSelector);
  const question = useAppSelector(searchNameQuestionCard);

  const { setCurrentPage, setItemPerPage } = cardActions;

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState<ShowModalType>("");
  const [pack, setPack] = useState<CardType>();

  const { data } = useGetDeckQuery({ id });
  const { data: auth } = useAuthMeQuery();
  const { data: cards, isLoading } = useGetCardsQuery({
    id,
    question,
    currentPage,
    itemsPerPage,
  });

  useEffect(() => {
    dispatch(setItemPerPage({ itemsPerPage: 5 }));
  }, []);

  const isOwn = data?.userId === auth?.id;
  const addNewCardHandler = () => {
    setShowModal("Add New Card");
    setOpen(true);
  };

  const handleOpenModal = (modalType: ShowModalType, isModalOpen: boolean) => {
    setShowModal(modalType);
    setOpen(isModalOpen);
  };

  const onChangePerPageHandler = (pageSize: number) => {
    dispatch(setItemPerPage({ itemsPerPage: pageSize }));
  };
  const onChangePagePaginationHandler = (value: number) => {
    dispatch(setCurrentPage({ currentPage: value }));
  };

  if (isLoading) return <Loader />;

  return (
    <Page className={s.deck}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BackToPage className={s.backToDecks} />
          <HeaderDeck
            open={open}
            setOpen={setOpen}
            showModal={showModal}
            auth={auth}
            setShowModal={setShowModal}
            deck={data}
            cards={cards}
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
          />{" "}
          {data?.cardsCount !== 0 ? (
            <Pagination
              pageSizeValue={paginationSize}
              totalPages={cards?.pagination.totalPages}
              itemsPerPage={itemsPerPage}
              className={s.pagination}
              currentPage={currentPage}
              onChangePerPage={onChangePerPageHandler}
              onClick={onChangePagePaginationHandler}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </Page>
  );
};
