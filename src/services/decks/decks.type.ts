export type GetResponseType = {
  items: DeckType[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
  };
  maxCardsCount: number;
};

export type GetDecksDataItemsAuthor = {
  id: string;
  name: string;
};

export type DeckType = {
  author: GetDecksDataItemsAuthor;
  id: string;
  userId: string;
  name: string;
  isPrivate?: boolean;
  shots: number;
  cover?: string | null | File | HTMLInputElement;
  rating: number;
  created: string;
  updated: string;
  cardsCount: number;
};

export type CreateDeck = Pick<DeckType, "name" | "isPrivate" | "cover">;

export type Direction = "asc" | "desc";

export type Field = "name" | "updated" | "cardsCount" | "created";

export type GetDecks = {
  name?: string;
  currentPage?: number;
  itemsPerPage?: number;
  authorId?: string;
  orderBy: `${Field}-${Direction}` | null;
  minCardsCount?: string;
  maxCardsCount?: string;
};

export type CardType = {
  id: string;
  deckId: string;
  userId: string;
  question: string;
  answer: string;
  shots: number;
  answerImg: string;
  questionImg: string;
  questionVideo: string;
  answerVideo: string;
  rating: number;
  grade: number;
  created: string;
  updated: string;
};

export type DirectionCard = "asc" | "desc";

export type FieldCard = "question" | "answer";

export type GetCardType = {
  id?: string;
  question?: string;
  answer?: string;
  orderBy?: `${FieldCard}-${DirectionCard}` | null;
  currentPage?: number;
  itemsPerPage?: number;
};

export type GetResponseTypeCard = {
  items: CardType[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
  };
};
