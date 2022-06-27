import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as useApi from "../../api";
import jwt_decode from "jwt-decode";

export const getTokenGoogle = createAsyncThunk(
  "posts/getTokenGoogle",
  async (accessCode) => {
    const response = await useApi.getToken(accessCode);
    return response.data;
  }
);

const initialState = {
  res: [],
  user: [],
  status: "idle",
};

export const authGoogleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.clear();
      state.res = [];
      state.user = [];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getTokenGoogle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTokenGoogle.fulfilled, (state, action) => {
        state.res = action.payload;
        const decoded = jwt_decode(action.payload.id_token);
        state.user.push(decoded);
        localStorage.setItem(
          "profileGoogle",
          JSON.stringify(action.payload.id_token)
        );
        state.status = "succeeded";
      });
  },
});

export const { logOut } = authGoogleSlice.actions;

export default authGoogleSlice.reducer;
