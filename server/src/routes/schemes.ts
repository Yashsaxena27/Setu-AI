import { Router } from "express";
import {
  getAllSchemes,
  getSchemeById,
} from "../controllers/schemeController";

const router = Router();

router.get("/", getAllSchemes);

router.get("/:id", getSchemeById);

export default router;