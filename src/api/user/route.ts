import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { tier } = await req.json();
  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clerkClient();
  const updatedUser = await client.users.updateUserMetadata(user.id, {
    publicMetadata: {
      tier,
    },
  });

  return NextResponse.json({ user: updatedUser }, { status: 200 });
}
