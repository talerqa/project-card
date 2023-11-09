import { RootState } from "@/services/store.ts";

export const searchNameSelector = (state: RootState) =>
  state.decksReducer.searchName;

export const authorIdSelector = (state: RootState) =>
  state.decksReducer.authorId;

export const currentPageSelector = (state: RootState) =>
  state.decksReducer.currentPage;
