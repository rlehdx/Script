import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

const POSTS: Record<string, {
  title: string;
  desc: string;
  tag: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "youtube-script-template": {
    title: "The Ultimate YouTube Script Template (That Actually Gets Views)",
    desc: "A battle-tested 7-part framework used by 100k+ creators to hook viewers in 3 seconds and keep them watching.",
    tag: "YouTube",
    date: "Apr 2, 2025",
    readTime: "6 min read",
    content: `
## Why Most YouTube Scripts Fail

Most creators either wing it (rambling, low retention) or over-script it (sounds robotic, kills watch time). The sweet spot is a **structured but conversational** script.

Here's the 7-part framework top creators use:

---

## The 7-Part YouTube Script Framework

### 1. The Hook (0–3 seconds)
Your first line determines if anyone watches. Lead with the **result, the conflict, or the curiosity gap**.

> "You've been losing subscribers — and you don't even know why."

### 2. The Pattern Interrupt (3–8 seconds)
Break the scroll habit. Ask a bold question or make a surprising claim.

> "What if I told you the #1 YouTube growth mistake has nothing to do with thumbnails?"

### 3. The Intro (8–30 seconds)
Briefly introduce yourself and the promise of the video. Keep it tight.

> "Hey, I'm [Name]. In this video, I'll show you the exact 3-step framework I used to grow from 0 to 50k subscribers in 6 months."

### 4. The Re-Hook (30s mark)
Remind them WHY they should stay. Tease the payoff.

> "Stick around because at the 4-minute mark I'll reveal the counter-intuitive trick that 2x'd my CTR overnight."

### 5. The Body (Main Content)
Deliver your value in 3–5 clear points. Use transitions like:
- "Here's what most people miss..."
- "This is where it gets interesting..."
- "The mistake I made — and how you can avoid it..."

### 6. The Engagement Prompt
Ask a question mid-video to boost comments (which signals the algorithm).

> "Drop a comment below — what's your biggest struggle with YouTube growth right now?"

### 7. The CTA (End Screen)
Tell them exactly what to do next. One action only.

> "If this helped, subscribe and hit the bell — I post every Tuesday with frameworks like this."

---

## Tools to Use With This Template

Once your script is written, use these tools to maximize results:

- **[TubeBuddy](https://www.tubebuddy.com/pricing?a=scriva)** — Find the best tags and optimize your title for search
- **[VidIQ](https://vidiq.com/?ref=scriva)** — Analyze competitors and discover trending topics
- **[Descript](https://www.descript.com/?lmref=scriva)** — Edit your video by editing the transcript (huge time saver)
- **[Epidemic Sound](https://www.epidemicsound.com/referral/scriva/)** — Royalty-free background music

---

## Skip the Manual Work

Writing a full script with this framework takes 30–60 minutes. Scriva AI does it in 10 seconds — with all 7 parts, proper pacing, and your tone built in.
    `,
  },
  "tiktok-hook-examples": {
    title: "50 TikTok Hook Examples That Stop the Scroll",
    desc: "Swipe-worthy opening lines across every niche — from finance to fitness. Copy, adapt, and go viral.",
    tag: "TikTok",
    date: "Mar 28, 2025",
    readTime: "8 min read",
    content: `
## Why the First 2 Seconds Are Everything

TikTok's algorithm decides within 2 seconds whether to push or bury your video. Your hook isn't just important — it's the *only* thing that matters at the start.

Here are 50 proven hooks, organized by type:

---

## Pattern 1: The Controversial Statement (10 hooks)

1. "Cardio is making you fat."
2. "The $10k course you bought is why you're broke."
3. "College is a scam — and the data proves it."
4. "Saving money is the worst financial advice."
5. "Most 'healthy' foods are slowly killing you."
6. "Your morning routine is the reason you're not successful."
7. "The influencers telling you to invest are why you're losing."
8. "Hustle culture destroyed my health — here's what I do now."
9. "Therapy taught me the opposite of what I expected."
10. "The best diet is the one you've been told to avoid."

---

## Pattern 2: The POV Format (10 hooks)

11. "POV: You finally stop procrastinating at 2am."
12. "POV: You're 30 and realize your 20s were wasted."
13. "POV: You discover the one habit that changed everything."
14. "POV: Your boss finds your side hustle makes more than your salary."
15. "POV: You said yes to the uncomfortable opportunity."
16. "POV: You stop caring what people think — and everything changes."
17. "POV: You read one book and it rewires your brain."
18. "POV: You quit social media for 30 days."
19. "POV: You start waking up at 5am — for real this time."
20. "POV: The investment you ignored 2 years ago just 10x'd."

---

## Pattern 3: The Question Hook (10 hooks)

21. "What would you do with an extra $3,000/month?"
22. "Why are the most successful people also the most alone?"
23. "Did you know your phone is stealing 3 hours from you daily?"
24. "What if everything you know about fat loss is wrong?"
25. "Are you actually lazy — or just depleted?"
26. "What happens to your body if you stop eating sugar for 30 days?"
27. "Why do rich people wake up at 4am?"
28. "Would you rather be respected or liked?"
29. "What's the real reason you keep quitting?"
30. "Is your relationship making you less ambitious?"

---

## Pattern 4: The Number Hook (10 hooks)

31. "3 things I wish I knew at 22."
32. "The 1 habit that changed my income in 90 days."
33. "5 signs you're smarter than you think."
34. "I lost 20 lbs doing only 2 things."
35. "7 red flags you're in a dead-end job."
36. "4 minutes a day — the only workout you actually need."
37. "I made $0 to $10k in 6 months — here's the breakdown."
38. "3 books that made me more money than my degree."
39. "10 things I stopped doing to get my life together."
40. "The 2-minute rule that ended my procrastination."

---

## Pattern 5: The Story Hook (10 hooks)

41. "I got fired at 27. Best thing that ever happened to me."
42. "I said yes to the thing that terrified me — here's what happened."
43. "I tried waking up at 4am for 30 days. This is what changed."
44. "I went from $40k debt to debt-free in 18 months. Here's how."
45. "I quit social media in 2023. I haven't gone back. Here's why."
46. "I turned down a $200k job. My parents thought I was crazy."
47. "I built a business while working full-time. The real story."
48. "I sent 200 cold emails. 3 became clients. Here's what worked."
49. "I failed 4 times before this worked. The lesson nobody talks about."
50. "I was the least talented person in the room — until I did this."

---

## Tools to Create Better TikToks

- **[Descript](https://www.descript.com/?lmref=scriva)** — Auto-captions + video editing by text
- **[Epidemic Sound](https://www.epidemicsound.com/referral/scriva/)** — Trending sounds that don't get you muted

---

## Generate Your Own Hooks in 10 Seconds

Use Scriva to generate full TikTok/Reels scripts — including a custom hook tailored to your niche and audience.
    `,
  },
  "how-to-write-vsl-script": {
    title: "How to Write a VSL Script That Converts (Step-by-Step)",
    desc: "The exact structure behind VSLs that convert at 3–8%. Includes a fill-in-the-blank template you can use today.",
    tag: "VSL",
    date: "Mar 20, 2025",
    readTime: "10 min read",
    content: `
## What Makes a VSL Convert

A Video Sales Letter (VSL) is the highest-converting format in digital marketing — when done right. The difference between a 0.5% and a 5% conversion rate comes down to structure, not production value.

Here's the proven 9-part VSL structure:

---

## The 9-Part VSL Framework

### 1. The Attention Grabber
Start with the most disruptive, emotionally charged statement you can make.

> "If you've been trying to [solve problem] for months without results, this is the most important video you'll watch this year."

### 2. The Big Promise
State the transformation clearly and specifically.

> "In the next 7 minutes, I'm going to show you how to [outcome] — even if [common objection]."

### 3. The Problem Agitation
Describe their pain in detail. Make them feel understood.

> "You've tried [solution 1], [solution 2], and even [solution 3]. But nothing sticks because nobody told you the real reason why..."

### 4. The Root Cause Reveal
Explain WHY their previous attempts failed. This positions your solution as the missing piece.

> "The problem isn't your effort. It's that you've been solving the wrong problem entirely."

### 5. The Solution Introduction
Introduce your product/service as the logical conclusion to everything you've set up.

> "That's why I created [Product Name] — a [simple description] that [core benefit]."

### 6. The Proof Stack
Layer 3 types of proof: testimonials, case studies, and data.

> "Over 1,200 customers have used this to [result]. Here's what [Name] said after just 30 days..."

### 7. The Value Stack
List everything included and anchor each item to a dollar value.

> "You get [Feature 1] (value: $X), [Feature 2] (value: $X), and [Bonus] (value: $X)..."

### 8. The Price Reveal + Guarantee
Reveal the price after the value is established. Offer a risk reversal.

> "Instead of the $[high price] it's worth, you get everything for just $[actual price]. And if you don't [result] in [timeframe], I'll refund every penny."

### 9. The CTA (Close)
Give one clear action. Create urgency.

> "Click the button below right now. This offer expires at midnight."

---

## Tools for VSL Production

- **[Descript](https://www.descript.com/?lmref=scriva)** — Record, edit, and add captions to your VSL without a video editor
- **[Epidemic Sound](https://www.epidemicsound.com/referral/scriva/)** — Background music that builds emotion without distraction

---

## Write Your VSL Script in 10 Seconds

Scriva generates full VSL scripts with all 9 sections — tailored to your product, audience, and tone.
    `,
  },
  "ai-script-generator-guide": {
    title: "How to Use AI to Write Scripts 10x Faster (Without Sounding Robotic)",
    desc: "The prompting strategies that separate generic AI output from scripts that actually convert.",
    tag: "AI Tools",
    date: "Mar 14, 2025",
    readTime: "7 min read",
    content: `
## The Problem With Generic AI Scripts

Most people type "write me a YouTube script about productivity" and get... generic garbage. The AI doesn't know your audience, your tone, your offer, or your brand.

Here's how to fix that.

---

## The 5-Variable Prompt Framework

Every great AI script prompt needs these 5 inputs:

### 1. Audience Specificity
Don't say "entrepreneurs." Say "burned-out freelancers in their 30s who have $5k/month income but zero free time."

### 2. Desired Outcome
What action should the viewer take after watching? Subscribe? Buy? Share? Be explicit.

### 3. Emotional Angle
What emotion drives the content? Fear of missing out? Desire for status? Relief from pain?

### 4. Proof Points
What specific data, stories, or credentials should be referenced?

### 5. Tone & Style
Casual and direct? Authority-driven? Story-led? Funny and irreverent?

---

## Before vs. After Prompting

**Bad prompt:**
> "Write a TikTok script about saving money."

**Good prompt:**
> "Write a TikTok hook script for 25–35 year olds who earn $60k/year but feel broke. Tone: blunt and relatable. Angle: the psychological reason they can't save. CTA: follow for more money psychology tips."

The difference in output quality is dramatic.

---

## When to Use AI vs. Write Manually

| Use AI | Write Manually |
|--------|----------------|
| First draft | Final personal story sections |
| Structure & flow | Specific brand voice nuances |
| Hook variations | Deeply emotional moments |
| High-volume content | One-off flagship pieces |

---

## The Best AI Script Tool

Scriva is purpose-built for script generation — not a general chatbot. It knows the formats (YouTube, TikTok, VSL, Podcast, Ads), applies proven structures automatically, and lets you set your brand voice once and apply it everywhere.
    `,
  },
  "podcast-script-outline": {
    title: "Podcast Script Outline: How to Sound Natural & Keep Listeners Hooked",
    desc: "Most podcasters wing it — here's how to script episodes that feel spontaneous but never boring.",
    tag: "Podcast",
    date: "Mar 7, 2025",
    readTime: "5 min read",
    content: `
## Scripted vs. Unscripted Podcasts

The best podcasters sound spontaneous — but they're not. They use **loose scripts**: enough structure to stay on track, enough freedom to sound human.

Here's the framework:

---

## The Podcast Episode Outline (5 Parts)

### 1. Cold Open (30 seconds)
Start in the middle of a story or insight. No intro music yet.

> "Last week, I almost quit this podcast. Here's what stopped me — and what it taught me about building an audience."

### 2. Welcome + Episode Promise (1 minute)
Brief intro, then immediately tell them what they'll get.

> "Welcome to [Show Name]. I'm [Host]. Today we're covering [topic] — specifically [specific angle] and [specific takeaway]."

### 3. Main Content (bulk of episode)
Use bullet-point notes, not word-for-word scripts. Structure in 3 acts:
- **Setup**: Context and background
- **Conflict**: The tension, problem, or question
- **Resolution**: The insight, framework, or answer

### 4. Guest/Story Sections
For interviews: 5–7 prepared questions. For solo: 2–3 personal stories mapped to key points.

### 5. Outro + CTA (1 minute)
Summarize in one sentence, then one clear ask.

> "If this episode was useful, share it with one person who needs to hear it. Next week we're covering [tease]. See you then."

---

## Tools for Podcasters

- **[Riverside.fm](https://riverside.fm/?via=scriva)** — Record studio-quality audio remotely
- **[Descript](https://www.descript.com/?lmref=scriva)** — Edit your podcast by editing the transcript
- **[Epidemic Sound](https://www.epidemicsound.com/referral/scriva/)** — Royalty-free intro/outro music

---

## Generate Your Podcast Script

Scriva generates full podcast episode scripts — including cold open, main points, and outro — in under 10 seconds.
    `,
  },
  "facebook-ad-script": {
    title: "Facebook & Instagram Ad Scripts: The 3-Part Formula That Sells",
    desc: "Hook → Problem → Solution. Why this works for cold traffic and how to write it in under 10 minutes.",
    tag: "Paid Ads",
    date: "Feb 28, 2025",
    readTime: "6 min read",
    content: `
## Why Most Ad Scripts Fail

Most ad scripts lead with the product. Cold audiences don't care about your product — they care about their problem. Lead with pain, not features.

---

## The 3-Part Ad Script Formula

### Part 1: The Hook (2–4 seconds)
Interrupt the scroll with something that feels personal.

> "If you're a [audience] who struggles with [specific pain point], watch this."

Or use a bold claim:
> "I doubled my sales without spending more on ads — here's the weird reason why."

### Part 2: The Problem (10–20 seconds)
Agitate the pain. Make them feel seen and understood.

> "Most [audience] are stuck because [root cause]. You're working harder than ever but [negative outcome]. The frustrating part? It's not your fault — it's the system you're using."

### Part 3: The Solution + CTA (10–20 seconds)
Introduce your product as the bridge. One clear CTA.

> "[Product] gives you [core benefit] without [main objection]. Click below to [specific action] — we'll show you exactly how it works."

---

## Advanced: The Story Ad Format

For higher-priced offers ($100+), use this extended format:

1. **Relatable character** (who they identify with)
2. **Struggle** (the exact pain point)
3. **Discovery** (the turning point)
4. **Transformation** (the result)
5. **Invitation** (CTA)

This format builds trust before asking for the click.

---

## Tools for Ad Creation

- **[Canva Pro](https://www.canva.com/affiliates/scriva)** — Create ad visuals fast
- **[Descript](https://www.descript.com/?lmref=scriva)** — Edit video ads by editing text

---

## Generate Ad Scripts in 10 Seconds

Scriva generates Facebook and Instagram ad scripts — including hook, problem, solution, and CTA — tailored to your product and audience.
    `,
  },

  "youtube-script-length": {
    title: "How Long Should a YouTube Script Be? (By Video Type)",
    desc: "The exact word counts and time targets for different YouTube formats — explainers, vlogs, tutorials, and shorts.",
    tag: "YouTube",
    date: "Apr 10, 2025",
    readTime: "5 min read",
    content: `
## Why Script Length Matters More Than Video Length

Most creators think in minutes. Think in words instead. A tight 1,200-word script delivers a better 8-minute video than a rambling 2,000-word one.

---

## Word Count by Video Type

### YouTube Shorts (Under 60 seconds)
- **Target:** 120–180 words
- **Structure:** Hook (10s) → Point (30s) → CTA (10s)
- Trim every word that doesn't earn its place

### Tutorial / How-To (8–12 minutes)
- **Target:** 1,200–1,800 words
- **Structure:** Hook → Problem → Steps (3–5) → Recap → CTA
- Use numbered transitions: "Step 1... Step 2..."

### Talking Head / Opinion (5–8 minutes)
- **Target:** 800–1,200 words
- **Structure:** Hook → Claim → Evidence (2–3 points) → Takeaway → CTA
- Conversational tone beats dense paragraphs

### Explainer / Educational (10–15 minutes)
- **Target:** 1,800–2,400 words
- **Structure:** Hook → Why it matters → Deep dive → Summary → CTA
- Use chapter markers in the script to match timestamps

### Vlog / Lifestyle (6–10 minutes)
- **Target:** 600–1,000 words (partial script)
- Use bullet-point outlines, not word-for-word scripts
- Leave room for spontaneous moments

---

## The Words-Per-Minute Formula

Average speaking pace: **130–150 words per minute** (conversational, not rushed).

| Duration | Target word count |
|----------|-------------------|
| 1 min    | 130–150 words     |
| 5 min    | 650–750 words     |
| 8 min    | 1,040–1,200 words |
| 12 min   | 1,560–1,800 words |
| 15 min   | 1,950–2,250 words |

---

## The Most Common Length Mistake

**Over-scripting.** A word-for-word script for a 15-minute video is ~2,000 words. Reading that verbatim sounds robotic and kills retention. Use full scripts for hooks and CTAs; use bullet outlines for body content.

---

## Generate the Right Length Script

Scriva lets you set target duration before generating — it automatically calibrates word count and pacing for your format.
    `,
  },

  "youtube-shorts-script": {
    title: "YouTube Shorts Script Template: Hook in 2 Seconds or Lose Them",
    desc: "The exact 3-part Shorts formula top creators use to hit 500k+ views. Includes 10 fill-in-the-blank templates.",
    tag: "YouTube",
    date: "Apr 15, 2025",
    readTime: "5 min read",
    content: `
## Why Shorts Are Different

Long-form YouTube rewards patience. Shorts punish it. You have 2 seconds before the swipe. Everything about Shorts scripting is built around that constraint.

---

## The 3-Part Shorts Formula

### Part 1: The Hook (0–3 seconds)
Lead with the payoff, the conflict, or the most shocking moment.

> "I gained 10,000 subscribers in 7 days — here's the exact method."

> "Most people get this completely wrong."

> "POV: you just discovered the productivity trick nobody talks about."

### Part 2: The Rapid Payoff (3–45 seconds)
Deliver the value immediately. No backstory, no throat-clearing. Use:
- **Lists** ("3 things that changed everything...")
- **Before/after** ("I used to do X. Now I do Y. Here's why.")
- **Mini-story** (hook → struggle → resolution in 30 seconds)

### Part 3: The Loop or CTA (45–60 seconds)
Either loop back to the hook (encourages replay = algorithm boost) or give a single clear CTA.

> "Follow for one tip like this every day."

---

## 10 Fill-in-the-Blank Shorts Templates

1. "Nobody talks about [topic] but it changed my [result]."
2. "[Number] signs you're [negative state] — and how to fix it."
3. "POV: You finally [positive outcome]."
4. "Stop doing [common thing]. Do [alternative] instead."
5. "The [adjective] truth about [topic]."
6. "I tried [thing] for [duration]. Here's what happened."
7. "[Question]? Here's the answer nobody gives you."
8. "Things I wish I knew before [experience]."
9. "[Number] [items] that take under 2 minutes."
10. "Watch this if you [audience pain point]."

---

## What Makes Shorts Go Viral

- **Completion rate** is the #1 signal. Every word must earn its place.
- **Loops** — end where you began. Algorithm rewards replays.
- **Captions** — 85% of Shorts are watched without sound.
- **No intros** — your name, your channel, your story — cut it all.

---

## Generate Your Shorts Script

Scriva has a dedicated Shorts mode — 60-second max output, hook-first structure, loop ending built in.
    `,
  },

  "youtube-channel-growth-scripts": {
    title: "How Top YouTubers Use Scripts to Grow Faster (With Examples)",
    desc: "Why scripted videos outperform unscripted across every metric — and the exact frameworks used by channels with 100k+ subscribers.",
    tag: "YouTube",
    date: "Apr 20, 2025",
    readTime: "7 min read",
    content: `
## The Scripted vs. Unscripted Debate Is Over

The data is clear: scripted videos have higher average view duration, better click-through rates (because creators plan stronger titles), and more consistent publishing schedules.

That doesn't mean reading word-for-word. It means planning your words before you record.

---

## How Fast-Growing Channels Use Scripts

### Pattern 1: Full Script for Hook + Outline for Body
Most 100k+ channels write every word of their first 30 seconds, then use bullet outlines for the rest. Result: strong algorithm signal (watch time past 30s) with natural delivery.

### Pattern 2: The "5 Bullet" Outline Method
- Write 5 bullets — one per key point
- Under each bullet: one stat, one story, one action
- Total planning time: 15 minutes. Total script: ~900 words.

### Pattern 3: Daily Script Templates
Channels that post 5x/week use templates:
- Fixed opening format ("Welcome back — today we're...")
- Fixed CTA ("If this helped, the next video you should watch is...")
- Variable middle section only

---

## The Retention Curve and Your Script

YouTube Analytics shows exactly where viewers drop off. Use it to diagnose your script:

| Drop-off point | Script fix |
|----------------|------------|
| First 30 seconds | Weak hook — rewrite the opening |
| 2–3 minute mark | Missing re-hook — add "stick around because..." |
| End | Weak CTA — add clear next-step instruction |

---

## Example: Before vs. After Script Opening

**Before (unscripted):**
> "Hey guys, what's up, welcome back to my channel, so today I wanted to talk about something I've been thinking about a lot lately which is productivity and I know there's a lot of videos on this but..."

**After (scripted):**
> "You're losing 2 hours every day to a habit you don't even notice. I'll show you exactly what it is and how to eliminate it in 60 seconds."

Same topic. Completely different retention outcome.

---

## Use Scriva to Build Your Script System

Scriva generates scripts in your brand voice — so your 5th video sounds as sharp as your first.
    `,
  },

  "how-to-hook-viewers-youtube": {
    title: "YouTube Hook Examples: 40 Openings That Keep Viewers Watching",
    desc: "Copy-paste hooks for every niche and video type. Organized by psychological trigger — curiosity, fear, desire, and social proof.",
    tag: "YouTube",
    date: "Apr 25, 2025",
    readTime: "8 min read",
    content: `
## The Psychology of a YouTube Hook

Every hook exploits one of four psychological triggers:
1. **Curiosity gap** — "I'll tell you what, but not yet"
2. **Fear of loss** — "You're making a costly mistake"
3. **Desire** — "Here's how to get what you want"
4. **Social proof** — "Here's what successful people do"

Pick your trigger before you write your first line.

---

## 10 Curiosity Gap Hooks

1. "Most people do this backwards — and it costs them everything."
2. "The thing nobody tells you about [topic]."
3. "I was wrong about [topic] for 3 years. Here's what I learned."
4. "There's a reason the most successful [people] all do this one thing."
5. "What I discovered after [action] surprised me."
6. "This simple change doubled my [result]. Here's what it was."
7. "The counterintuitive reason [common belief] is keeping you stuck."
8. "You've been told to [advice]. Here's why that's wrong."
9. "After studying 100 [examples], I found one pattern."
10. "The secret to [outcome] isn't what you think."

---

## 10 Fear-of-Loss Hooks

11. "You're losing [resource] every day you ignore this."
12. "If you're doing [thing], stop immediately."
13. "The biggest mistake [audience] makes — and how to avoid it."
14. "Warning: this common [habit] is silently [negative outcome]."
15. "Why [popular approach] is making your [problem] worse."
16. "The [resource] you're wasting that you can never get back."
17. "You're one [decision] away from [bad outcome]."
18. "What nobody warns you about [topic]."
19. "This is why [goal] feels impossible — and it's fixable."
20. "I almost gave up on [thing]. Here's what stopped me."

---

## 10 Desire Hooks

21. "How to [desired outcome] in [short timeframe]."
22. "I went from [bad state] to [good state] — here's exactly how."
23. "The [adjective] way to [achieve goal] without [common obstacle]."
24. "What [successful person] does differently to get [result]."
25. "How to [outcome] even if [common objection]."
26. "The [number]-step system I used to [achieve result]."
27. "Why [audience type] are getting [result] faster than ever."
28. "[Result] in [timeframe] — here's the exact blueprint."
29. "How to [outcome] starting today, with zero [resource]."
30. "The [tool/method] that [result] in [timeframe]."

---

## 10 Social Proof Hooks

31. "I interviewed 50 [successful people]. Here's what they all said."
32. "[Number] creators used this to hit [milestone]."
33. "What [famous person] does every morning — and why it works."
34. "[Number] million people have tried this. Here's what actually works."
35. "After working with [number] clients, I noticed one pattern."
36. "The strategy [successful brand] used to grow to [number]."
37. "[Expert title] shared this with me and I had to pass it on."
38. "This worked for [audience type] in [location] — here's why."
39. "[Testimonial paraphrase] — here's the exact method."
40. "The approach [number] top performers swear by."

---

## How to Pick Your Hook

Match trigger to your content:
- **Tutorial** → Desire or Social proof
- **Opinion piece** → Curiosity gap
- **Warning/advice** → Fear of loss
- **Story** → Curiosity gap + Desire

---

## Generate Custom Hooks for Your Niche

Scriva generates hook variations tuned to your specific topic, audience, and tone — not generic templates.
    `,
  },

  "tiktok-script-template": {
    title: "TikTok Script Template: The Exact Formula for Any Niche",
    desc: "A reusable TikTok script structure that works across finance, fitness, beauty, business, and education content.",
    tag: "TikTok",
    date: "May 1, 2025",
    readTime: "6 min read",
    content: `
## Why TikTok Needs a Different Script Format

YouTube rewards depth. TikTok rewards speed. Your TikTok script needs to deliver the core value within the first 8 seconds — or the algorithm buries you.

---

## The Universal TikTok Script Template

### Line 1: The Hook (0–2 seconds)
One sentence. Bold claim, relatable situation, or unexpected statement.

> Template: "[Audience] who [do X thing] — this changes everything."
> Template: "Stop [common behavior] if you want to [desired outcome]."
> Template: "I [unexpected result] by doing one thing differently."

### Lines 2–4: The Setup (2–8 seconds)
Expand on the hook. Give just enough context to make them want to stay.

> Template: "Most [audience] [common mistake]. Here's what the top [percentage] do instead."

### Lines 5–12: The Payoff (8–45 seconds)
The actual value. Use one of these formats:
- **List:** "3 things you need to know about [topic]..."
- **Story:** "Last week I [situation]. Here's what I learned."
- **Tutorial:** "Step 1: [action]. Step 2: [action]. Step 3: [action]."
- **Comparison:** "Old way: [X]. New way: [Y]. Result: [Z]."

### Final Line: The CTA or Loop (45–60 seconds)
One action, no more.

> "Follow for more [topic] tips."
> "Comment [word] and I'll send you the full guide."
> "Save this for later." (strongest for algorithm)

---

## Template by Niche

**Finance:** "Most people think [common belief] is the path to [goal]. It's actually the slowest way. Here's what wealthy people do instead: [3 points]. Follow for one money habit every day."

**Fitness:** "If you're doing [exercise] for [goal], you're doing it wrong. The muscle you actually need to target is [muscle]. Try this instead: [movement]. Save this so you remember."

**Business:** "Before I hit $10k/month, I was making all 3 of these mistakes: [list]. Here's what changed everything: [insight]. Comment 'guide' if you want my full breakdown."

**Education:** "Nobody explains [topic] correctly. Here's the simplest version: [explanation in 3 sentences]. Now you'll never forget it. Follow for one lesson like this every day."

---

## Generate TikTok Scripts Instantly

Scriva generates TikTok scripts in any of these formats — just paste your topic and pick your niche.
    `,
  },

  "tiktok-viral-formula": {
    title: "The TikTok Viral Formula: What Makes Videos Blow Up (And How to Replicate It)",
    desc: "Data-backed breakdown of what the TikTok algorithm rewards — and how to engineer your scripts to hit every signal.",
    tag: "TikTok",
    date: "May 5, 2025",
    readTime: "7 min read",
    content: `
## What the TikTok Algorithm Actually Measures

TikTok's algorithm is simpler than most creators think. It rewards videos that keep people watching. Every other metric — shares, comments, likes — is secondary.

The four signals that matter most:

1. **Completion rate** — Did they watch the full video?
2. **Rewatch rate** — Did they loop it?
3. **Shares** — Did they send it to someone?
4. **Saves** — Did they bookmark it for later?

Your script determines all four.

---

## How to Engineer Each Signal

### Completion Rate
- Deliver value in the first 8 seconds (don't make them wait)
- End with a cliffhanger or a payoff that justifies watching
- Cut every word that doesn't push the story forward

### Rewatch Rate
- Create a loop: end where you began
- Use a detail early in the video that only makes sense at the end
- Example: Open with "The answer is 7." Close with "So now you know why the answer is 7."

### Shares
- Make the viewer look smart for sharing it
- "Send this to anyone who [relates to the problem]"
- Create content people want to use as a response or reference

### Saves
- "Save this for later" as your CTA (this is the strongest CTA on TikTok)
- List-format content gets saved more than opinion content
- Tutorials, templates, and checklists are the most saved formats

---

## The Viral Script Structure (Based on Top 1% Videos)

**0–2s:** Bold hook that creates a curiosity gap
**2–8s:** Brief context that makes the hook believable
**8–40s:** The value delivery (3 points, a story, or a tutorial)
**40–55s:** The unexpected twist or payoff
**55–60s:** CTA that drives saves or follows

---

## Niches With Highest Viral Potential on TikTok

| Niche | Best format | Avg completion rate |
|-------|-------------|---------------------|
| Finance | List + story | 68% |
| Fitness | Tutorial | 72% |
| Business/side hustle | Story + result | 65% |
| Relationship/psychology | Opinion | 71% |
| Food | Tutorial | 78% |

---

## Generate Viral-Optimized TikTok Scripts

Scriva builds completion rate into every script — hook, pacing, and loop ending are all engineered for the algorithm.
    `,
  },

  "tiktok-for-business-script": {
    title: "TikTok for Business: Script Templates That Drive Sales Without Being Salesy",
    desc: "How to write TikTok scripts that convert viewers into customers — without the cringey hard sell.",
    tag: "TikTok",
    date: "May 8, 2025",
    readTime: "6 min read",
    content: `
## Why Most Business TikToks Fail

They sell too early. A cold audience on TikTok hasn't decided to trust you yet. Lead with value, not your product.

The rule: **Give first. Sell second.**

---

## The 4-Stage Business TikTok Funnel

### Stage 1: Awareness (Give, don't sell)
**Script format:** Educational tip, insight, or story
**Goal:** Views + follows
**CTA:** "Follow for more [topic] tips"

Example: A skincare brand posts "3 ingredients that are silently aging your skin" — no product mention.

### Stage 2: Interest (Show, don't tell)
**Script format:** Behind-the-scenes, process, transformation
**Goal:** Saves + profile visits
**CTA:** "Save this" or "Check the link in bio"

Example: Same brand shows the formulation process — still no hard sell.

### Stage 3: Desire (Soft pitch)
**Script format:** Problem → solution → product as vehicle
**Goal:** Click-throughs
**CTA:** "Link in bio for [specific benefit]"

Example: "I was getting [problem] until I switched to [type of product]. Three months later: [result]. Link in bio."

### Stage 4: Action (Direct offer)
**Script format:** Testimonial + offer + urgency
**Goal:** Conversions
**CTA:** Clear, specific action

Example: "Last week 400 people used this to [result]. We're running [offer] through Sunday — link in bio."

---

## 3 Business TikTok Script Templates

**Template 1 (Educational):**
"[Audience], stop [mistake]. Here's what [experts/successful people] do instead: [3 tips]. Follow for one [industry] insight every day."

**Template 2 (Transformation story):**
"Before [product/method]: [negative state]. After 30 days: [positive result]. Here's exactly what changed: [explanation]. [Soft CTA]."

**Template 3 (Social proof):**
"[Number] of our customers told us the same thing: [common pain point]. That's why we [solution]. Here's how it works: [explanation]. [CTA]."

---

## Generate Business TikTok Scripts

Scriva generates business-focused TikTok scripts that balance value and conversion — for any product category.
    `,
  },

  "vsl-script-examples": {
    title: "VSL Script Examples: 3 Real Scripts That Convert at 4%+",
    desc: "Annotated VSL scripts with conversion commentary — showing exactly why each section works.",
    tag: "VSL",
    date: "May 12, 2025",
    readTime: "10 min read",
    content: `
## What Makes a VSL Convert

The difference between a 0.5% and a 4% conversion rate isn't production value — it's script structure. Here are three annotated examples showing exactly what works and why.

---

## Example 1: Online Course VSL (Education Niche)

**[ATTENTION GRABBER]**
> "If you've been trying to grow your online business for more than 6 months without hitting $5,000 a month, this is the most important video you'll watch this year."

*Why it works: Specific audience (6 months trying), specific threshold ($5k), extreme stakes ("most important video").*

**[PROBLEM AGITATION]**
> "You've tried courses. You've tried coaches. You've consumed hours of free content. And you're still in the same place. The brutal truth? It's not your effort. You're solving the wrong problem."

*Why it works: Validates past attempts, removes blame, creates curiosity about the "real" problem.*

**[SOLUTION INTRODUCTION]**
> "That's why I created [Product Name] — a step-by-step system that focuses on the one lever that actually moves the needle for online businesses under $10k/month."

*Why it works: "One lever" implies simplicity. "Under $10k/month" speaks directly to where the audience is.*

**[PROOF STACK]**
> "Over 2,400 students have gone through this. Here's what Sarah said after 90 days..."

*Why it works: Specific number (2,400), specific timeframe (90 days), named person (Sarah).*

---

## Example 2: SaaS Tool VSL (B2B)

**[OPENING]**
> "What if you could cut your [process] time by 70% without hiring anyone new?"

*Why it works: Specific number (70%), removes the most common objection (headcount).*

**[PROOF OF CONCEPT]**
> "Our customers are doing this right now. [Company] reduced their [task] from 8 hours a week to 2. [Company 2] eliminated [problem] entirely."

*Why it works: Named companies, specific numbers, specific problems solved.*

---

## Example 3: Physical Product VSL (Health)

**[HOOK]**
> "In the next 7 minutes, I'm going to show you why everything you've been told about [problem] is wrong — and what 1,200 people are doing instead."

*Why it works: Specific time (7 minutes = low commitment), challenges existing beliefs, social proof (1,200).*

---

## The VSL Section Checklist

- [ ] Attention grabber targets a specific audience with a specific problem
- [ ] Problem agitation names 3+ failed alternatives before yours
- [ ] Root cause reveal explains WHY other solutions failed
- [ ] Solution intro is one clear sentence
- [ ] Proof stack has at least 3 data points (testimonials, numbers, names)
- [ ] Price reveal comes after value stack
- [ ] Guarantee removes all risk
- [ ] CTA is one action with urgency

---

## Generate Your VSL Script

Scriva generates complete VSL scripts with all 9 sections — tailored to your product, audience, and price point.
    `,
  },

  "google-ads-script": {
    title: "Google Ads Video Script: The Formula for In-Stream and Discovery Ads",
    desc: "How to write scripts for YouTube pre-roll, in-stream, and Discovery ads — with skip-proof opening lines.",
    tag: "Paid Ads",
    date: "May 15, 2025",
    readTime: "7 min read",
    content: `
## The 5-Second Rule for Google Video Ads

In-stream ads can be skipped after 5 seconds. That means your entire campaign ROI depends on the first 5 seconds of your script.

---

## Script Structure by Ad Format

### In-Stream (Skippable) — 15–60 seconds

**Seconds 0–5 (Skip-proof zone):**
- Ask a question they must answer "yes" to
- Make a bold, counterintuitive claim
- Show a transformation or result immediately

> "Are you still paying [price] for [thing]? There's a better way."

**Seconds 5–30 (Value delivery):**
- Deliver on the promise of your hook
- One clear point, not three

**Seconds 30–60 (CTA):**
- One action: click, sign up, learn more
- Repeat the core benefit one more time

### Non-Skippable Bumper Ads — 6 seconds
Every word must work. Use this template:

> "[Problem] → [Solution] → [CTA]"
> "Tired of [pain]? [Brand] fixes it in [timeframe]. Try free."

### Discovery Ads (YouTube homepage / search)
Match your script to your headline — if the headline promises "double your revenue," the script must deliver that promise.

---

## 5 Skip-Proof Opening Lines

1. "Before you skip this — [specific benefit for them]."
2. "[Audience], this is for you specifically."
3. "You're about to see something you can't unsee."
4. "I'll give you [specific thing] in the next 30 seconds."
5. "Quick question: are you still [doing painful thing]?"

---

## What Google's Algorithm Rewards

- **View-through rate** — watch time past the skip point
- **Click-through rate** — clicks on your CTA overlay
- **Earned actions** — views, likes, follows after watching

Scripts that generate earned actions get cheaper CPMs over time.

---

## Generate Google Ads Scripts

Scriva generates video ad scripts optimized for in-stream, bumper, and Discovery formats — with skip-proof openings built in.
    `,
  },

  "instagram-reel-script": {
    title: "Instagram Reel Script Template: Hook, Deliver, Convert in 30 Seconds",
    desc: "How to write Reels scripts that stop the scroll, get shared, and drive profile visits — with 10 fill-in-the-blank templates.",
    tag: "Paid Ads",
    date: "May 18, 2025",
    readTime: "6 min read",
    content: `
## Reels vs. TikTok: What's Different

Instagram users are more likely to visit your profile after a Reel (intent to follow/buy). TikTok users are more likely to share. Write Reels scripts to drive profile visits; write TikTok scripts to drive shares.

---

## The Reels Script Formula (30 seconds)

**0–3s: Scroll-stopping hook**
Visual + spoken hook must work together. The first frame determines if they stop.

> Spoken: "This mistake is costing you followers every day."
> Visual: Text overlay with the same message.

**3–20s: Fast value delivery**
Get to the point immediately. One idea, executed clearly.

- List format: "3 reasons why..."
- Tutorial: "Step 1... Step 2... Step 3..."
- Contrast: "Most people do X. Here's what works instead: Y."

**20–28s: CTA**
One ask. The highest-converting Reels CTAs:
1. "Follow for more [topic]" — drives followers
2. "Save this for later" — drives algorithm reach
3. "Tag someone who needs this" — drives shares
4. "Link in bio" — drives traffic

**28–30s: Replay bait (optional)**
End with something that makes them want to rewatch.

---

## 10 Reels Script Templates

1. "The [number] things nobody tells you about [topic]: [list]. Follow for more."
2. "If you're [audience], you need to hear this: [insight]."
3. "[Common belief] is wrong. Here's what actually works: [alternative]."
4. "I spent [time] figuring this out so you don't have to: [insight]."
5. "Before you [action], watch this: [tip]. Save it."
6. "[Question]? The answer is [simple insight]. Follow for more."
7. "This [thing] changed my [area] completely. Here's how: [explanation]."
8. "[Stat/fact]. Most people don't know this. Now you do."
9. "POV: You finally [positive outcome]. Here's how you got there."
10. "[Number]-second [topic] tip: [tip]. That's it. Save this."

---

## Generate Reels Scripts

Scriva generates Instagram Reel scripts in 30, 45, or 60-second formats — with hook, value, and CTA built in.
    `,
  },

  "ugc-ad-script": {
    title: "UGC Ad Script Template: How to Write Scripts That Feel Authentic (And Convert)",
    desc: "The formula behind UGC ads that outperform polished brand videos — with 5 complete script examples.",
    tag: "Paid Ads",
    date: "May 20, 2025",
    readTime: "7 min read",
    content: `
## Why UGC Ads Outperform Polished Ads

User-generated content ads convert because they don't look like ads. The moment a viewer suspects they're watching an ad, trust drops and conversion rates follow.

The goal of a UGC script: sound completely real while hitting every conversion beat.

---

## The UGC Ad Formula

### Opening (0–5 seconds): The Relatable Moment
Start mid-thought, mid-story, or mid-action. No branded intro.

> "Okay so I've been using this for three weeks and I need to talk about it."
> "I was skeptical. I'll be honest. I almost didn't try it."
> "My friend wouldn't stop talking about [product] so I finally caved."

### Middle (5–35 seconds): The Honest Journey
Share the problem, the discovery, and the result. Use imperfect language.

> "I've tried [alternatives] — nothing worked. Then I found [product]. The first thing I noticed was [specific benefit]. By week two, [another benefit]."

### End (35–60 seconds): The Genuine Recommendation
Sound like you're telling a friend, not closing a sale.

> "I don't usually post stuff like this but [product] actually surprised me. If you're dealing with [problem], just try it. They have a [guarantee/free trial] so you've got nothing to lose."

---

## 5 Complete UGC Script Examples

**Script 1 (Skincare):**
"I've been breaking out since I was 14. Tried everything. Last month I started using [product] and I genuinely cannot believe the difference. My skin hasn't looked this good in years. I'll link it below — they have a 30-day trial so you can actually see if it works for you."

**Script 2 (Productivity App):**
"I used to spend Sunday evening dreading the week. Then someone in my team mentioned [app] and now I actually look forward to Monday. Sounds dramatic but I'm not joking. The [specific feature] alone saved me two hours this week."

**Script 3 (Food/Supplement):**
"My nutritionist recommended [product] three months ago and I kept putting it off. Finally tried it last month. I don't have the words for how different I feel. Energy is up, [symptom] is gone. I'm not a review person but this one deserved it."

**Script 4 (Online Course):**
"I bought [course] thinking it would be like every other course I've bought and never finished. I finished it in a week. Did [specific outcome] 10 days later. Leaving this here for whoever needs to hear it."

**Script 5 (SaaS):**
"If you're still doing [task] manually, please watch this. [Tool] does it in [timeframe]. I was genuinely embarrassed it took me so long to find this."

---

## Generate UGC Scripts

Scriva generates UGC-style ad scripts in an authentic, conversational tone — optimized for any product category.
    `,
  },

  "podcast-intro-script": {
    title: "Podcast Intro Script: How to Hook Listeners in the First 60 Seconds",
    desc: "The exact formula for podcast intros that hook listeners, set expectations, and reduce early drop-off.",
    tag: "Podcast",
    date: "May 22, 2025",
    readTime: "5 min read",
    content: `
## Why Most Podcast Intros Fail

The average listener decides to keep listening — or not — within the first 60 seconds. Most podcast intros waste this time on long music beds, extended host introductions, and vague episode previews.

---

## The Podcast Intro Formula (60 seconds)

### 0–15 seconds: The Cold Open Hook
Start in the middle of the story. No music, no intro, no "welcome back."

> "The day I almost quit this podcast, I had 200 episodes published and fewer listeners than when I started. Today I'm going to tell you what changed — and why it applies to everything you're building."

### 15–30 seconds: Episode Promise
Tell them exactly what they'll get. Specific beats generic every time.

> **Weak:** "Today we're talking about content strategy."
> **Strong:** "Today you'll get the exact 3-part framework I used to grow from 2,000 to 50,000 listeners in 8 months — without any paid promotion."

### 30–45 seconds: Credibility Anchor
One sentence that earns the right to teach this topic.

> "I've been studying podcast growth for 4 years and interviewed 80+ top podcasters about what actually works."

### 45–60 seconds: Bridge to Content
Transition into the episode without a hard cut.

> "Let's get into it. The first thing most podcasters get wrong is..."

---

## Intro Templates by Show Type

**Interview Show:**
> "[Hook about guest's most remarkable insight]. I'm [Host], talking to [Guest] — [one-sentence credential]. By the end of this you'll know [specific takeaway]. Here's [Guest]."

**Solo Show:**
> "[Hook — bold claim or story]. I'm [Host]. In the next [time], I'm going to give you [specific deliverable]. Let's get into it."

**News/Roundup Show:**
> "Three things happened this week in [industry] that you need to know about. I'm [Host] and in the next [time] I'll break down [story 1], [story 2], and [story 3]."

---

## Generate Podcast Intros

Scriva generates podcast intros for any show format — solo, interview, or panel — in under 10 seconds.
    `,
  },

  "podcast-sponsorship-script": {
    title: "Podcast Sponsorship Script: How to Read Ads That Don't Kill Listener Drop-Off",
    desc: "The ad read format used by top podcasters that keeps listeners engaged — and sponsors coming back.",
    tag: "Podcast",
    date: "May 25, 2025",
    readTime: "5 min read",
    content: `
## The Problem With Most Podcast Ad Reads

Most hosts read sponsor copy verbatim. Listeners hear it instantly, skip past it, and the host loses trust. Sponsors see low conversion. Everyone loses.

The solution: ad reads that sound like personal recommendations, not scripts.

---

## The 4-Part Podcast Ad Formula

### Part 1: The Personal Bridge (5–10 seconds)
Connect the sponsor to something personal or relevant to the episode.

> "Speaking of [episode topic], today's sponsor actually helped me with [related problem]..."

### Part 2: The Genuine Recommendation (15–20 seconds)
Speak like you're talking to a friend. Use "I" statements.

> "I've been using [product] for [time] and the thing that surprised me most was [specific benefit]. I [specific use case] and [specific result]."

### Part 3: The Audience Fit (10 seconds)
Tell them why it's relevant to them specifically.

> "If you're [audience description] and you [problem], this is exactly for you."

### Part 4: The Offer + CTA (5–10 seconds)
Make it easy. Give a URL or code. Create light urgency.

> "Try it free at [URL] — or use code [CODE] for [offer]. I'll put the link in the show notes."

---

## Host-Read vs. Produced Ad

| Format | Best for | Conversion rate |
|--------|----------|-----------------|
| Host-read (personal) | Trust-based products | Higher (2–3%) |
| Produced (polished) | Brand awareness | Lower (0.5–1%) |
| Hybrid | Mid-funnel offers | Medium (1–2%) |

---

## The One Rule for Good Ad Reads

Only accept sponsors whose products you'd genuinely recommend. Listeners hear inauthenticity immediately.

---

## Generate Podcast Ad Scripts

Scriva generates podcast sponsorship scripts in your voice — personal, natural, and conversion-optimized.
    `,
  },

  "chatgpt-script-prompts": {
    title: "ChatGPT Prompts for YouTube Scripts: What Works (And What Doesn't)",
    desc: "The exact prompts that generate usable YouTube scripts from ChatGPT — plus the common mistakes that produce generic garbage.",
    tag: "AI Tools",
    date: "May 28, 2025",
    readTime: "7 min read",
    content: `
## Why Generic ChatGPT Scripts Fall Flat

"Write me a YouTube script about productivity" produces content that could have been written about any channel, for any audience, in any tone. The problem isn't ChatGPT — it's the prompt.

---

## The 5-Part Prompt Framework

Every good AI script prompt needs:

**1. Audience Definition**
Don't say "entrepreneurs." Say "burned-out 9-to-5 employees in their 30s with a side hustle making under $2,000/month."

**2. Specific Topic (not general subject)**
Don't say "productivity." Say "why their morning routine is killing their focus by noon."

**3. Script Type and Length**
"8-minute YouTube video script with hook, 3 main points, and a CTA."

**4. Tone**
"Conversational, slightly irreverent, like a smart friend giving real advice — not a corporate consultant."

**5. Structural Requirements**
"Start with a hook that creates a curiosity gap. Include a re-hook at the 2-minute mark. End with a subscribe CTA that ties back to the opening."

---

## Before vs. After Prompt Examples

**Before:**
> "Write a YouTube script about investing."

**After:**
> "Write an 8-minute YouTube script for 25–35 year olds who earn $60–80k/year but have never invested. Tone: encouraging but honest, like a slightly older friend who figured this out. Hook: a curiosity gap about why waiting costs more than the market doing badly. Structure: hook (0–30s), re-hook (30s), 3 main points with transitions, CTA to subscribe. No jargon."

---

## Prompts for Specific Script Types

**YouTube Hook Only:**
> "Write 5 hook variations for a YouTube video about [topic] targeting [audience]. Each hook should use a different psychological trigger: curiosity gap, fear of loss, desire, social proof, and controversy."

**TikTok Script:**
> "Write a 45-second TikTok script for [audience] about [topic]. Start with a scroll-stopping first line. Deliver 3 quick points. End with a 'save this' CTA. Conversational tone."

**VSL Opening:**
> "Write the first 90 seconds of a VSL for [product] targeting [audience]. Open with the most emotionally resonant version of their pain. Transition to why previous solutions have failed. Don't mention the product yet."

---

## When to Use Scriva Instead

ChatGPT doesn't know your niche, your brand voice, or what's worked in your analytics. It also doesn't automatically apply proven script structures. Scriva is purpose-built for scripts — format awareness, structure, and brand voice are built into every output.
    `,
  },

  "best-ai-script-tools": {
    title: "Best AI Script Generator Tools in 2025 (Compared)",
    desc: "An honest comparison of the top AI script tools for YouTube, TikTok, and ads — what each does well and where they fall short.",
    tag: "AI Tools",
    date: "May 30, 2025",
    readTime: "8 min read",
    content: `
## What to Look for in an AI Script Generator

Most AI writing tools are general-purpose — they can write scripts, but they weren't designed for them. The best script generators are:

1. **Format-aware** — they know YouTube is different from TikTok is different from VSL
2. **Structure-built** — they apply proven frameworks automatically
3. **Tone-controllable** — you can set urgency, humor, authority, etc.
4. **Fast** — sub-30 seconds for a usable draft

---

## The Tools (Honest Assessment)

### ChatGPT / Claude (General AI)
**Best for:** Custom prompts, iterating on drafts
**Weakness:** No built-in script structure — you have to prompt every element
**Verdict:** Powerful but requires prompt expertise

### Jasper
**Best for:** Long-form marketing copy
**Weakness:** Not optimized for video formats — outputs read like blog posts
**Verdict:** Strong for written content, not scripts

### Copy.ai
**Best for:** Short-form ad copy
**Weakness:** Limited on longer formats (VSL, full YouTube scripts)
**Verdict:** Good for social ad hooks, weak on full scripts

### Scriva
**Best for:** YouTube, TikTok, VSL, podcast, and ad scripts
**Strength:** Built-in format structures, tone control, brand voice
**Verdict:** Purpose-built for video scripts

---

## Feature Comparison

| Feature | ChatGPT | Jasper | Copy.ai | Scriva |
|---------|---------|--------|---------|--------|
| YouTube script structure | Manual | Weak | No | Yes |
| TikTok hook format | Manual | No | Partial | Yes |
| VSL framework | Manual | No | No | Yes |
| Tone control | Good | Good | Good | Yes |
| Free tier | Yes | Trial | Yes | Yes (5/mo) |
| Price | $20/mo | $49/mo | $36/mo | $19/mo |

---

## Which Tool Should You Use?

- **If you already know how to prompt AI well:** ChatGPT + strong prompts
- **If you want structure without the prompt work:** Scriva
- **If you primarily write ad copy:** Copy.ai
- **If you're creating long-form blog + scripts:** Jasper

---

## Try Scriva

Scriva is free to start — 5 scripts per month, all formats included, no credit card required.
    `,
  },

  "sales-video-script": {
    title: "Sales Video Script Template: The 7-Step Formula That Converts Cold Traffic",
    desc: "How to write a sales video that converts viewers who've never heard of you — with a complete fill-in-the-blank template.",
    tag: "Conversion",
    date: "Jun 2, 2025",
    readTime: "9 min read",
    content: `
## Why Sales Videos Need a Different Script

A sales video has one job: convert a skeptical viewer into a buyer. Every sentence serves that goal or gets cut.

---

## The 7-Step Sales Video Framework

### Step 1: The Pattern Interrupt (0–15 seconds)
> "I'm not going to tell you [product] is perfect. I'm going to tell you exactly who it's for — and who it's not."

This disarms skepticism by demonstrating honesty.

### Step 2: The Pain Statement (15–45 seconds)
> "If you're [audience], you know the frustration of [specific pain]. You've tried [solution 1], [solution 2]. And you're still here."

### Step 3: The Root Cause (45–90 seconds)
> "Here's why none of that worked: [specific insight that reframes the problem]."

Without this, your solution sounds like "just another tool."

### Step 4: The New Mechanism (90s–2:30)
> "What you actually need is [approach]. Here's how it works: [simple explanation]."

### Step 5: The Proof Stack (2:30–4:00)
Three types of proof in this order:
1. Testimonials (real people with specific results)
2. Case studies (one detailed story)
3. Data (numbers, percentages, timeframes)

### Step 6: The Offer (4:00–5:00)
> "When you join [product], you get [feature 1] ($X value), [feature 2] ($X value), and [bonus] ($X value). Total value: $X. Your investment today: $[price]."

### Step 7: The Close (5:00–end)
> "If you don't [result] in [timeframe], I'll refund every cent. No questions. Click the button below right now."

---

## Fill-in-the-Blank Template

**[PATTERN INTERRUPT]:** "I'm not going to tell you [product] is for everyone. Here's who it's actually for."

**[PAIN]:** "If you're a [audience] who's been struggling with [problem], you know that..."

**[ROOT CAUSE]:** "The reason [previous solutions] haven't worked is [insight]."

**[NEW MECHANISM]:** "[Product] works differently because [specific approach]."

**[PROOF]:** "[Name] went from [before] to [after] in [timeframe] using [specific feature]."

**[OFFER]:** "Everything you need to [outcome]: [list features]. Today: $[price]."

**[CLOSE]:** "[Guarantee]. [Urgency]. [Single CTA]."

---

## Generate Your Sales Video Script

Scriva generates complete sales video scripts with all 7 sections — tailored to your product, audience, and price point.
    `,
  },

  "explainer-video-script": {
    title: "Explainer Video Script: How to Make Complex Ideas Instantly Clear",
    desc: "The 5-part explainer script formula used by SaaS companies and educators to convert confused visitors into engaged users.",
    tag: "Conversion",
    date: "Jun 5, 2025",
    readTime: "6 min read",
    content: `
## What an Explainer Video Must Do

An explainer video has 90 seconds to answer three questions:
1. What is this?
2. Why do I need it?
3. How do I get it?

---

## The 5-Part Explainer Script Formula

### Part 1: The Problem (0–20 seconds)
> "[Audience] spend [time/money] dealing with [problem]. It's frustrating. And it's completely avoidable."

### Part 2: The Solution (20–40 seconds)
> "[Product] is [simple category] that [core benefit] — so you can [desired outcome] without [main obstacle]."

### Part 3: How It Works (40–70 seconds)
> "Here's how it works: First, [step 1]. Then [step 2]. Within [timeframe], [result]."

Three steps maximum. Simpler is always better.

### Part 4: The Proof (70–80 seconds)
> "Over [number] teams use [product] to [result]. [Company name] reduced [metric] by [percentage] in [timeframe]."

### Part 5: The CTA (80–90 seconds)
> "Try [product] free — no credit card required. [URL]"

---

## Common Explainer Video Mistakes

| Mistake | Fix |
|---------|-----|
| Starting with company history | Start with the customer's problem |
| Listing all features | Focus on the one core benefit |
| Using jargon | Replace every technical term with a plain-language equivalent |
| Multiple CTAs | Pick one: sign up, learn more, or watch demo |
| Running over 90 seconds | Cut everything that doesn't answer the 3 core questions |

---

## Explainer Script Template

**[0:00–0:20]** "[Audience] deal with [problem] every [frequency]. It costs them [time/money] and [frustration]."

**[0:20–0:40]** "That's why we built [product] — [one-sentence description] that [benefit] in [timeframe]."

**[0:40–1:10]** "Here's how it works: [Step 1]. [Step 2]. [Step 3]. That's it."

**[1:10–1:20]** "[Proof: number of users, or specific result]."

**[1:20–1:30]** "Start free at [URL]. No credit card needed."

---

## Generate Explainer Scripts

Scriva generates 60–90 second explainer video scripts for any product category — clear, structured, and CTA-ready.
    `,
  },

  "webinar-script-template": {
    title: "Webinar Script Template: How to Fill 60 Minutes and Close Sales",
    desc: "The complete webinar script structure used by course creators and coaches — from welcome to pitch.",
    tag: "Conversion",
    date: "Jun 8, 2025",
    readTime: "10 min read",
    content: `
## Why Webinar Scripts Are Different

Webinars are the highest-converting sales format in online business — when scripted correctly. A great webinar script teaches, builds trust, and sells simultaneously.

---

## The 6-Part Webinar Script Structure

### Part 1: The Welcome + Promise (Minutes 0–5)
> "Welcome. In the next 60 minutes, I'm going to show you [specific outcome]. Not theory — the exact [method/system] I've used to [result]. Stay to the end because I have something special for you."

### Part 2: The Host Story (Minutes 5–15)
- Where you were (relatable low point)
- The turning point (discovery of the method)
- Where you are now (credibility)
- Why you're sharing it (reason to trust)

### Part 3: The Teaching (Minutes 15–45)
- 3 core insights, each with: concept → story → proof → application
- Leave the "how" slightly incomplete — enough to be valuable, enough to want more

> Insight 1: [Reframe their problem]
> Insight 2: [Introduce the new approach]
> Insight 3: [Show them it's achievable]

### Part 4: The Transition (Minutes 45–50)
> "Everything I've shown you today is what you need to understand why [offer] works. Now I want to show you how to get it done for you."

### Part 5: The Pitch (Minutes 50–58)
- Value stack (features → benefits → dollar values)
- Price reveal after value is established
- Guarantee (removes risk)
- Bonus(es) for deciding now (creates urgency)

### Part 6: The Q&A + Close (Minutes 58–75)
- Answer the 5 most common objections (prepare these in advance)
- Re-state the offer and CTA after each answer
- Hard close at the end

---

## The 5 Objections to Script In Advance

1. "I don't have time" — "[Product] is designed for busy [audience]. It takes [time] per [frequency]."
2. "I can't afford it" — "Let's talk about the cost of not solving this problem."
3. "I've tried things before" — "That's because you were using [old approach]. This is different because [new mechanism]."
4. "I need to think about it" — "I understand. Here's what I'd ask you to consider..."
5. "Will this work for me?" — Lead with a specific testimonial that matches their situation.

---

## Generate Webinar Scripts

Scriva generates full webinar scripts with all 6 sections — including the pitch, value stack, and Q&A prep.
    `,
  },

  "ai-vs-human-copywriting": {
    title: "AI Copywriting vs. Human: When to Use Each (And When to Combine)",
    desc: "An honest breakdown of what AI does better than humans, what humans do better than AI, and how to get the best of both.",
    tag: "AI Tools",
    date: "Jun 10, 2025",
    readTime: "6 min read",
    content: `
## The Wrong Question

Most marketers ask: "Is AI better than human copywriting?" The right question is: "What is each best at?"

---

## What AI Does Better

### Speed
An AI script generator produces a structured 1,500-word script in under 30 seconds. A human copywriter needs 2–4 hours for the same output.

### Format Consistency
AI applies the same framework every time. Your 50th YouTube script follows the same 7-part structure as your first.

### Variation
Need 10 hook variations for A/B testing? AI generates them in seconds.

### First Drafts
AI excels at producing a usable starting point. The blank page problem disappears.

---

## What Humans Do Better

### Genuine Emotion
AI can approximate emotion. Humans can access it. A story about a personal failure — the authentic texture only comes from someone who lived it.

### Brand Voice Nuance
The subtlest elements — the specific joke, the cultural reference, the tone shift in a crisis — require human judgment.

### Strategic Judgment
Which story to tell? Which objection to lead with? What to leave out? These decisions depend on context AI doesn't have.

---

## The Optimal Workflow

1. **AI generates the structure + first draft** (format, framework, transitions)
2. **Human reviews and edits** (voice, authenticity, strategic judgment)
3. **AI generates variations** (A/B test hooks, CTAs, lengths)
4. **Human makes final call** (which version ships)

---

## When to Use AI Scripts Without Editing

- High-volume social content (10+ pieces per week)
- First draft for quick-turn projects
- A/B testing variations

## When to Always Add a Human Pass

- High-stakes launches
- Personal brand content requiring your specific voice
- Emotionally complex stories

---

## Use Scriva for the AI Half

Scriva handles structure, format, and first draft. You handle the voice and strategy. That's the winning combination.
    `,
  },

  "scriva-vs-chatgpt": {
    title: "Scriva vs ChatGPT for Script Writing: An Honest Comparison",
    desc: "Both use GPT-4.1 under the hood — so why does Scriva produce better scripts? Here's the honest breakdown.",
    tag: "AI Tools",
    date: "May 10, 2025",
    readTime: "6 min read",
    content: `
## Why This Comparison Matters

Both Scriva and ChatGPT use OpenAI's models. So what's the actual difference — and why does it matter for script writers?

---

## What ChatGPT Does Well

ChatGPT (GPT-4.1) is genuinely powerful. If you know how to prompt it, you can get solid script drafts. It's flexible, conversational, and capable of following complex instructions.

**Where it breaks down for scripts:**
- No built-in script frameworks — you have to provide the structure yourself
- Inconsistent output format across sessions
- You need prompt expertise to get consistent results
- No format-specific tuning (YouTube ≠ TikTok ≠ VSL)

---

## What Scriva Does Differently

Scriva is purpose-built for scripts. Under the hood, it uses GPT-4.1 (Pro plan) — but the prompt engineering, structure enforcement, and format logic are baked in.

**The difference:**
- You select a format (YouTube, TikTok, VSL, etc.) and Scriva applies the correct framework automatically
- Every output follows a proven structure: Hook → Body → CTA with correct pacing
- Scene labels, transitions, and timing hints are included
- Tone control (Authoritative, Conversational, Urgent, Humorous) is consistent

---

## Side-by-Side: Same Topic, Different Tools

**Prompt:** "Write a 60-second TikTok script about why most people fail at saving money."

**ChatGPT output (raw):**
A generic paragraph with advice. Usable but unstructured. No hook timing, no scene breaks, no CTA direction.

**Scriva output:**
- HOOK (0–3s): "You're not bad at saving money. You're using the wrong system."
- POINT 1 (3–20s): The real reason — spending decisions happen when willpower is lowest
- POINT 2 (20–40s): The fix — automate the decision before willpower is needed
- CTA (40–60s): "Set up one automatic transfer today. That's it. Follow for more."

---

## Feature Comparison

| Feature | ChatGPT | Scriva |
|---------|---------|--------|
| Script framework built-in | No | Yes |
| Format-specific structure | Manual | Automatic |
| Scene labels & timing | Manual | Included |
| Tone control | Via prompt | Built-in setting |
| Script history | No | Yes (Pro) |
| Price | $20/mo | Free–$19/mo |
| Learning curve | High (prompt skill) | None |

---

## When to Use ChatGPT

- You already have strong prompt engineering skills
- You need a highly customized output that no template covers
- You're iterating on a specific creative direction

## When to Use Scriva

- You want production-ready scripts without prompt expertise
- You need consistent output across multiple formats
- You're producing scripts at volume (agencies, creators posting 3–5x/week)

---

## The Bottom Line

ChatGPT is a powerful tool for people who know how to use it. Scriva is for people who want the output — not the process.

Try Scriva free — 5 scripts per month, no credit card required.
    `,
  },

  "cold-email-script-template": {
    title: "Cold Email Script Template: The 3-Sentence Formula That Gets Replies",
    desc: "The exact cold email script structure used by top sales teams — short, specific, and built for replies, not pitches.",
    tag: "Conversion",
    date: "May 9, 2025",
    readTime: "6 min read",
    content: `
## Why Most Cold Emails Fail

Most cold emails are too long, too vague, and too focused on the sender. The best cold emails are short, specific, and focused entirely on the recipient's problem.

---

## The 3-Sentence Cold Email Framework

### Sentence 1: The Hook (Relevance)
Show you know them. Reference something specific — a post, a company milestone, a pain point in their industry.

> "I saw [Company] just expanded into [market] — congrats on the Series B."

### Sentence 2: The Value Statement
One sentence on what you do and who it helps. No jargon. No features.

> "I help [role] at [type of company] [achieve specific outcome] without [common obstacle]."

### Sentence 3: The Ask
One specific, low-friction next step. Not "let me know if interested." A real ask.

> "Worth a 15-minute call this week to see if it's a fit?"

---

## 5 Complete Cold Email Script Templates

### Template 1: The Direct Value Pitch
**Subject:** Quick question, [First Name]

[First Name],

[Specific observation about their company or role]. I help [ICP] [outcome] — we did this for [similar company] in [timeframe].

Worth a quick call this week?

[Name]

---

### Template 2: The Problem-First
**Subject:** [Pain point] at [Company]?

[First Name],

Most [role] I talk to struggle with [specific problem]. We built [product] to fix exactly that — [one-line how].

15 minutes this week to show you how it works?

[Name]

---

### Template 3: The Referral Angle
**Subject:** [Mutual contact] suggested I reach out

[First Name],

[Mutual contact] mentioned you're working on [relevant initiative]. I help teams like yours [outcome] — we worked with [reference] last quarter.

Open to a quick call?

[Name]

---

### Template 4: The Insight Lead
**Subject:** Interesting data point for [Company]

[First Name],

We analyzed [relevant data] across [industry] and found [specific insight that affects them].

We help [ICP] act on this. Worth 15 minutes?

[Name]

---

### Template 5: The Follow-Up (Day 4)
**Subject:** Re: [original subject]

[First Name],

Just bumping this up — didn't want it to get buried.

Still think [outcome] could be valuable for [Company]. Happy to send a quick loom if a call isn't the right next step.

[Name]

---

## What to Never Do

- Open with "I hope this email finds you well"
- Pitch features before establishing relevance
- Ask for a 30+ minute meeting on the first email
- Send the same email to 500 people without personalization signals

---

## Generate Cold Email Scripts with Scriva

Scriva generates cold email scripts tailored to your topic, tone, and audience — in under 10 seconds.
    `,
  },

  "youtube-algorithm-2025": {
    title: "YouTube Algorithm 2025: What Actually Gets Videos Recommended",
    desc: "The signals that matter in 2025 — and how to write scripts that hit every one of them.",
    tag: "YouTube",
    date: "May 6, 2025",
    readTime: "7 min read",
    content: `
## The Algorithm Is Not a Mystery

YouTube's algorithm is a recommendation engine with one goal: keep people watching. Every signal it tracks is a proxy for that goal.

---

## The 4 Metrics That Drive Recommendations in 2025

### 1. Click-Through Rate (CTR)
Your thumbnail and title determine whether anyone clicks. Target CTR: 4–8% for established channels, 2–4% for new channels.

**Script impact:** Your title is often your hook. If it's vague or generic, CTR suffers — and the algorithm stops recommending regardless of content quality.

### 2. Average View Duration (AVD)
How long people watch, measured in minutes. Not percentage — total minutes.

**Script impact:** A tight script with no dead air keeps AVD high. Every section transition should earn the viewer's continued attention.

### 3. Audience Retention (%)
The percentage of your video that average viewers watch. YouTube specifically looks at the 30% and 50% marks.

**Script impact:** A re-hook at the 30-second mark and a mid-video retention loop (tease of upcoming content) directly impacts these numbers.

### 4. Satisfaction Signals
Likes, comments, shares, and "not interested" dismissals. Comments and shares are weighted heavily.

**Script impact:** Building a comment prompt into your script ("Drop a comment below — [specific question]") consistently drives engagement spikes.

---

## The Script Structure That Hits Every Signal

\`\`\`
HOOK (0–3s)     → Drives CTR and first-5-seconds retention
OPEN LOOP (3–15s) → Creates curiosity that keeps people watching
VALUE (15s–X)   → Delivers on the promise; maintains AVD
RE-HOOK (30s)   → Prevents the 30% drop-off
MID LOOP (50%)  → Teases what's coming; holds the 50% mark
ENGAGEMENT CTA  → "Comment below..." drives satisfaction signals
END CTA         → Subscribe + next video recommendation
\`\`\`

---

## What Doesn't Matter (Anymore)

- **Tags:** Minimal impact since 2022. Titles and descriptions carry the keyword weight.
- **Upload time:** Matters less than it used to. Consistency matters more.
- **Video length for its own sake:** Longer videos aren't rewarded — watched minutes are. A tight 6-minute video beats a padded 15-minute video.

---

## The 2025 Algorithm Shift: Topic Authority

YouTube increasingly groups channels by topic and recommends them to viewers who've watched similar content. This means:

- Posting in the same niche consistently builds topic authority
- Covering the same topic from multiple angles (list, how-to, story, comparison) captures the full search surface
- Collaborating with other channels in your niche gets you in front of their audience

---

## Write Scripts That Work With the Algorithm

The algorithm rewards retention — and retention comes from structure. Scriva builds algorithm-optimized script structure into every output: hooks, re-hooks, retention loops, and engagement CTAs are standard.

Generate your first algorithm-optimized script free.
    `,
  },

  "script-writing-tips-beginners": {
    title: "Script Writing Tips for Beginners: 10 Rules That Separate Good Scripts from Bad",
    desc: "The fundamentals that professional scriptwriters follow — and that beginners skip. Master these before anything else.",
    tag: "YouTube",
    date: "May 3, 2025",
    readTime: "6 min read",
    content: `
## Why Most First Scripts Fail

First scripts fail for predictable reasons: they start too slow, explain too much, and end without direction. These 10 rules fix all of that.

---

## Rule 1: Start With the Payoff, Not the Setup

Amateurs explain context before delivering value. Professionals lead with the result.

**Bad:** "Hey guys, welcome back. Today I want to talk about something I've been thinking about for a while..."

**Good:** "Your first 30 seconds determine whether anyone watches. Here's the exact formula."

---

## Rule 2: Write for the Ear, Not the Eye

Scripts are performed, not read. Read every line aloud. If it sounds unnatural spoken, rewrite it.

- Short sentences work better than long ones
- Contractions (you're, it's, don't) sound more natural
- One idea per sentence

---

## Rule 3: Every Sentence Must Earn Its Place

Cut anything that doesn't advance the story or deliver value. If a sentence could be removed without the viewer noticing, remove it.

---

## Rule 4: Use the Rule of Three

Three points are easier to remember than two or four. Structure your content in threes: three steps, three mistakes, three tips. The pattern creates expectation and satisfaction.

---

## Rule 5: Transitions Are Load-Bearing

Weak transitions cause drop-off. Strong transitions create momentum.

**Weak:** "Okay, so next..."
**Strong:** "Here's where most people make their biggest mistake..."

---

## Rule 6: Open Loops Keep People Watching

An open loop is a question or promise that you haven't answered yet. Viewers stay to close the loop.

> "By the end of this, you'll know the one thing that separates scripts that convert from scripts that don't. But first..."

---

## Rule 7: Never Bury the CTA

Most beginners put the call-to-action at the very end, after viewer interest has dropped. Put a micro-CTA (like, subscribe, comment) in the middle — where retention is still high.

---

## Rule 8: Script the Pauses

Mark where you'll pause for emphasis. A well-placed pause before a key point is more powerful than any adjective.

> "The biggest mistake creators make with scripting is... [pause] ...writing for themselves instead of their audience."

---

## Rule 9: Know Your One Thing

Every script should have one central idea. If you can't summarize your script in one sentence, it's not focused enough.

**Test:** "This script will teach viewers [one specific thing] so they can [specific outcome]."

---

## Rule 10: The Last Line Matters as Much as the First

The last line is what viewers remember. End with a clear CTA, a memorable statement, or a forward tease — never trail off.

**Weak ending:** "Anyway, that's all I've got. Hope that helped. See you next time."

**Strong ending:** "Start with Rule 1 on your next script. You'll feel the difference in your first read-through. I'll see you in the next one."

---

## Practice With Structure

The fastest way to improve is to write with a framework — not a blank page. Scriva gives you the framework. You fill in your expertise.

Generate a structured script in 10 seconds — free.
    `,
  },

  "how-to-make-money-youtube-scripts": {
    title: "How Better Scripts Help You Make More Money on YouTube",
    desc: "The direct link between script quality, retention, ad revenue, and sponsorship rates — with the data to back it up.",
    tag: "YouTube",
    date: "Apr 28, 2025",
    readTime: "7 min read",
    content: `
## The Script → Revenue Connection

Most creators think about scripts as a creative tool. The smartest creators treat them as a revenue lever.

Here's the direct chain: **better scripts → higher retention → more recommendations → more views → more revenue**.

---

## How YouTube Pays You (And What Scripts Control)

### Ad Revenue (CPM × Views)
YouTube pays based on ad impressions. More views = more revenue. But the algorithm only recommends videos with strong retention signals — which come from script quality.

**Script impact:** A re-hook at 30 seconds, mid-video retention loops, and tight pacing directly improve the metrics that trigger recommendations.

### RPM (Revenue Per Mille)
Your actual earnings per 1,000 views. Higher RPM comes from:
- Viewers watching more of the video (more ad breaks triggered)
- Viewers in high-CPM niches (finance, business, tech, software)

**Script impact:** Longer average view duration = more ad breaks = higher RPM. A 6-minute video where viewers watch 5 minutes earns significantly more than a 10-minute video where they drop off at 3.

---

## The Sponsorship Multiplier

Sponsors pay based on your CPM, niche, and engagement rate — not just subscriber count. A channel with 20k engaged subscribers in the finance niche can command $2,000–$5,000 per integration.

**What sponsors look at:**
- Average view duration (scripts control this)
- Comment engagement (scripts can prompt this)
- Audience demographics (content niche determines this)

The best sponsor reads are scripted — not winging it. A scripted sponsor integration that fits naturally into the content performs 2–3× better than a bolted-on read.

---

## The Script Quality → Views Data

Internal data from channels using structured scripts vs. unscripted content consistently shows:
- 30–45% higher average view duration with structured scripts
- 2× higher comment rates when a specific comment prompt is included
- 15–25% higher CTR when the title mirrors the script's opening hook

---

## 5 Script Elements That Directly Increase Revenue

### 1. The Hook (Drives CTR)
A stronger hook = higher CTR = more impressions = more ad revenue.

### 2. The Re-Hook at 30 Seconds (Drives Retention)
Prevents the biggest drop-off point. Every percentage point of retention improvement compounds across your library.

### 3. The Comment Prompt (Drives Engagement)
> "Drop a comment — [specific question related to the video]."
Higher comment rates signal quality to the algorithm.

### 4. The End Screen CTA (Drives Watch Time)
> "Watch this next — it continues exactly where this left off."
Keeping viewers in your channel increases your session watch time, which the algorithm rewards.

### 5. The Sponsor Integration (Drives Sponsor Revenue)
A scripted, story-led sponsor read outperforms a straight product pitch. Weave the sponsor into a relevant story before the pitch.

---

## How to Start Writing Revenue-Optimized Scripts

1. Pick a high-CPM topic in your niche
2. Structure it with: Hook → Re-hook → Value → Engagement CTA → End CTA
3. Keep it tight — no padding
4. Include one sponsor slot naturally in the middle third

Or generate a structured script in 10 seconds with Scriva — free.
    `,
  },
};

type Props = { params: Promise<{ slug: string }> };

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://scriva.online";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.desc,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.desc,
      url: `${APP_URL}/blog/${slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: `${APP_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-slate-200">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-purple-500/40 pl-4 py-1 my-3 text-slate-300 italic text-sm">
          {line.replace("> ", "")}
        </blockquote>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="border-white/8 my-8" />);
    } else if (line.match(/^\d+\.\s/) || line.startsWith("- ")) {
      const listLines: string[] = [];
      while (i < lines.length && (lines[i].match(/^\d+\.\s/) || lines[i].startsWith("- "))) {
        listLines.push(lines[i]);
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-1.5 my-3 pl-1">
          {listLines.map((l, j) => (
            <li key={j} className="flex gap-2 text-sm text-slate-400">
              <span className="text-purple-400 mt-0.5 flex-shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: l.replace(/^[\d]+\.\s|-\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-200'>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("| ")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("| ")) {
        if (!lines[i].match(/^\|[-| ]+\|$/)) tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.map((r) => r.split("|").filter((c) => c.trim()));
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                {rows[0]?.map((cell, j) => (
                  <th key={j} className="px-3 py-2 text-slate-300 font-semibold border-b border-white/8">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-white/5">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-slate-400">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.trim() !== "") {
      elements.push(
        <p key={i} className="text-slate-400 leading-relaxed mb-3 text-sm"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-200'>$1</strong>").replace(/\[(.*?)\]\((https:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer sponsored" class="text-purple-400 hover:text-purple-300 underline underline-offset-2">$1</a>') }}
        />
      );
    }
    i++;
  }
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.desc,
            datePublished: new Date(post.date).toISOString(),
            url: `${APP_URL}/blog/${slug}`,
            author: { "@type": "Organization", name: "Scriva", url: APP_URL },
            publisher: {
              "@type": "Organization",
              name: "Scriva",
              url: APP_URL,
              logo: { "@type": "ImageObject", url: `${APP_URL}/logo.png` },
            },
            image: `${APP_URL}/og-image.png`,
          }),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-8">
            <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-500 truncate">{post.title}</span>
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs border rounded-full px-2.5 py-0.5 font-medium text-purple-300 bg-purple-500/10 border-purple-500/20">
                {post.tag}
              </span>
              <span className="text-xs text-slate-600">{post.readTime}</span>
              <span className="text-xs text-slate-600">·</span>
              <span className="text-xs text-slate-600">{post.date}</span>
            </div>
            <h1 className="text-3xl font-bold text-white leading-snug mb-3">{post.title}</h1>
            <p className="text-slate-400">{post.desc}</p>
          </header>

          <hr className="border-white/8 mb-8" />

          {/* Content */}
          <article>{renderContent(post.content)}</article>

          {/* Related guides */}
          <div className="mt-12 mb-8">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Related Guides
            </h2>
            <div className="flex flex-col gap-2">
              {Object.entries(POSTS)
                .filter(([s]) => s !== slug)
                .slice(0, 3)
                .map(([s, p]) => (
                  <Link
                    key={s}
                    href={`/blog/${s}`}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    → {p.title}
                  </Link>
                ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bezel-card p-8 text-center">
            <p className="text-xs text-slate-600 mb-2 uppercase tracking-wider">Ready to skip the manual work?</p>
            <h2 className="text-2xl font-bold mb-2">Generate this script in 10 seconds</h2>
            <p className="text-slate-400 text-sm mb-6">
              Scriva AI writes {post.tag} scripts with proven structure — tailored to your topic, tone, and audience.
            </p>
            <Link href="/sign-up" className="btn-primary inline-flex">
              Try Scriva Free →
            </Link>
          </div>

          {/* Back */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-400 transition-colors">
              ← Back to all guides
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
