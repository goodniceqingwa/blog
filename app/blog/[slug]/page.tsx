import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { CodeTag } from "@/components/ui/CodeTag";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | QingWaaa`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-text-muted hover:text-accent-purple transition-colors mb-8 inline-block font-mono text-sm"
        >
          <span className="text-term-green">$ </span>
          cd ../blog
        </Link>

        <header className="mb-12">
          {/* Breadcrumb */}
          <div className="font-mono text-xs text-text-muted mb-4 break-all">
            <span className="text-term-green">$ </span>
            cat ~/blog/{post.categories[0] ?? "uncategorized"}/{post.slug}.mdx
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-text-muted text-sm font-mono">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.categories.map((cat) => (
              <CodeTag key={cat}>{cat}</CodeTag>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-glass-border text-text-muted font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-custom">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
