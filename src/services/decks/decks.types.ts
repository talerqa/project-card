export type getResponseType = {
  items: DeckType[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
  };
  maxCardsCount: number;
};

export type DeckType = {
  author: {
    id: string;
    name: string;
  };
  id: string;
  userId: string;
  name: string;
  isPrivate: boolean;
  shots: number;
  cover?: string | null;
  rating: number;
  created: string;
  updated: string;
  cardsCount: number;
};

export type CreateDeckArgsType = Pick<DeckType, "cover" | "name" | "isPrivate">;

export type SortingDirection = "asc" | "desc";

export type SortingField = "name" | "updated";

export type GetDecksParams = {
  name?: string;
  authorId?: string;
  orderBy?: `${SortingField}-${SortingDirection}`;
};
