import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { WorksGrid } from "@/components/sections/WorksGrid";

export const metadata = {
  title: "作品集 | QingWaaa",
  description: "QingWaaa 的同人艺术作品集",
};

export default function WorksPage() {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary text-center mb-4">
            作品集
          </h1>
          <p className="text-text-muted text-center mb-16 max-w-2xl mx-auto">
            浏览我的全部同人艺术创作
          </p>
        </ScrollReveal>

        <WorksGrid />
      </div>
    </section>
  );
}
