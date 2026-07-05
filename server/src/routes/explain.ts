import { Router } from "express";
import { explainScheme } from "../controllers/explainController";

const router = Router();

router.post("/:schemeId", explainScheme);

export default router;