import { Router } from "express";
import { matchSchemes } from "../controllers/matchController";

const router = Router();

router.post("/", matchSchemes);

export default router;