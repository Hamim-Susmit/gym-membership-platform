import { NextResponse } from "next/server";

import { users } from "../_store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email, password, firstName, lastName } = body as any;

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  if (users.has(email)) {
    return NextResponse.json({ message: "Email already registered" }, { status: 409 });
  }

  const id = crypto.randomUUID();
  users.set(email, { id, email, firstName, lastName, password });

  // simple mock tokens
  const accessToken = `dev-access-${id}`;
  const refreshToken = `dev-refresh-${id}`;

  return NextResponse.json(
    {
      accessToken,
      refreshToken,
      user: { id, email, firstName, lastName, roles: [{ name: "MEMBER" }] }
    },
    { status: 201 }
  );
}
