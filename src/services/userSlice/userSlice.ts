import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthService, EditProfileArgsType } from "../auth";

type InitialStateType = Partial<EditProfileArgsType>;

const initialState: InitialStateType = {
  avatar: "",
  name: "",
  email: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(_, action: PayloadAction<InitialStateType>) {
      return {
        name: action.payload.name,
        avatar: action.payload.avatar,
        email: action.payload.email,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthService.endpoints.authMe.matchFulfilled,
      (state, action) => {
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.email = action.payload.email;
      },
    ),
      builder.addMatcher(
        AuthService.endpoints.logout.matchFulfilled,
        (state, _) => {
          state.name = "";
          state.avatar = "";
          state.email = "";
        },
      );
  },
});

export const { setUserData } = slice.actions;
export const userReducer = slice.reducer;
