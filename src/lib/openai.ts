import OpenAI from "openai";

export const OPENAI_ENABLED = !!process.env.OPENAI_API_KEY;

export const openai = OPENAI_ENABLED
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : (null as unknown as OpenAI);

export const SCRIPT_TYPES = [
  "YouTube Video Script",
  "TikTok/Reels Hook Script",
  "Facebook/Instagram Ad Script",
  "Sales Page Script (VSL)",
  "Cold Email Outreach Script",
  "Podcast Intro Script",
  "Product Demo Script",
  "Webinar Opening Script",
] as const;

export type ScriptType = (typeof SCRIPT_TYPES)[number];

export const TONES = ["Professional", "Casual", "Funny", "Urgent"] as const;
export type Tone = (typeof TONES)[number];

export const DURATIONS = ["30s", "60s", "3min", "5min", "10min"] as const;
export type Duration = (typeof DURATIONS)[number];

export const LANGUAGES = ["English", "Spanish", "Korean", "Japanese", "French"] as const;
export type Language = (typeof LANGUAGES)[number];

const DURATION_WORD_COUNTS: Record<string, string> = {
  "30s": "75-100 words (spoken at normal pace ~150wpm)",
  "60s": "150-200 words",
  "3min": "450-500 words",
  "5min": "750-800 words",
  "10min": "1500-1600 words",
};

const SCRIPT_INSTRUCTIONS: Record<string, string> = {
  "YouTube Video Script":
    "Include: Hook (first 15s attention grabber), intro, 3-5 main content sections with transitions, call to action (like/subscribe/comment), outro.",
  "TikTok/Reels Hook Script":
    "Start with a POWERFUL hook in the first 3 seconds that stops the scroll. Use pattern interrupt, bold claim, or relatable pain point. Keep it punchy and visual.",
  "Facebook/Instagram Ad Script":
    "Structure: Hook -> Problem agitation -> Solution intro -> Social proof mention -> CTA. Write for cold audiences.",
  "Sales Page Script (VSL)":
    "Structure: Attention headline -> Pain identification -> Agitate -> Solution reveal -> Benefits stack -> Social proof -> Offer -> Urgency -> CTA.",
  "Cold Email Outreach Script":
    "Subject line + email body. Keep under 150 words. Personalization placeholder, one clear CTA, no attachments mentioned.",
  "Podcast Intro Script":
    "Welcome, host intro, episode title/number, guest intro (if applicable), topic teaser, sponsor spot placeholder, episode preview.",
  "Product Demo Script":
    "Problem setup -> product reveal -> feature walkthrough (3 key features) -> live demo narration -> pricing intro -> CTA.",
  "Webinar Opening Script":
    "Welcome + housekeeping -> credibility intro -> big promise for this webinar -> agenda preview -> engagement hook -> transition to content.",
};

export function buildScriptPrompt(
  scriptType: string,
  topic: string,
  tone: string,
  duration: string,
  language: string,
  brandVoice?: string | null
): string {
  const wordCount = DURATION_WORD_COUNTS[duration] || "200-300 words";
  const instructions = SCRIPT_INSTRUCTIONS[scriptType] || "";
  const brandVoiceSection = brandVoice
    ? `\nBRAND VOICE: ${brandVoice}`
    : "";

  return `You are an expert scriptwriter and conversion copywriter. Write a ${scriptType} with the following specs:

TOPIC/PRODUCT/GOAL: ${topic}
TONE: ${tone}
TARGET LENGTH: ${wordCount}
OUTPUT LANGUAGE: ${language}
SCRIPT STRUCTURE: ${instructions}${brandVoiceSection}

TONE GUIDANCE:
- Professional: Clear, authoritative, trust-building. No slang.
- Casual: Conversational, friendly, like talking to a friend.
- Funny: Use humor, wit, relatable scenarios. Entertaining first.
- Urgent: Scarcity, FOMO, time-sensitive language. Drive action now.

OUTPUT FORMAT:
- Label each section clearly (e.g., [HOOK], [INTRO], [MAIN POINT 1], [CTA])
- Write exactly as it would be spoken — no meta-commentary
- Include stage directions in [brackets] only where essential (e.g., [pause], [show product])
- Do NOT include a title or "Script:" header — start directly with the first section

Write the complete script now:`;
}
