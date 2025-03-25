import { auth } from "@/auth";
import db from "@/db";
import { messages, workspaces } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const { id } = await params;
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new Response("Invalid request", { status: 400 });
    }

    const workspaceData = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, id))
      .limit(1);
    const messageData = await db
      .select()
      .from(messages)
      .where(eq(messages.workspaceId, id));

    return NextResponse.json(
      {
        workspaceData: workspaceData[0],
        messages: messageData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
