import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "博客 | QingWaaa",
  description: "QingWaaa 的博客文章",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary text-center mb-4">
            博客
          </h1>
          <p className="text-text-muted text-center mb-16">
            技术探索与生活感悟
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <GlassCard className="group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
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
                            className="text-xs px-2 py-1 rounded-full bg-accent-purple/10 text-accent-purple"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-text-muted text-sm whitespace-nowrap flex flex-col items-end">
                      <span>{formatDate(post.date)}</span>
                      <span className="mt-1">{post.readingTime}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20 text-text-muted">
              <p className="text-lg">暂无文章</p>
              <p className="text-sm mt-2">敬请期待</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
