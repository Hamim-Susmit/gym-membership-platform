import type { NextFunction, Request, Response } from "express";

const hasRole = (req: Request, roleNames: string[]) => {
  return req.user?.roles.some((role) => roleNames.includes(role.name)) ?? false;
};

export const authorizeAnyRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!hasRole(req, roles)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
};

export const authorizeLocationRole = (roles: string[], locationId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasScopedRole = req.user.roles.some(
      (role) => roles.includes(role.name) && role.locationId === locationId
    );

    if (!hasScopedRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
};
