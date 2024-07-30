import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("admin-auth-token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("admin-auth-token", action.payload);
      state.token = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("admin-auth-token");
      state.token = null;
    },
  },
});

export const { loginUser, logOut } = authSlice.actions;
export const { reducer } = authSlice;
