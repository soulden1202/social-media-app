import axios from "axios";

const API = axios.create({ baseURL: "https://memorieshdn.herokuapp.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  } else if (localStorage.getItem("profileGoogle")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profileGoogle")
    )}`;
  }
  return req;
});

export const getPost = () => API.get("/posts");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const fetchPostsbySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const getToken = (accessCode) =>
  API.post(`/users/auth/google`, accessCode);
export const refreshToken = (refreshToken) =>
  API.post(`/users/auth/google/refresh-token`, refreshToken);
