import {baseApi} from "@/services/base-api.ts";
import {
  CreateDeck,
  DeckType,
  GetDecks,
  GetResponseType
} from "@/services/decks/decks.type.ts";

export const DeckServieces = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDecks: builder.query<GetResponseType, GetDecks | void>({
        query: params => ({
          url: `v1/decks`,
          method: "GET",
          params: params ?? {},
        }),
        providesTags: ['Decks']
      }),
      createDeck: builder.mutation<DeckType, CreateDeck>({
        query: body => ({
          url: `v1/decks`,
          method: 'POST',
          body
        }),
        invalidatesTags: ['Decks']
      }),
    };
  },
})
export const {useGetDecksQuery, useCreateDeckMutation} = DeckServieces;
