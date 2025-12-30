import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { login, logout, refresh, register } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { prisma } from "../utils/prisma.js";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  asyncHandler(async (req, res) => {
    const result = await register(req.body);
    res.status(result.status).json(result.body);
  })
);

authRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await login(req.body);
    res.status(result.status).json(result.body);
  })
);

authRoutes.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const result = await refresh(req.body);
    res.status(result.status).json(result.body);
  })
);

authRoutes.get(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } }
    });
    if (!user) return res.status(404).json({ message: "Not found" });
    const roles = user.roles.map((ur: any) => ({ name: ur.role.name, locationId: ur.locationId }));
    res.status(200).json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, roles } });
  })
);

authRoutes.post(
  "/logout",
  asyncHandler(async (_req, res) => {
    const result = await logout();
    if (result.body) {
      return res.status(result.status).json(result.body);
    }
    return res.sendStatus(result.status);
  })
);
