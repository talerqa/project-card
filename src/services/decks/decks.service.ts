import {baseApi} from "../base-api";
import {
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
      getDeck: builder.query<DeckType, { id: string }  >({
        query: ({id}) => ({
          url: `v1/decks/${id}`,
          method: "GET",
          id: id ?? {},
        }),
        providesTags: ["Decks"],
      }),
      deleteDeck: builder.mutation<DeckType, { id?: string }>({
        query: ({id}) => ({
          url: `v1/decks/${id}`,
          method: "DELETE",
          id: id ?? {},
        }),
        invalidatesTags: ["Decks"],
      }),
    };
  },
});

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useGetDeckQuery,
  useDeleteDeckMutation,
} = DeckService;