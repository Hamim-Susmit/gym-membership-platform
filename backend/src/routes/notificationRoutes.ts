import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";

export const notificationRoutes = Router();

notificationRoutes.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        body: true,
        readAt: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json({ notifications });
  })
);

notificationRoutes.patch(
  "/:notificationId",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const { notificationId } = req.params;
    const { readAt } = req.body as { readAt?: string };

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
    if (!notification || notification.userId !== userId) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: readAt ? new Date(readAt) : new Date() }
    });

    res.status(200).json({ notification: updated });
  })
);
