import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeAnyRole } from "../middleware/rbac.js";

export const adminRoutes = Router();

adminRoutes.get(
  "/announcements",
  authenticate,
  authorizeAnyRole("LOCATION_ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (_req, res) => {
    const announcements = await prisma.announcement.findMany({
      select: {
        id: true,
        title: true,
        message: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json({ announcements });
  })
);

adminRoutes.post(
  "/announcements",
  authenticate,
  authorizeAnyRole("LOCATION_ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (req, res) => {
    const { title, message } = req.body as { title?: string; message?: string };

    if (!title || !message) {
      return res.status(400).json({ message: "title and message are required" });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        message
      }
    });

    res.status(201).json({ announcement });
  })
);

adminRoutes.get(
  "/members",
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

adminRoutes.get(
  "/reports/admin-stats",
  authenticate,
  authorizeAnyRole("LOCATION_ADMIN", "SUPER_ADMIN"),
  asyncHandler(async (_req, res) => {
    const activeMembers = await prisma.user.count({ where: { isActive: true } });
    const since = new Date();
    since.setDate(since.getDate() - 7);

    const weeklyCheckIns = await prisma.checkIn.count({ where: { timestamp: { gte: since } } });
    const classes = await prisma.class.findMany({
      where: { startTime: { gte: since } },
      select: { id: true, capacity: true }
    });
    const classIds = classes.map((item) => item.id);
    const bookingsCount = await prisma.classBooking.count({ where: { classId: { in: classIds } } });
    const capacitySum = classes.reduce((sum, item) => sum + item.capacity, 0);
    const classOccupancy = capacitySum ? Math.round((bookingsCount / capacitySum) * 100) : 0;

    const trainerRole = await prisma.role.findUnique({ where: { name: "TRAINER" } });
    const trainerCount = trainerRole
      ? await prisma.userRole.count({ where: { roleId: trainerRole.id } })
      : 0;
    const trainerSessions = await prisma.trainerSession.count({ where: { startTime: { gte: since } } });
    const trainerUtilization = trainerCount
      ? Math.min(100, Math.round((trainerSessions / (trainerCount * 5)) * 100))
      : 0;

    res.status(200).json({
      stats: {
        activeMembers,
        weeklyCheckIns,
        classOccupancy,
        trainerUtilization
      }
    });
  })
);
