import s from "./headerDeck.module.scss";

import { Input } from "@/components/ui/inputs";
import { HeaderFriendDeck } from "@/pages/deck/headerDeck/headerFriendDeck";
import { HeaderOwnDeck } from "@/pages/deck/headerDeck/headerOwnDeck";
import { DeckModal, ShowModalType } from "@/pages/decks";
import { DeckType, GetResponseTypeCard } from "@/services";
import { AuthMeResponseType } from "@/services/auth";

export type ModalType =
  | ""
  | "Delete Card"
  | "Edit Card"
  | "Learn"
  | "Add New Card";

export type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  showModal: ModalType | ShowModalType;
  setShowModal: (value: ModalType | ShowModalType) => void;
  deck?: DeckType;
  auth?: AuthMeResponseType;
  cards?: GetResponseTypeCard;
  question: string;
  setQuestion: (value: string) => void;
};

export const HeaderDeck = (props: Props) => {
  const {
    open,
    setOpen,
    showModal,
    setShowModal,
    deck,
    auth,
    cards,
    question,
    setQuestion,
  } = props;

  console.log();

  return (
    <div className={s.blockHeaderDeck}>
      <DeckModal
        activeMenu={open}
        setActiveMenu={setOpen}
        item={deck}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      {deck?.userId === auth?.id ? (
        <HeaderOwnDeck
          deck={deck}
          setOpen={setOpen}
          setShowModal={setShowModal}
          cards={cards}
        />
      ) : (
        <HeaderFriendDeck
          deck={deck}
          cards={cards}
          setOpen={setOpen}
          setShowModal={setShowModal}
        />
      )}
      {deck?.cardsCount !== 0 ? (
        <Input
          type="search"
          placeholder="Input search question"
          className={s.searchInput}
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
