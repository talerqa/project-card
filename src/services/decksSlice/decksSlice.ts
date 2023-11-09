import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialStateDecksType = {
  searchName: string;
  authorId: string;
  currentPage: number;
  itemsPerPage: number;
  minCard?: null | number;
  maxCard?: null | number;
};

const initialState: InitialStateDecksType = {
  searchName: "",
  authorId: "",
  currentPage: 1,
  itemsPerPage: 10,
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
    setItemPerPage: (
      state,
      action: PayloadAction<{
        itemsPerPage: number;
      }>,
    ) => {
      state.itemsPerPage = action.payload.itemsPerPage;
    },
    setMinCard: (state, action: PayloadAction<{ minCard?: number }>) => {
      state.minCard = action.payload.minCard;
    },
    setMaxCard: (state, action: PayloadAction<{ maxCard?: number }>) => {
      state.maxCard = action.payload.maxCard;
    },
    setClearFilter: (
      _,
      action: PayloadAction<{
        min: number;
        max: number;
      }>,
    ) => {
      return {
        ...initialState,
        minCard: action.payload.min,
        maxCard: action.payload.max,
      };
    },
  },
});

export const decksActions = slice.actions;
export const decksReducer = slice.reducer;
