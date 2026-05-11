"use client";

import { useState } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  date: string;
  readTime: string;
}

interface Props {
  posts: Post[];
  allTags: string[];
  tagColors: Record<string, string>;
}

export default function BlogList({ posts, allTags, tagColors }: Props) {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tag === activeTag);

  return (
    <div>
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
              activeTag === tag
                ? "bg-white/10 border-white/20 text-white"
                : "border-white/8 text-slate-500 hover:text-slate-300 hover:border-white/15"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div className="flex flex-col gap-px bg-white/5 rounded-sm overflow-hidden">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-[#0A0A0F] hover:bg-white/[0.03] transition-colors p-6 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${
                  tagColors[post.tag] ?? "text-purple-300 bg-purple-500/10 border-purple-500/20"
                }`}
              >
                {post.tag}
              </span>
              <span className="text-xs text-slate-600">{post.readTime}</span>
              <span className="text-xs text-slate-600">·</span>
              <span className="text-xs text-slate-600">{post.date}</span>
            </div>
            <h2 className="text-base font-semibold text-white group-hover:text-slate-200 transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{post.desc}</p>
            <span className="text-xs text-purple-400 group-hover:text-purple-300 transition-colors mt-1">
              Read guide →
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-12">No posts in this category yet.</p>
      )}
    </div>
  );
}
