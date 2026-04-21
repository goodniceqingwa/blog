import { getAllPosts, getAllCategories } from "@/lib/mdx";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const metadata = {
  title: "博客 | QingWaaa",
  description: "QingWaaa 的博客文章",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

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

        <BlogListClient posts={posts} categories={categories} />
      </div>
    </section>
  );
}
