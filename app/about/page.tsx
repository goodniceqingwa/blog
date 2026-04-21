"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeTag } from "@/components/ui/CodeTag";
import { timeline, skills } from "@/data/about";

export default function AboutPage() {
  const langs = skills.filter((s) => s.category === "language");
  const frameworks = skills.filter((s) => s.category === "framework");
  const tools = skills.filter((s) => s.category === "tools");

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="font-mono text-xs text-text-muted mb-4 text-center">
            <span className="text-term-green">$ </span>
            cat ~/about.md
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary text-center mb-16">
            关于我
          </h1>
        </ScrollReveal>

        {/* Bio as code object */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
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
            <GlassCard fileTag="profile.ts" hover={false}>
              <pre className="font-mono text-sm text-text-muted overflow-x-auto">
                <code>
                  <span className="text-term-red">const</span>{" "}
                  <span className="text-accent-cyan">profile</span>{" "}
                  <span className="text-text-muted">= {"{"}</span>
                  {"\n  "}
                  <span className="text-text-muted">name:</span>{" "}
                  <span className="text-term-yellow">&quot;QingWaaa&quot;</span>,
                  {"\n  "}
                  <span className="text-text-muted">role:</span>{" "}
                  <span className="text-term-yellow">&quot;Developer&quot;</span>,
                  {"\n  "}
                  <span className="text-text-muted">focus:</span> [
                  {"\n    "}
                  <span className="text-term-yellow">&quot;Robotics / ROS2&quot;</span>,
                  {"\n    "}
                  <span className="text-term-yellow">&quot;AI / LLM&quot;</span>,
                  {"\n    "}
                  <span className="text-term-yellow">&quot;Full-stack Web&quot;</span>,
                  {"\n  "}
                  ],
                  {"\n  "}
                  <span className="text-text-muted">motto:</span>{" "}
                  <span className="text-term-yellow">
                    &quot;Build things that matter.&quot;
                  </span>
                  ,
                  {"\n"}
                  <span className="text-text-muted">{"}"};</span>
                </code>
              </pre>
            </GlassCard>
            <p className="text-text-muted mt-6 leading-relaxed text-sm">
              热爱探索的开发者。关注机器人、AI
              与全栈开发的交叉领域，喜欢用技术解决真实工程问题，并把学习过程记录成文章沉淀下来。
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline as git log */}
        <ScrollReveal>
          <div className="font-mono text-xs text-text-muted mb-6 text-center">
            <span className="text-term-green">$ </span>
            git log --oneline --all
          </div>
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-12">
            历程
          </h2>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto mb-24 space-y-4">
          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.12}>
              <GlassCard lineNumber hover={false}>
                <div className="font-mono text-xs text-term-yellow mb-2">
                  commit {item.year}
                </div>
                <div className="font-mono text-xs text-text-muted mb-1">
                  <span className="text-term-green">Author:</span> QingWaaa{" "}
                  <span className="text-text-muted">&lt;dev@qingwaaa.top&gt;</span>
                </div>
                <div className="font-mono text-xs text-text-muted mb-3">
                  <span className="text-term-green">Date:</span> {item.year}
                </div>
                <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills grouped */}
        <ScrollReveal>
          <div className="font-mono text-xs text-text-muted mb-6 text-center">
            <span className="text-term-green">$ </span>
            ls -la ~/skills/
          </div>
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-12">
            技能栈
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { title: "language", color: "text-term-red", items: langs },
            { title: "framework", color: "text-accent-cyan", items: frameworks },
            { title: "tools", color: "text-term-yellow", items: tools },
          ].map(({ title, color, items }, groupIdx) => (
            <ScrollReveal key={title} delay={groupIdx * 0.1}>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`font-mono text-sm ${color} shrink-0 w-28`}
                >
                  <span className="text-term-green">&gt; </span>
                  {title}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 16px rgba(160, 32, 240, 0.4)",
                      }}
                    >
                      <CodeTag>{skill.name}</CodeTag>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
