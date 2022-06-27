import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as useApi from "../../api";

const initialState = {
  posts: {},
  status: "idle",
  commentStatus: "idle",
  error: null,
};

export const getPostById = createAsyncThunk("modal/getPostById", async (id) => {
  const response = await useApi.getPostById(id);
  return response.data;
});

export const likingPostModal = createAsyncThunk(
  "modal/likingPostModal",
  async (id) => {
    const response = await useApi.likePost(id);
    return response.data;
  }
);

export const commentPost = createAsyncThunk(
  "modal/commentPost",
  async (data) => {
    const response = await useApi.commentPost(data.value, data.id);
    return response.data;
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.posts.likes.push(action.payload);
    },
    removeLike: (state, action) => {
      state.posts.likes.filter((like) => like === action.payload);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getPostById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likingPostModal.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(commentPost.pending, (state, action) => {
        state.commentStatus = "loading";
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.commentStatus = "succeeded";
        state.posts = action.payload;
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.commentStatus = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function

export const { addLike, removeLike } = modalSlice.actions;

export default modalSlice.reducer;

export const getCurrentPost = (state) => state.modal.posts;
