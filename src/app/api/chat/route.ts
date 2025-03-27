import db from "@/db";
import { messages, workspaces } from "@/db/schema";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const model = google("gemini-2.0-flash-001");

    const { messages: userMessages, workspaceId } = await req.json();
    const { text } = await generateText({
      messages: userMessages,
      maxTokens: 6000,
      model,
      system: SYSTEM_PROMPT,
    });
    const ans = JSON.parse(
      text.replace(/^```json\n/, "").replace(/\n```$/, "")
    );
    const init = Boolean(req.nextUrl.searchParams.get("init"));
    if (!init) {
      await db.insert(messages).values({
        workspaceId,
        message: userMessages[0].content,
        role: "user",
      });
    }
    await db
      .update(workspaces)
      .set({
        projectFiles: ans.files,
        title: ans.title,
      })
      .where(eq(workspaces.id, workspaceId))
      .returning();

    const messagesData = await db
      .insert(messages)
      .values({
        workspaceId: workspaceId,
        message: ans.description,
        role: "assistant",
      })
      .returning({
        role: messages.role,
        message: messages.message,
      });

    return NextResponse.json({
      files: ans.files,
      messagesData: messagesData[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
