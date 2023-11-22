import { baseApi } from "../base-api";

import { onQueryStartedErrorToast } from "@/services/errorHandler.ts";
export const CardsService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      deleteCard: builder.mutation<void, string>({
        query: (id) => ({
          url: `v1/cards/${id}`,
          method: "DELETE",
        }),
        onQueryStarted: onQueryStartedErrorToast,
        invalidatesTags: ["Card", "Decks"],
      }),
      updateCard: builder.mutation<void, { id?: string; body: FormData }>({
        query: ({ id, body }) => ({
          url: `v1/cards/${id}`,
          method: "PATCH",
          body,
        }),
        onQueryStarted: onQueryStartedErrorToast,
        invalidatesTags: ["Card", "Decks"],
      }),
    };
  },
});

export const { useDeleteCardMutation, useUpdateCardMutation } = CardsService;
