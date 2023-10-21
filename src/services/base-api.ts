import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Decks"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.flashcards.andrii.es",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.append("x-auth-skip", "true");
    },
  }),
  endpoints: (builder) => {
    return {
      getDecks: builder.query<getResponseType, void>({
        query: () => "v1/decks",
        providesTags: ["Decks"],
      }),
      createDeck: builder.mutation<DeckType, CreateDeckArgsType>({
        query: (body) => ({
          url: "v1/decks",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Decks"],
      }),
    };
  },
});

export const { useGetDecksQuery, useCreateDeckMutation } = baseApi;

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
