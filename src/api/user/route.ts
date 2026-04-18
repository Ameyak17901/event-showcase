import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  // Use `auth()` to access the user's session claims
  const { isAuthenticated, sessionClaims } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = sessionClaims.userId;

  return NextResponse.json({ userId });
}
