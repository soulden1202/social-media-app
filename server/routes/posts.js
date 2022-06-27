import express from "express";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostbySearch,
  getPostById,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPost);
router.get("/search", getPostbySearch);
router.get("/:id", getPostById);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); //for updating
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
