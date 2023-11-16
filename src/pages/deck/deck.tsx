import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import s from "./deck.module.scss";

import { Loader } from "@/assets/components/loader";
import { BackToPage } from "@/components/common/backToPage";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/ui/page";
import { Typography } from "@/components/ui/typography";
import { HeaderDeck } from "@/pages";
import { TableFriendDeck } from "@/pages/deck/tableDeck/tableFriendDeck";
import { TableOwnDeck } from "@/pages/deck/tableDeck/tableOwnDeck";
import { ShowModalType } from "@/pages/decks";
import { useAuthMeQuery } from "@/services/auth";
import { useGetCardsQuery, useGetDeckQuery } from "@/services/decks";

export const Deck = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState<ShowModalType>("");
  const [cardToDeleteID, setCardToDeleteID] = useState("");

  const { data } = useGetDeckQuery({ id });
  const { data: auth } = useAuthMeQuery();
  const { data: cards, isLoading } = useGetCardsQuery({ id, question });

  // const [pack, setPack] = useState()

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
        cardToDeleteID={cardToDeleteID}
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
                  onClick={addNewCardHandler}
                >
                  Add New Card
                </Button>
              </>
            ) : (
              <TableOwnDeck
                deckData={data}
                cards={cards}
                handleOpenModal={handleOpenModal}
                isOwn={isOwn}
                setCardToDeleteID={setCardToDeleteID}
              />
            )}
          </>
        ) : (
          <>
            {data?.cardsCount === 0 ? (
              <>
                <Typography
                  variant={"body1"}
                  as={"span"}
                  className={s.emptyDeck}
                >
                  This pack is empty. Back to Pack list and choose another Pack
                </Typography>
                <Button
                  type={"button"}
                  variant={"primary"}
                  onClick={() => {
                    navigate("/decks");
                  }}
                >
                  Back to Pack List
                </Button>
              </>
            ) : (
              <TableFriendDeck cards={cards} setOpen={setOpen} isOwn={isOwn} />
            )}
          </>
        )}
      </div>
    </Page>
  );
};
