import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import matchRoutes from "./routes/match";
import schemeRoutes from "./routes/schemes";
import healthRoutes from "./routes/health";
import draftRoutes from "./routes/draft";
import reminderRoutes from "./routes/reminders";
import helmet from "helmet";
import morgan from "morgan";
import vectorRoutes from "./routes/vectorRoutes";
import explainRoutes from "./routes/explain";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/schemes", schemeRoutes);
app.use(express.json());
app.use("/reminders", reminderRoutes);
app.use("/profile", profileRoutes);
app.use("/draft", draftRoutes);
app.use("/match", matchRoutes);
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use(helmet());
app.use("/vector-search", vectorRoutes);
app.use(morgan("dev"));
app.use("/explain", explainRoutes);

export default app;