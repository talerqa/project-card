import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Sort } from "@/components";

export type InitialStateDecksType = {
  searchName: string;
  authorId: string;
  currentPage: number;
  itemsPerPage: number;
  orderBy?: Sort | null;
  minCard: number;
  maxCard: null | number;
};

const initialState: InitialStateDecksType = {
  searchName: "",
  authorId: "",
  currentPage: 1,
  itemsPerPage: 10,
  orderBy: null,
  minCard: 0,
  maxCard: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchName: (state, action: PayloadAction<{ name: string }>) => {
      state.searchName = action.payload.name;
    },
    setAuthorId: (state, action: PayloadAction<{ authorId: string }>) => {
      state.authorId = action.payload.authorId;
    },
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const decksActions = slice.actions;
export const decksReducer = slice.reducer;
