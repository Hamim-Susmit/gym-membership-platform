import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const classRoutes = Router();

classRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const { locationId, date } = req.query;
    const where: Record<string, unknown> = {};

    if (locationId && typeof locationId === "string") {
      where.locationId = locationId;
    }

    if (date && typeof date === "string") {
      const start = new Date(`${date}T00:00:00`);
      const end = new Date(`${date}T23:59:59`);
      where.startTime = { gte: start, lte: end };
    }

    const classes = await prisma.class.findMany({
      where,
      select: {
        id: true,
        name: true,
        startTime: true,
        endTime: true,
        trainerId: true,
        room: true
      },
      orderBy: { startTime: "asc" }
    });

    res.status(200).json({ classes });
  })
);
