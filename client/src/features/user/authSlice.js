import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as useApi from "../../api";

export const signIn = createAsyncThunk(
  "users/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await useApi.signIn(data.formData);
      const history = data.history;
      history.push("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "users/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await useApi.signUp(data.formData);
      const history = data.history;
      history.push("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: [],
  acction: "",
  status: "idle",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetErrorState: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = "loading";
        state.acction = "signin";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.result;
        localStorage.setItem("profile", JSON.stringify(action.payload));
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(signUp.pending, (state, action) => {
        state.status = "loading";
        state.acction = "signup";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.result;
        localStorage.setItem("profile", JSON.stringify(action.payload));
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { resetErrorState } = authSlice.actions;
export default authSlice.reducer;
