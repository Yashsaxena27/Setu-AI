import { Router } from "express";
import {
getReminders,
createReminder
}
from "../controllers/reminderController";

const router = Router();

router.get("/", getReminders);

router.post("/", createReminder);

export default router;