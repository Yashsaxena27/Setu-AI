import { Router } from "express";
import { createDraft } from "../controllers/draftController";

const router = Router();

router.post("/", createDraft);

export default router;