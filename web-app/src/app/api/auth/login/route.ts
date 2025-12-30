import { NextResponse } from "next/server";

// reuse the in-memory store used by /register by importing it would be ideal,
// but since these route modules are separate we replicate a tiny in-memory map
// for simple local dev flows. In practice this is just for local testing.

import { users } from "../_store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as any;

  if (!email || !password) {
    return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
  }

  const user = users.get(email);
  // If the user wasn't registered via the local /register route, return a generic invalid message.
  if (!user || user.password !== password) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const accessToken = `dev-access-${user.id}`;
  const refreshToken = `dev-refresh-${user.id}`;

  return NextResponse.json(
    {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, roles: [{ name: "MEMBER" }] }
    },
    { status: 200 }
  );
}
