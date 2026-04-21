"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeTag } from "@/components/ui/CodeTag";
import { CategoryPill } from "@/components/blog/CategoryPill";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/mdx";

interface BlogListClientProps {
  posts: BlogPost[];
  categories: { name: string; count: number }[];
}

export function BlogListClient({
  posts,
  categories,
}: BlogListClientProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const totalCount = posts.length;
  const filtered = selected
    ? posts.filter((p) => p.categories.includes(selected))
    : posts;

  return (
    <>
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="text-term-green font-mono text-sm self-center mr-2">
          &gt; category:
        </span>
        <CategoryPill
          name="全部"
          count={totalCount}
          active={selected === null}
          onClick={() => setSelected(null)}
        />
        {categories.map((cat) => (
          <CategoryPill
            key={cat.name}
            name={cat.name}
            count={cat.count}
            active={selected === cat.name}
            onClick={() => setSelected(cat.name)}
          />
        ))}
      </div>

      {/* Post list */}
      <div className="space-y-6">
        {filtered.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`}>
              <GlassCard className="group" lineNumber fileTag=".mdx">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.categories.map((cat) => (
                        <CodeTag key={cat}>{cat}</CodeTag>
                      ))}
                    </div>
                    <h2 className="text-xl font-heading font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                      {post.title}
                    </h2>
                    {post.summary && (
                      <p className="text-text-muted mt-2 line-clamp-2">
                        {post.summary}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-glass-border text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-text-muted text-xs whitespace-nowrap flex flex-col items-end font-mono">
                    <span>{formatDate(post.date)}</span>
                    <span className="mt-1">{post.readingTime}</span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </ScrollReveal>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted font-mono text-sm">
            <p>// no posts in this category</p>
          </div>
        )}
      </div>
    </>
  );
}
