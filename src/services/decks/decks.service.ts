import {baseApi} from "../base-api";
import {
  CardType,
  CreateDeck,
  DeckType,
  GetDecks,
  GetResponseType,
} from "@/services/decks/decks.type.ts";

export const DeckService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDecks: builder.query<GetResponseType, GetDecks | void>({
        query: (params) => ({
          url: `v1/decks`,
          method: "GET",
          params: params ?? {},
        }),
        providesTags: ["Decks"],
      }),
      createDeck: builder.mutation<DeckType, CreateDeck>({
        query: (body) => ({
          url: "v1/decks",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Decks"],
      }),
      getDeck: builder.query<DeckType, { id?: string }>({
        query: ({id}) => ({
          url: `v1/decks/${id}`,
          method: "GET",
          id,
        }),
        providesTags: ["Decks"],
      }),
      updateDeck: builder.mutation<DeckType, { id?: string, body: FormData }>({
        query: ({id, body}) => ({
          url: `v1/decks/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Decks"],
      }),
      deleteDeck: builder.mutation<DeckType, { id?: string }>({
        query: ({id}) => ({
          url: `v1/decks/${id}`,
          method: "DELETE",
          id: id ?? {},
        }),
        invalidatesTags: ["Decks"],
      }),
      getCards: builder.query<GetResponseType, { id?: string }>({
        query: ({id}) => ({
          url: `v1/decks/${id}/cards`,
          method: "GET",
          id: id ?? {},
        }),
        providesTags: ["Card"],
      }),
      createCard: builder.mutation<CardType, {  id?: string, body: FormData  }>({
        query: ({id}) => ({
          url: `v1/decks/${id}/cards`,
          method: "POST",
          id: id ?? {},
        }),
        invalidatesTags: ["Card"],
      }),
    };
  },
});

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useGetDeckQuery,
  useUpdateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useCreateCardMutation,
} = DeckService;
