import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { openai, OPENAI_ENABLED } from "@/lib/openai";
import { supabaseAdmin } from "@/lib/supabase";
import { getOrCreateUser, checkAndIncrementUsage } from "@/lib/user";
import { getGuestUsage, incrementGuestUsage, GUEST_DAILY_LIMIT } from "@/lib/guest";
import type { PlanType } from "@/lib/stripe";

// Prevent Netlify 10s function timeout
export const maxDuration = 60;

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = supabaseAdmin as any;

// ─── Plan / Duration access control ────────────────────────────────────────
type Duration = "30s" | "60s" | "3min" | "5min" | "10min";

const ALLOWED_DURATIONS: Record<PlanType, Duration[]> = {
  starter: ["30s", "60s"],
  creator: ["30s", "60s", "3min", "5min"],
  agency:  ["30s", "60s", "3min", "5min", "10min"],
};

const PLAN_MODEL: Record<PlanType, string> = {
  starter: "gpt-4.1-mini",
  creator: "gpt-4.1",
  agency:  "o3",
};

// ─── Duration config ────────────────────────────────────────────────────────
interface DurationConfig {
  wordCount: string;
  style: string;
  sceneCount: number;
  maxTokens: number;
}

const DURATION_CONFIG: Record<Duration, DurationConfig> = {
  "30s": {
    wordCount: "60–90 words",
    style: "Short-form, high-energy, scroll-stopping hook in the first 3 seconds. One core idea, strong CTA at the end.",
    sceneCount: 3,
    maxTokens: 600,
  },
  "60s": {
    wordCount: "130–160 words",
    style: "Short-form with a punchy hook, 2–3 rapid-fire points, and a memorable CTA. Keep every sentence visual and energetic.",
    sceneCount: 4,
    maxTokens: 800,
  },
  "3min": {
    wordCount: "420–480 words",
    style: "Clear Intro → Main Points (3 sections) → Conclusion structure. Include scene transitions and B-roll suggestions. Conversational but authoritative tone.",
    sceneCount: 6,
    maxTokens: 1800,
  },
  "5min": {
    wordCount: "700–800 words",
    style: "Full narrative arc: Hook → Problem → Solution → Deep Dive (3 points) → CTA. Include scene labels, on-screen text suggestions, and smooth transitions.",
    sceneCount: 8,
    maxTokens: 2800,
  },
  "10min": {
    wordCount: "1500–1700 words",
    style: "In-depth analysis format: Strong Hook → Context → Section 1 → Re-hook (keep viewers watching) → Section 2 → Re-hook → Section 3 → Retention Loop → Conclusion + CTA. Include mid-video retention hooks every 2–3 minutes.",
    sceneCount: 12,
    maxTokens: 4000,
  },
};

// ─── Prompt builder ─────────────────────────────────────────────────────────
function buildPrompt(
  topic: string,
  scriptType: string,
  tone: string,
  language: string,
  duration: Duration,
  planType: PlanType,
  brandVoice?: string | null
): string {
  const config = DURATION_CONFIG[duration];
  const brandVoiceSection = brandVoice
    ? `\nBRAND VOICE: ${brandVoice}`
    : "";

  const agencyBoost =
    planType === "agency"
      ? "\nELITE QUALITY: Apply advanced retention psychology, pattern interrupts, and conversion-optimized copywriting techniques."
      : "";

  return `You are an elite YouTube scriptwriter and conversion copywriter specializing in viral, high-retention video scripts.

TOPIC: ${topic}
SCRIPT TYPE: ${scriptType}
TONE: ${tone}
OUTPUT LANGUAGE: ${language}
VIDEO LENGTH: ${duration} (target ${config.wordCount})
STYLE GUIDE: ${config.style}${brandVoiceSection}${agencyBoost}

REQUIREMENTS:
- Write exactly ${config.sceneCount} scenes
- Each scene must have a label, narration, and visual direction
- Stay strictly within the word count: ${config.wordCount}
- Every sentence must earn its place — no filler words
- Open with a hook that stops the scroll in the first 3 seconds

OUTPUT FORMAT (strict JSON, no markdown, no code blocks):
{
  "title": "Compelling video title (under 60 characters)",
  "script": "Full narration text as a single continuous string",
  "scenes": [
    {
      "id": 1,
      "label": "Scene label (e.g. HOOK, INTRO, POINT 1, RE-HOOK, CTA)",
      "narration": "Exact spoken words for this scene",
      "visual": "Camera direction or B-roll description",
      "duration_hint": "Approximate seconds for this scene"
    }
  ]
}

Write the complete script now:`;
}

// ─── IP extraction helper ───────────────────────────────────────────────────
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── Route handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!OPENAI_ENABLED) {
    return NextResponse.json(
      { error: "OpenAI is not configured. Set OPENAI_API_KEY to enable script generation." },
      { status: 503 }
    );
  }

  // Check auth — fall back to guest if not logged in
  const { userId } = await auth();
  const isGuest = !userId;

  // ── Guest / user usage check ───────────────────────────────────────────
  let planType: PlanType = "starter";
  let usage: Awaited<ReturnType<typeof checkAndIncrementUsage>> | null = null;
  let guestUsed = 0;
  let dbUserId: string | null = null;

  if (isGuest) {
    const ip = getClientIp(req);
    guestUsed = await getGuestUsage(ip);
    if (guestUsed >= GUEST_DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: `You've used all ${GUEST_DAILY_LIMIT} free trials today. Sign up for free to get more scripts.`,
          code: "GUEST_LIMIT_REACHED",
          guestUsed,
          limit: GUEST_DAILY_LIMIT,
        },
        { status: 429 }
      );
    }
  } else {
    // Logged-in user: get/create DB record and check usage
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
    const dbUser = await getOrCreateUser(userId!, email);
    dbUserId = dbUser?.id ?? null;

    usage = await checkAndIncrementUsage(userId!);
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
    planType = usage.planType;
  }

  const body = await req.json();
  const { scriptType, topic, tone, duration, language } = body as {
    scriptType: string;
    topic: string;
    tone: string;
    duration: Duration;
    language: string;
  };

  if (!scriptType || !topic || !tone || !duration || !language) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (topic.trim().length < 5) {
    return NextResponse.json({ error: "Topic must be at least 5 characters" }, { status: 400 });
  }

  // Guests: 30s/60s only, English only
  if (isGuest) {
    if (!["30s", "60s"].includes(duration)) {
      return NextResponse.json(
        { error: "Guests can only try 30s and 60s scripts. Sign up to unlock longer formats.", code: "UPGRADE_REQUIRED" },
        { status: 403 }
      );
    }
    if (language !== "English") {
      return NextResponse.json(
        { error: "Guests can only generate English scripts. Sign up to unlock all languages.", code: "UPGRADE_REQUIRED" },
        { status: 403 }
      );
    }
  }

  // Duration access control (logged-in users)
  if (!isGuest && !ALLOWED_DURATIONS[planType].includes(duration)) {
    return NextResponse.json(
      {
        error: `The ${duration} duration requires a higher plan. Please upgrade to access this feature.`,
        code: "UPGRADE_REQUIRED",
        planType,
        requiredPlan: duration === "10min" ? "agency" : "creator",
      },
      { status: 403 }
    );
  }

  const model = isGuest ? "gpt-4.1-mini" : PLAN_MODEL[planType];
  const config = DURATION_CONFIG[duration];
  const isReasoningModel = model === "o3" || model.startsWith("o1");

  const prompt = buildPrompt(
    topic,
    scriptType,
    tone,
    language,
    duration,
    planType,
    isGuest ? null : usage?.brandVoice
  );

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      ...(isReasoningModel
        ? { max_completion_tokens: config.maxTokens + 1000 }
        : { temperature: 0.75, max_tokens: config.maxTokens }
      ),
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty response from OpenAI");

    const tokensUsed = completion.usage?.total_tokens ?? 0;

    // Parse JSON response
    let parsed: { title: string; script: string; scenes: any[] };
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {
        title: topic.slice(0, 60),
        script: raw,
        scenes: [],
      };
    }

    if (isGuest) {
      // Guest: count usage only, no DB save
      const ip = getClientIp(req);
      const newCount = await incrementGuestUsage(ip);
      return NextResponse.json({
        title: parsed.title,
        script: parsed.script,
        scenes: parsed.scenes ?? [],
        output: parsed.script,
        isGuest: true,
        guestUsed: newCount,
        guestLimit: GUEST_DAILY_LIMIT,
        tokensUsed,
      });
    }

    // Logged-in user: save to Supabase scripts table
    const { error: saveError } = await db.from("scripts").insert({
      user_id: dbUserId,
      title: parsed.title ?? topic,
      script_type: scriptType,
      content: parsed.script ?? raw,
      tone,
      language,
      tokens_used: tokensUsed,
    });

    if (saveError) {
      console.error("[generate] Supabase save error:", saveError.message, saveError.code);
    }

    return NextResponse.json({
      title: parsed.title,
      script: parsed.script,
      scenes: parsed.scenes ?? [],
      output: parsed.script,
      scriptsUsed: usage!.scriptsUsed,
      limit: usage!.limit,
      planType,
      tokensUsed,
    });
  } catch (err: any) {
    console.error("[generate] OpenAI error:", err);

    if (err?.status === 401 || err?.code === "invalid_api_key") {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Check your OPENAI_API_KEY in environment variables." },
        { status: 502 }
      );
    }

    if (err?.status === 429) {
      return NextResponse.json(
        { error: "OpenAI rate limit exceeded. Please try again in a few seconds." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Script generation failed. Please try again." },
      { status: 500 }
    );
  }
}
