import { RootState } from "@/services/store.ts";

export const searchNameQuestionCard = (state: RootState) =>
  state.cardReducer.searchNameQuestion;

export const currentPageCardsSelector = (state: RootState) =>
  state.cardReducer.currentPage;

export const itemsPerPageCardsSelector = (state: RootState) =>
  state.cardReducer.itemsPerPage;
