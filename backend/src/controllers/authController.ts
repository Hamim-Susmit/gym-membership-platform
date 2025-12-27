import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { prisma } from "../utils/prisma.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(["MEMBER", "TRAINER", "LOCATION_ADMIN", "SUPER_ADMIN"]).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const createToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const register = async (payload: unknown) => {
  const data = registerSchema.parse(payload);
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    return { status: 409, body: { message: "Email already registered" } };
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role ?? "MEMBER"
    }
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "USER_REGISTERED",
      details: `User ${user.email} registered`
    }
  });

  const token = createToken(user.id, user.role);
  return {
    status: 201,
    body: {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }
  };
};

export const login = async (payload: unknown) => {
  const data = loginSchema.parse(payload);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    return { status: 401, body: { message: "Invalid credentials" } };
  }

  const isValid = await bcrypt.compare(data.password, user.passwordHash);
  if (!isValid) {
    return { status: 401, body: { message: "Invalid credentials" } };
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "USER_LOGIN",
      details: `User ${user.email} logged in`
    }
  });

  const token = createToken(user.id, user.role);
  return {
    status: 200,
    body: {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    }
  };
};
