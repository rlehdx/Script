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
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.desc,
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
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-200'>$1</strong>").replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer sponsored" class="text-purple-400 hover:text-purple-300 underline underline-offset-2">$1</a>') }}
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
