import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { login, logout, refresh, register } from "../controllers/authController.js";

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
