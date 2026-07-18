import { Router } from "express";
import { simulateEligibility } from "../controllers/simulatorController";

const router = Router();

router.post("/", simulateEligibility);

export default router;