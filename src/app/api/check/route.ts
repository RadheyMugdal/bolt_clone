import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
let notificationSchema = z
  .array(
    z.object({
      sender: z.string(),
      message: z.string(),
      timestamp: z.string(),
    })
  )
  .max(4);

export async function POST(req: NextRequest) {
  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    (async () => {
      const { partialObjectStream } = streamObject({
        model: google("gemini-2.0-flash-001"),
        system: "generate sample ios messages for testing",
        prompt: "messages from a family group chat during diwali, max 4 ",
        schema: notificationSchema,
      });

      for await (const partialObject of partialObjectStream) {
        console.log(partialObject);
      }
    })();
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
