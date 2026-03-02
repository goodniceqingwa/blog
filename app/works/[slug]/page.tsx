import { works, getWorkBySlug } from "@/data/works";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 16 uses async params — handle synchronously via works array
  return {
    title: "作品详情 | QingWaaa",
    description: "QingWaaa 的同人艺术作品",
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/works"
          className="text-text-muted hover:text-accent-purple transition-colors mb-8 inline-block"
        >
          ← 返回作品集
        </Link>

        <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-contain bg-bg-deep"
            sizes="100vw"
            priority
          />
        </div>

        <span className="text-sm text-accent-purple font-medium uppercase tracking-wider">
          {work.categoryLabel}
        </span>
        <h1 className="text-4xl font-heading font-bold text-text-primary mt-2 mb-4">
          {work.title}
        </h1>
        <p className="text-text-secondary mb-6">{work.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs glass text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-text-muted text-sm">{work.date}</p>
      </div>
    </section>
  );
}
