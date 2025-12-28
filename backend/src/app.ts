import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { locationRoutes } from "./routes/locationRoutes.js";
import { classRoutes } from "./routes/classRoutes.js";
import { bookingRoutes } from "./routes/bookingRoutes.js";
import { checkinRoutes } from "./routes/checkinRoutes.js";
import { trainerRoutes } from "./routes/trainerRoutes.js";
import { notificationRoutes } from "./routes/notificationRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { memberRoutes } from "./routes/memberRoutes.js";
import { trainerAdminRoutes } from "./routes/trainerAdminRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/health/ready", (_req, res) => {
  res.status(200).json({ status: "ready" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/locations", locationRoutes);
app.use("/classes", classRoutes);
app.use("/bookings", bookingRoutes);
app.use("/checkins", checkinRoutes);
app.use("/trainer", trainerRoutes);
app.use("/notifications", notificationRoutes);
app.use("/admin", adminRoutes);
app.use("/members", memberRoutes);
app.use("/trainers", trainerAdminRoutes);

app.use(errorHandler);
