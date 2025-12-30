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
        phone: true,
        isActive: true,
        roles: {
          select: {
            locationId: true,
            role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const roles = user.roles.map((userRole: { role: { name: string }; locationId: string | null }) => ({
      name: userRole.role.name,
      locationId: userRole.locationId
    }));

    return res.status(200).json({
      user: {
        ...user,
        roles
      }
    });
  })
);
