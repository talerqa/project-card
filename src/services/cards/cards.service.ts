import { baseApi } from "../base-api";

export const CardsService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      deleteCard: builder.mutation<void, string>({
        query: (id) => ({
          url: `v1/cards/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Card", "Decks"],
      }),
    };
  },
});

export const { useDeleteCardMutation } = CardsService;
