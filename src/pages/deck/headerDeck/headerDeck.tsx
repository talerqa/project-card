import s from "./headerDeck.module.scss";

import { Input } from "@/components/ui/inputs";
import { HeaderFriendDeck } from "@/pages/deck/headerDeck/headerFriendDeck";
import { HeaderOwnDeck } from "@/pages/deck/headerDeck/headerOwnDeck";
import { DeckModal } from "@/pages/deckModal";
import { ShowModalType } from "@/pages/decks";
import { CardType, DeckType, GetResponseTypeCard } from "@/services";
import { AuthMeResponseType } from "@/services/auth";
import { cardActions } from "@/services/cards";
import { useAppDispatch } from "@/services/store.ts";

export type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  showModal: ShowModalType;
  setShowModal: (value: ShowModalType) => void;
  deck?: DeckType;
  auth?: AuthMeResponseType;
  cards?: GetResponseTypeCard;
  question: string;
  pack: CardType;
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
    pack,
  } = props;

  const { setSearchQuestionName } = cardActions;
  const dispatch = useAppDispatch();

  return (
    <div className={s.blockHeaderDeck}>
      <DeckModal
        activeMenu={open}
        setActiveMenu={setOpen}
        item={deck as DeckType}
        setShowModal={setShowModal}
        showModal={showModal}
        pack={pack}
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
            dispatch(setSearchQuestionName({ name: event.target.value }));
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
