import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateCardsType = {
  searchNameQuestion: string;
  currentPage: number;
  itemsPerPage: number;
};

const initialState: InitialStateCardsType = {
  searchNameQuestion: "",
  currentPage: 1,
  itemsPerPage: 5,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchQuestionName: (state, action: PayloadAction<{ name: string }>) => {
      state.searchNameQuestion = action.payload.name;
    },

    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage;
    },
    setItemPerPage: (
      state,
      action: PayloadAction<{
        itemsPerPage: number;
      }>,
    ) => {
      state.itemsPerPage = action.payload.itemsPerPage;
    },
  },
});

export const cardActions = slice.actions;
export const cardReducer = slice.reducer;
