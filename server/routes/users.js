import express from "express";

import {
  signin,
  signup,
  getToken,
  refreshToken,
} from "../controllers/users.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/auth/google", getToken);
router.post("/auth/google/refresh-token", refreshToken);

export default router;
