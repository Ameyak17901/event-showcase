import { currentUser, clerkClient } from "@clerk/nextjs/server"
import { NextResponse, NextRequest } from "next/server"


export async function POST(req: NextRequest){
    const { userId, tier } = await req.json();

    if(!userId){
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
        publicMetadata: {
            tier
        }
    })    

    const user = await currentUser();

    return NextResponse.json({ user })
}