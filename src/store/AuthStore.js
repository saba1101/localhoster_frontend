import { createSlice } from "@reduxjs/toolkit";

export const AuthStore = createSlice({
  name: "AuthStore",
  initialState: {
    isLoggedIn: false,
    userDetails: {},
  },

  reducers: {
    SetAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    SetUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { SetAuth, SetUserDetails } = AuthStore.actions;

export default AuthStore.reducer;
