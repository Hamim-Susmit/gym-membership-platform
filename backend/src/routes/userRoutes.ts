import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import { prisma } from "../utils/prisma.js";

export const userRoutes = Router();

userRoutes.get(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phoneNumber: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  })
);
