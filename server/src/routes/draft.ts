import { Router } from "express";
import { generateDraft } from "../controllers/draftController";

const router = Router();

router.post("/", generateDraft);

export default router;