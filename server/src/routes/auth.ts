import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

import {
  register,
  login,
  deleteAccount,
} from "../controllers/authController";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.delete(
  "/delete",
  authMiddleware,
  deleteAccount
);

export default router;