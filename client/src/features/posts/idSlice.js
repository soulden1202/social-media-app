import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentID: null,
};

export const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setpostID: (state, action) => {
      state.currentID = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const { setpostID, setTask } = idSlice.actions;

export default idSlice.reducer;
