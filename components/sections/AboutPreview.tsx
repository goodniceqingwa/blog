"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="py-24 px-6 bg-bg-deep">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Avatar */}
        <ScrollReveal direction="left">
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan animate-pulse-glow" />
            <div className="absolute inset-1 rounded-full bg-bg-deep" />
            <div className="absolute inset-3 rounded-full bg-bg-mid overflow-hidden flex items-center justify-center text-text-muted text-6xl">
              🐸
            </div>
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal direction="right">
          <h2 className="text-4xl font-heading font-bold text-text-primary mb-6">
            关于我
          </h2>
          <p className="text-text-secondary mb-4 leading-relaxed">
            大家好，我是 QingWaaa，一名数字艺术爱好者和同人画师。
          </p>
          <p className="text-text-muted mb-8 leading-relaxed">
            我热爱用数字工具创作，主要围绕 Invader Zim、South Park、Stranger
            Things 等我喜欢的动画和影视作品进行同人创作。每一幅作品都倾注了我对角色和故事的理解与热爱。
          </p>
          <Button href="/about" variant="outline">
            了解更多 →
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
