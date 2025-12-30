import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeAnyRole } from "../middleware/rbac.js";

export const trainerRoutes = Router();

trainerRoutes.get(
  "/clients",
  authenticate,
  authorizeAnyRole("TRAINER"),
  asyncHandler(async (req, res) => {
    const trainerId = req.user?.userId;
    if (!trainerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const sessions = await prisma.trainerSession.findMany({
      where: { trainerId },
      select: { clientId: true }
    });

    const clientIds = Array.from(new Set(sessions.map((session: { clientId: string }) => session.clientId)));

    const clients = await prisma.user.findMany({
      where: { id: { in: clientIds } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isActive: true
      }
    });

    res.status(200).json({ clients });
  })
);

trainerRoutes.get(
  "/sessions",
  authenticate,
  authorizeAnyRole("TRAINER"),
  asyncHandler(async (req, res) => {
    const trainerId = req.user?.userId;
    if (!trainerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const sessions = await prisma.trainerSession.findMany({
      where: { trainerId },
      select: {
        id: true,
        clientId: true,
        startTime: true,
        endTime: true,
        status: true,
        notes: true
      },
      orderBy: { startTime: "asc" }
    });

    res.status(200).json({ sessions });
  })
);
