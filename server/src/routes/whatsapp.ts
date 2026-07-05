import { Router } from "express";
import { receiveWhatsAppMessage } from "../controllers/whatsappController";

const router = Router();

router.post("/webhook", receiveWhatsAppMessage);

export default router;