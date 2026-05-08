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

