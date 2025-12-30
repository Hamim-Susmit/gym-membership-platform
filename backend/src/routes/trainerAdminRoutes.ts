import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeAnyRole } from "../middleware/rbac.js";

export const trainerAdminRoutes = Router();

trainerAdminRoutes.get(
  "/",
  authenticate,
  authorizeAnyRole("LOCATION_ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (_req, res) => {
    const trainerRole = await prisma.role.findUnique({ where: { name: "TRAINER" } });

    if (!trainerRole) {
      return res.status(200).json({ trainers: [] });
    }

    const trainerUsers = await prisma.userRole.findMany({
      where: { roleId: trainerRole.id },
      select: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            isActive: true
          }
        }
      }
    });

    const trainers = trainerUsers.map((item: { user: unknown }) => item.user);

    res.status(200).json({ trainers });
  })
);
