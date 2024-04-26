import { createSlice } from "@reduxjs/toolkit";

export const AuthStore = createSlice({
  name: "AuthStore",
  initialState: {
    isLoggedIn: false,
  },

  reducers: {
    SetAuth: (state, action) => {
      state.initialState = action.payload;
    },
  },
});

export const { SetAuth } = AuthStore.actions;

export default AuthStore.reducer;
