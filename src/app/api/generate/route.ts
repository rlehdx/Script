import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { openai, OPENAI_ENABLED, buildScriptPrompt } from "@/lib/openai";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateUser, checkAndIncrementUsage } from "@/lib/user";

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

export async function POST(req: NextRequest) {
  if (!OPENAI_ENABLED) {
    return NextResponse.json(
      { error: "OpenAI is not configured. Set OPENAI_API_KEY to enable script generation." },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const email = user.emailAddresses[0]?.emailAddress ?? "";
  await getOrCreateUser(userId, email);

  const usage = await checkAndIncrementUsage(userId);
  if (!usage.allowed) {
    return NextResponse.json(
      {
        error: usage.reason,
        code: "LIMIT_REACHED",
        scriptsUsed: usage.scriptsUsed,
        limit: usage.limit,
        planType: usage.planType,
      },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { scriptType, topic, tone, duration, language } = body;

  if (!scriptType || !topic || !tone || !duration || !language) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (topic.trim().length < 5) {
    return NextResponse.json({ error: "Topic must be at least 5 characters" }, { status: 400 });
  }

  const prompt = buildScriptPrompt(
    scriptType,
    topic,
    tone,
    duration,
    language,
    usage.brandVoice
  );

  try {
    const completion = await openai.chat.completions.create({
      model: usage.model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
      max_tokens: 3000,
    });

    const output = completion.choices[0]?.message?.content;
    if (!output) throw new Error("Empty response from OpenAI");

    const tokensUsed = completion.usage?.total_tokens ?? 0;

    // Save to history with new schema columns
    await db.from("scripts").insert({
      user_id: userId,
      title: topic,
      script_type: scriptType,
      content: output,
      tone,
      language,
      tokens_used: tokensUsed,
    });

    return NextResponse.json({
      output,
      scriptsUsed: usage.scriptsUsed,
      limit: usage.limit,
      planType: usage.planType,
      tokensUsed,
    });
  } catch (err: any) {
    console.error("OpenAI error:", err);

    if (err?.status === 401 || err?.code === "invalid_api_key") {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Check your OPENAI_API_KEY in .env.local." },
        { status: 502 }
      );
    }

    if (err?.status === 429) {
      return NextResponse.json(
        { error: "OpenAI quota exceeded. Check your billing at platform.openai.com." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Script generation failed. Please try again." },
      { status: 500 }
    );
  }
}
