import { getSystemPrompt, SYSTEM_PROMPT } from "@/lib/prompts";
import { VITE_REACT_TS_TEMPLATE } from "@/lib/react-ts-template";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const model = google("gemini-2.0-flash-001");

    const { messages } = await req.json();

    const { text } = await generateText({
      messages,
      maxTokens: 6000,
      model,
      system: SYSTEM_PROMPT,
    });
    const ans = text.replace(/^```json\n/, "").replace(/\n```$/, "");

    return NextResponse.json({ response: JSON.parse(ans) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
