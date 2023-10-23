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
  id: string
  name: string
}

export type DeckType = {
  author: GetDecksDataItemsAuthor
  id: string;
  userId: string;
  name: string;
  isPrivate?: boolean;
  shots: number;
  cover?: string | null;
  rating: number;
  created: string;
  updated: string;
  cardsCount: number;
};

export type CreateDeckArgsType = Pick<DeckType, "cover" | "name" | "isPrivate">;

export type CreateDeck = Pick<DeckType, 'name' | 'isPrivate' | 'cover'>

export type Direction = 'asc' | 'desc'

export type Field = 'name' | 'updated' | 'cardsCount' | 'created'

export type GetDecks = {
  name?: string
  currentPage?: number
  itemsPerPage?: number
  authorId?: string
  orderBy: `${Field}-${Direction}` | null
}