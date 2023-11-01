import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./decks/base-query-with-reauth";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://api.flashcards.andrii.es",
//   credentials: "include",
//   prepareHeaders: (headers) => {
//     headers.append("x-auth-skip", "true");
//   },
// });

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Decks", "Auth", 'Card'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
