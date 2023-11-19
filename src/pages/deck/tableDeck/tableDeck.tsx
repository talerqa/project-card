import { useNavigate } from "react-router-dom";

import s from "./tableDeck.module.scss";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { TableFriendDeck } from "@/pages/deck/tableDeck/tableFriendDeck";
import { TableOwnDeck } from "@/pages/deck/tableDeck/tableOwnDeck";

export const TableDeck = ({
  isOwn,
  setPack,
  deck,
  cards,
  addNewCardHandler,
  handleOpenModal,
  setSort,
  orderBy,
}: any) => {
  const navigate = useNavigate();

  return (
    <div className={s.mainBlock}>
      {isOwn ? (
        <>
          {deck?.cardsCount === 0 ? (
            <>
              <Typography variant={"body1"} as={"span"} className={s.emptyDeck}>
                This pack is empty. Click add new learnCard to fill this pack
              </Typography>
              <Button
                type={"button"}
                variant={"primary"}
                onClick={addNewCardHandler}
              >
                Add New Card
              </Button>
            </>
          ) : (
            <TableOwnDeck
              deckData={deck}
              cards={cards}
              handleOpenModal={handleOpenModal}
              isOwn={isOwn}
              setPack={setPack}
              setSort={setSort}
              orderBy={orderBy}
            />
          )}
        </>
      ) : (
        <>
          {deck?.cardsCount === 0 ? (
            <>
              <Typography variant={"body1"} as={"span"} className={s.emptyDeck}>
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
            <TableFriendDeck
              cards={cards}
              isOwn={isOwn}
              setPack={setPack}
              handleOpenModal={handleOpenModal}
              setSort={setSort}
              orderBy={orderBy}
            />
          )}
        </>
      )}
    </div>
  );
};
