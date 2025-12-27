import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message = err.message || "Unexpected error";
  return res.status(500).json({ message });
};
