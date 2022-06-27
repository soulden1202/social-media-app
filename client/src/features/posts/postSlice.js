import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as useApi from "../../api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await useApi.getPost();
  return response.data;
});

export const creatingPost = createAsyncThunk(
  "posts/creatingPost",
  async (data) => {
    const response = await useApi.createPost(data);
    return response.data;
  }
);

export const fetchPostsbySearch = createAsyncThunk(
  "posts/searchPosts",
  async (searchQuery) => {
    console.log(searchQuery);
    const response = await useApi.fetchPostsbySearch(searchQuery);
    return response.data;
  }
);

export const updatingPost = createAsyncThunk(
  "posts/updatingPost",
  async (newData) => {
    const response = await useApi.updatePost(newData.id, newData.data);
    return response.data;
  }
);

export const deletingPost = createAsyncThunk(
  "posts/deletingPost",
  async (id) => {
    await useApi.deletePost(id);
    return id;
  }
);

export const likingPost = createAsyncThunk("posts/likingPost", async (id) => {
  const response = await useApi.likePost(id);
  return response.data;
});

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [];
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(creatingPost.fulfilled, (state, action) => {
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(updatingPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(deletingPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(likingPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(fetchPostsbySearch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPostsbySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostsbySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.length === 0) {
          state.posts = [];
        } else {
          state.posts = state.posts.filter(
            (post) => post._id === action.payload[0]._id
          );
        }
      });
  },
});

export default postSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
