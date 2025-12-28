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
  roles: z
    .array(
      z.object({
        name: z.enum(["MEMBER", "TRAINER", "LOCATION_ADMIN", "SUPER_ADMIN"]),
        locationId: z.string().uuid().optional()
      })
    )
    .optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1)
});

const createAccessToken = (userId: string, roles: { name: string; locationId?: string | null }[]) => {
  return jwt.sign({ userId, roles }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

const createRefreshToken = (userId: string, roles: { name: string; locationId?: string | null }[]) => {
  return jwt.sign({ userId, roles }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN
  });
};

const ensureRole = async (roleName: string) => {
  return prisma.role.upsert({
    where: { name: roleName },
    update: {},
    create: { name: roleName }
  });
};

const mapRoles = (userRoles: { role: { name: string }; locationId: string | null }[]) => {
  return userRoles.map((userRole) => ({
    name: userRole.role.name,
    locationId: userRole.locationId
  }));
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
      lastName: data.lastName
    }
  });

  const rolesInput = data.roles?.length
    ? data.roles
    : [{ name: "MEMBER" as const }];

  const assignedRoles = [] as { role: { name: string }; locationId: string | null }[];

  for (const roleInput of rolesInput) {
    const role = await ensureRole(roleInput.name);
    const userRole = await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: role.id,
        locationId: roleInput.locationId ?? null
      },
      include: { role: true }
    });
    assignedRoles.push({ role: userRole.role, locationId: userRole.locationId });
  }

  await prisma.auditLog.create({
    data: {
      actorUserId: user.id,
      action: "USER_REGISTERED",
      targetType: "USER",
      targetId: user.id,
      metadata: {
        email: user.email
      }
    }
  });

  const roles = mapRoles(assignedRoles);
  const accessToken = createAccessToken(user.id, roles);
  const refreshToken = createRefreshToken(user.id, roles);
  return {
    status: 201,
    body: {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles
      }
    }
  };
};

export const login = async (payload: unknown) => {
  const data = loginSchema.parse(payload);
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: { roles: { include: { role: true } } }
  });
  if (!user) {
    return { status: 401, body: { message: "Invalid credentials" } };
  }

  if (!user.isActive) {
    return { status: 403, body: { message: "Account is inactive" } };
  }

  const isValid = await bcrypt.compare(data.password, user.passwordHash);
  if (!isValid) {
    return { status: 401, body: { message: "Invalid credentials" } };
  }

  const roles = mapRoles(
    user.roles.map((userRole) => ({ role: userRole.role, locationId: userRole.locationId }))
  );

  await prisma.auditLog.create({
    data: {
      actorUserId: user.id,
      action: "USER_LOGIN",
      targetType: "USER",
      targetId: user.id,
      metadata: {
        email: user.email
      }
    }
  });

  const accessToken = createAccessToken(user.id, roles);
  const refreshToken = createRefreshToken(user.id, roles);
  return {
    status: 200,
    body: {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles
      }
    }
  };
};

export const refresh = async (payload: unknown) => {
  const data = refreshSchema.parse(payload);

  try {
    const decoded = jwt.verify(data.refreshToken, env.JWT_REFRESH_SECRET) as {
      userId: string;
      roles: { name: string; locationId?: string | null }[];
    };

    const accessToken = createAccessToken(decoded.userId, decoded.roles);
    const refreshToken = createRefreshToken(decoded.userId, decoded.roles);
    return {
      status: 200,
      body: {
        accessToken,
        refreshToken
      }
    };
  } catch {
    return { status: 401, body: { message: "Invalid or expired refresh token" } };
  }
};

export const logout = async () => {
  return {
    status: 204,
    body: null
  };
};
