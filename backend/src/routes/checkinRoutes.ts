import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";

export const checkinRoutes = Router();

checkinRoutes.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isAdmin = req.user?.roles.some((role) =>
      ["LOCATION_ADMIN", "SUPER_ADMIN"].includes(role.name)
    );

    const checkIns = await prisma.checkIn.findMany({
      where: isAdmin ? undefined : { userId },
      select: {
        id: true,
        locationId: true,
        timestamp: true
      },
      orderBy: { timestamp: "desc" }
    });

    res.status(200).json({ checkIns });
  })
);
