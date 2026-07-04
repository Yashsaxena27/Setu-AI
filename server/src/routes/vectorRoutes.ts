import { Router } from "express";
import { vectorSearch } from "../controllers/vectorController";

const router = Router();

router.post("/", vectorSearch);

export default router;