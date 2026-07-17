import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../controllers/reminderController";

const router = Router();

router.use(authMiddleware);

router.get("/", getReminders);

router.post("/", createReminder);

router.patch("/:id", updateReminder);

router.delete("/:id", deleteReminder);

export default router;