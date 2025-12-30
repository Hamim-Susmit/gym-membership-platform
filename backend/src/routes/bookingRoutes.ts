import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/auth.js";

export const bookingRoutes = Router();

bookingRoutes.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await prisma.classBooking.findMany({
      where: { userId },
      select: {
        id: true,
        classId: true,
        status: true,
        class: {
          select: {
            id: true,
            name: true,
            startTime: true,
            endTime: true,
            trainerId: true,
            room: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json({ bookings });
  })
);

bookingRoutes.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const { classId } = req.body as { classId?: string };

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
    }

    const existing = await prisma.classBooking.findUnique({
      where: {
        classId_userId: {
          classId,
          userId
        }
      }
    });

    if (existing) {
      return res.status(409).json({ message: "Booking already exists" });
    }

    const booking = await prisma.classBooking.create({
      data: {
        classId,
        userId,
        status: "BOOKED"
      }
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: userId,
        action: "BOOKING_CREATED",
        targetType: "BOOKING",
        targetId: booking.id,
        metadata: { classId }
      }
    });

    res.status(201).json({ booking });
  })
);

bookingRoutes.patch(
  "/:bookingId",
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    const { bookingId } = req.params;
    const { status } = req.body as { status?: string };

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const booking = await prisma.classBooking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.userId !== userId) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const updated = await prisma.classBooking.update({
      where: { id: bookingId },
      data: { status }
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: userId,
        action: "BOOKING_UPDATED",
        targetType: "BOOKING",
        targetId: bookingId,
        metadata: { status }
      }
    });

    res.status(200).json({ booking: updated });
  })
);
