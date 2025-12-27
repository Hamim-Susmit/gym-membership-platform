import { Router } from "express";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const locationRoutes = Router();

locationRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    const locations = await prisma.gymLocation.findMany({
      select: {
        id: true,
        name: true,
        addressLine: true,
        city: true,
        state: true,
        postalCode: true,
        country: true,
        timezone: true,
        amenities: true
      }
    });
    res.status(200).json({ locations });
  })
);
