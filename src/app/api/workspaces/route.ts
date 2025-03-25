import { auth } from "@/auth";
import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { messages, workspaces } from "./../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return new Response("No message provided", { status: 400 });
    }
    const session = await auth();
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const workspaceData = await db
      .insert(workspaces)
      .values({
        userId: session.user.id as string,
      })
      .returning({ id: workspaces.id });
    const messageData = await db.insert(messages).values({
      workspaceId: workspaceData[0].id,
      message: message,
      role: "user",
    });

    return NextResponse.json({ id: workspaceData[0].id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
