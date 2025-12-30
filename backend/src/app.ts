import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { locationRoutes } from "./routes/locationRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authenticate } from "./middleware/auth.js";
import { prisma } from "./utils/prisma.js";

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
app.get(
  "/me",
  authenticate,
  async (_req, res) => {
    const userId = (_req as any).user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } }
    });
    if (!user) return res.status(404).json({ message: "Not found" });
    const roles = user.roles.map((ur: any) => ({ name: ur.role.name, locationId: ur.locationId }));
    res.status(200).json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, roles } });
  }
);
app.use("/users", userRoutes);
app.use("/locations", locationRoutes);

app.use(errorHandler);
