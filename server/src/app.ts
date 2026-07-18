import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import matchRoutes from "./routes/match";
import schemeRoutes from "./routes/schemes";
import healthRoutes from "./routes/health";
import draftRoutes from "./routes/draft";
import reminderRoutes from "./routes/reminders";
import vectorRoutes from "./routes/vectorRoutes";
import explainRoutes from "./routes/explain";
import whatsappRoutes from "./routes/whatsapp";
import simulatorRoutes from "./routes/simulator";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));

// Parse JSON requests
app.use(express.json());

// Parse Twilio webhook form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/match", matchRoutes);
app.use("/schemes", schemeRoutes);
app.use("/draft", draftRoutes);
app.use("/reminders", reminderRoutes);
app.use("/health", healthRoutes);
app.use("/vector-search", vectorRoutes);
app.use("/explain", explainRoutes);
app.use("/whatsapp", whatsappRoutes);
app.use("/api/simulator", simulatorRoutes);
export default app;