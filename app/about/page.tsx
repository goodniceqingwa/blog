"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { timeline, skills } from "@/data/about";

export default function AboutPage() {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary text-center mb-16">
            关于我
          </h1>
        </ScrollReveal>

        {/* Bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <ScrollReveal direction="left">
            <div className="relative mx-auto w-64 h-64">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan animate-pulse-glow" />
              <div className="absolute inset-1 rounded-full bg-bg-deepest" />
              <div className="absolute inset-3 rounded-full bg-bg-mid overflow-hidden flex items-center justify-center text-6xl">
                🐸
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              QingWaaa
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              我是一名数字艺术爱好者，热衷于为我喜欢的动画和影视作品创作同人艺术。
            </p>
            <p className="text-text-muted leading-relaxed">
              从 Invader Zim 的外星入侵到 South Park 的荒诞幽默，再到 Stranger
              Things
              的暗黑奇幻，每部作品都激发了我独特的创作灵感。
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <ScrollReveal>
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-12">
            创作历程
          </h2>
        </ScrollReveal>

        <div className="relative max-w-2xl mx-auto mb-24">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-accent-purple/20 -translate-x-1/2" />

          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.15}>
              <div
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent-purple -translate-x-1/2 mt-2 glow-purple" />

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:pl-12"
                  }`}
                >
                  <span className="text-accent-purple font-mono text-sm">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-text-primary mt-1">
                    {item.title}
                  </h3>
                  <p className="text-text-muted mt-2">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills */}
        <ScrollReveal>
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-8">
            技能 & 兴趣
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.05}>
              <motion.span
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(160, 32, 240, 0.4)",
                }}
                className={`px-5 py-2 rounded-full text-sm cursor-default transition-colors ${
                  skill.category === "language"
                    ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                    : skill.category === "framework"
                    ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                    : "glass text-text-secondary border border-glass-border"
                }`}
              >
                {skill.name}
              </motion.span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
