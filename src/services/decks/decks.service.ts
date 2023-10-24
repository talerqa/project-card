import { baseApi } from "../base-api";

import {
  CreateDeckArgsType,
  DeckType,
  GetDecksParams,
  getResponseType,
} from "./decks.types";

export const DeckService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDecks: builder.query<getResponseType, GetDecksParams | void>({
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

export const { useGetDecksQuery, useCreateDeckMutation } = DeckService;
