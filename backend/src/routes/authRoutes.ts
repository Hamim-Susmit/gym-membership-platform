import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { login, register } from "../controllers/authController.js";

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
