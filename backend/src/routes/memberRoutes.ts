import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeAnyRole } from "../middleware/rbac.js";

export const memberRoutes = Router();

memberRoutes.get(
  "/",
  authenticate,
  authorizeAnyRole("LOCATION_ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (_req, res) => {
    const members = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isActive: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json({ members });
  })
);
