import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./decks/base-query-with-reauth";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Decks", "Auth", "Card"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
