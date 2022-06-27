import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import idReducer from "../features/posts/idSlice";
import authGoogleReducer from "../features/user/authGoogleSlice";
import authReducer from "../features/user/authSlice";
import userReducer from "../features/user/userSlice";
import modalReducer from "../features/posts/modalSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
    id: idReducer,
    authGG: authGoogleReducer,
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
  },
});
