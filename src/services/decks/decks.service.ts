import {baseApi} from "../base-api";
import {
  CardType,
  DeckType,
  GetCardType,
  GetDecks,
  GetResponseType,
  GetResponseTypeCard,
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
      createDeck: builder.mutation<DeckType, FormData>({
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
      getCards: builder.query<GetResponseTypeCard, GetCardType>({
        query: ({
                  id,
                  answer,
                  question,
                  currentPage,
                  itemsPerPage,
                  orderBy
                }) => ({
          url: `v1/decks/${id}/cards`,
          method: "GET",
          params: {answer, question, currentPage, itemsPerPage, orderBy}
        }),
        providesTags: ["Card", 'Decks'],
      }),
      createCard: builder.mutation<CardType, { id?: string, body: FormData }>({
        query: ({id, body}) => ({
          url: `v1/decks/${id}/cards`,
          method: "POST",
          body,
        }),
        invalidatesTags: ["Card", 'Decks'],
      }),
      learnCard: builder.query<CardType, {
        id?: string,
        previousCardId?: string
      }>({
        query: ({id}) => ({
          url: `v1/decks/${id}/learn`,
          method: "GET",
          id,
        }),
        providesTags: ["Card", 'Decks'],
      }),
      saveGradeCard: builder.mutation<CardType, { id?: string, body: any }>({
        query: ({id, body}) => ({
          url: `v1/decks/${id}/learn`,
          method: "POST",
          body,
        }),
        invalidatesTags: ["Card", 'Decks'],
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
  useLearnCardQuery,
  useSaveGradeCardMutation,
} = DeckService;
