import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Script Writing Guides & Tips",
  description:
    "Free guides on writing YouTube scripts, TikTok hooks, VSL copy, and ad scripts. Learn proven frameworks used by top creators.",
};

const POSTS = [
  {
    slug: "youtube-script-template",
    title: "The Ultimate YouTube Script Template (That Actually Gets Views)",
    desc: "A battle-tested 7-part framework used by 100k+ creators to hook viewers in 3 seconds and keep them watching.",
    tag: "YouTube",
    readTime: "6 min",
    date: "Apr 2, 2025",
    index: "001",
  },
  {
    slug: "tiktok-hook-examples",
    title: "50 TikTok Hook Examples That Stop the Scroll",
    desc: "Swipe-worthy opening lines across every niche — from finance to fitness. Copy, adapt, and go viral.",
    tag: "TikTok",
    readTime: "8 min",
    date: "Mar 28, 2025",
    index: "002",
  },
  {
    slug: "how-to-write-vsl-script",
    title: "How to Write a VSL Script That Converts (Step-by-Step)",
    desc: "The exact structure behind VSLs that convert at 3–8%. Includes a fill-in-the-blank template you can use today.",
    tag: "VSL",
    readTime: "10 min",
    date: "Mar 20, 2025",
    index: "003",
  },
  {
    slug: "ai-script-generator-guide",
    title: "How to Use AI to Write Scripts 10x Faster (Without Sounding Robotic)",
    desc: "The prompting strategies that separate generic AI output from scripts that actually convert.",
    tag: "AI Tools",
    readTime: "7 min",
    date: "Mar 14, 2025",
    index: "004",
  },
  {
    slug: "podcast-script-outline",
    title: "Podcast Script Outline: How to Sound Natural & Keep Listeners Hooked",
    desc: "Most podcasters wing it — here's how to script episodes that feel spontaneous but never boring.",
    tag: "Podcast",
    readTime: "5 min",
    date: "Mar 7, 2025",
    index: "005",
  },
  {
    slug: "facebook-ad-script",
    title: "Facebook & Instagram Ad Scripts: The 3-Part Formula That Sells",
    desc: "Hook → Problem → Solution. Why this works for cold traffic and how to write it in under 10 minutes.",
    tag: "Paid Ads",
    readTime: "6 min",
    date: "Feb 28, 2025",
    index: "006",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100svh",
          background: "var(--paper)",
          paddingTop: "84px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "2rem",
          }}
        >
          {/* Page header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "1px solid rgba(13,13,13,0.15)",
              paddingBlock: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: "var(--red)",
              }}
            >
              BLOG
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
              }}
            >
              {POSTS.length} articles · Script writing guides &amp; frameworks
            </span>
          </div>

          {/* Big headline */}
          <div
            style={{
              borderBottom: "1px solid rgba(13,13,13,0.15)",
              paddingBlock: "2.5rem",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "var(--ink)",
              }}
            >
              Script Writing<br />
              <span style={{ color: "var(--red)" }}>Guides</span>
            </h1>
          </div>

          {/* Post list — typographic table */}
          <style>{`
            .blog-row {
              display: grid;
              grid-template-columns: 60px 120px 1fr auto;
              align-items: start;
              gap: 2rem;
              padding: 1.5rem 1rem;
              border-bottom: 1px solid rgba(13,13,13,0.1);
              text-decoration: none;
              color: inherit;
              transition: background 0.15s ease;
            }
            .blog-row:hover {
              background: var(--ink);
              color: var(--paper);
            }
            .blog-row:hover .blog-tag { color: var(--red); border-color: var(--red); }
            .blog-row:hover .blog-meta { color: rgba(244,241,235,0.4); }
            .blog-row:hover .blog-desc { color: rgba(244,241,235,0.55); }
            .blog-row:hover .blog-arrow { color: var(--red); }
            @media (max-width: 640px) {
              .blog-row { grid-template-columns: 40px 1fr; gap: 1rem; }
              .blog-row-tag-col { display: none; }
            }
          `}</style>

          <div style={{ borderTop: "1px solid rgba(13,13,13,0.15)" }}>
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-row"
              >
                {/* Index */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    color: "var(--ink-faint)",
                    paddingTop: "0.2rem",
                  }}
                >
                  {post.index}
                </span>

                {/* Tag col */}
                <span
                  className="blog-tag blog-row-tag-col"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    border: "1px solid rgba(13,13,13,0.2)",
                    padding: "0.25rem 0.6rem",
                    alignSelf: "start",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                >
                  {post.tag}
                </span>

                {/* Content */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                      lineHeight: 0.95,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      marginBottom: "0.6rem",
                      color: "inherit",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="blog-desc"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                    }}
                  >
                    {post.desc}
                  </p>
                </div>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "0.4rem",
                    paddingTop: "0.2rem",
                  }}
                >
                  <span
                    className="blog-meta"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.readTime}
                  </span>
                  <span
                    className="blog-meta"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.06em",
                      color: "var(--ink-faint)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.date}
                  </span>
                  <svg
                    className="blog-arrow"
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ color: "var(--ink-faint)", marginTop: "0.25rem" }}
                  >
                    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA block */}
          <div
            style={{
              borderTop: "2px solid var(--red)",
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "3rem 2.5rem",
              marginBlock: "3rem",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "var(--paper)",
                  marginBottom: "0.75rem",
                }}
              >
                Stop writing scripts manually.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  lineHeight: 1.7,
                  color: "rgba(244,241,235,0.55)",
                }}
              >
                Generate a production-ready script in 10 seconds with Scriva AI.
              </p>
            </div>
            <Link
              href="/sign-up"
              className="btn-red"
              style={{ whiteSpace: "nowrap" }}
            >
              Try free
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
