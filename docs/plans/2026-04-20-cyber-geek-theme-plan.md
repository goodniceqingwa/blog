# 赛博极客主题 + 博客分类 — 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 全站叠加赛博极客程序员视觉元素 + 博客页增加分类 Pill 筛选功能。

**Architecture:** 渐进式改造——先扩展 design system（CSS 变量 + utility），再改原子组件（GlassCard、CodeTag、TerminalPrompt），最后逐页改造。博客分类拆成 Server 壳 + Client 筛选器，SSG 无损。

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Framer Motion, TypeScript。

---

### Task 1: 扩展 Design System — CSS 变量 + Utility

**Files:**
- Modify: `styles/globals.css`

**Step 1: 在 `:root` 块中追加三个终端语义色变量**

在 `styles/globals.css` 第 20 行 `--glass-border` 之后追加：

```css
  --term-green: #7ee787;
  --term-yellow: #d2a8ff;
  --term-red: #ff7b72;
```

**Step 2: 在 `.light` 块中追加对应的浅色模式值**

在 `.light` 块 `--glass-border` 之后追加：

```css
  --term-green: #2ea043;
  --term-yellow: #8957e5;
  --term-red: #cf222e;
```

**Step 3: 在 `@theme inline` 块中注册 Tailwind 色令牌**

在 `--color-glass-border` 行之后追加：

```css
  --color-term-green: var(--term-green);
  --color-term-yellow: var(--term-yellow);
  --color-term-red: var(--term-red);
```

**Step 4: 在 `@theme inline` 块中追加动画定义**

在 `--animate-float` 行之后追加：

```css
  --animate-caret-blink: caret-blink 1s step-end infinite;
```

**Step 5: 在 `@keyframes float` 之后追加 `caret-blink` 关键帧**

```css
@keyframes caret-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

**Step 6: 在 `@utility text-gradient` 之后追加四个新 utility**

```css
@utility terminal-prompt {
  &::before {
    content: "$ ";
    color: var(--term-green);
    font-family: var(--font-mono);
    font-weight: 700;
  }
  font-family: var(--font-mono);
}

@utility line-number {
  border-left: 4px solid #30363d;
  padding-left: 1rem;
}

@utility code-tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--accent-purple);
  border-radius: 0.25rem;
  color: var(--accent-purple);
  background: rgba(160, 32, 240, 0.08);
}

@utility caret-blink {
  animation: caret-blink 1s step-end infinite;
}
```

**Step 7: 验证构建**

Run: `npx next build 2>&1 | tail -5`
Expected: 构建成功无 CSS 报错。

---

### Task 2: 扩展 GlassCard — 行号条 + 文件扩展名标签

**Files:**
- Modify: `components/ui/GlassCard.tsx`

**Step 1: 扩展 Props 接口 + 实现**

将 `components/ui/GlassCard.tsx` 整体替换为：

```tsx
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  lineNumber?: boolean;
  fileTag?: string;
}

export function GlassCard({
  children,
  className,
  hover = true,
  lineNumber,
  fileTag,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 relative",
        hover && "glass-hover",
        lineNumber && "line-number",
        className
      )}
    >
      {fileTag && (
        <span className="absolute top-2 right-3 text-xs font-mono text-text-muted/50 select-none">
          {fileTag}
        </span>
      )}
      {children}
    </div>
  );
}
```

**Step 2: 验证现有调用不受影响**

现有代码中 `GlassCard` 调用都不传 `lineNumber` / `fileTag`，行为完全不变。快速 grep 确认：

Run: `grep -rn "GlassCard" components/ app/ --include="*.tsx" | grep -v "GlassCard.tsx"`
Expected: 所有调用仍只传 `className` 和 `children`。

---

### Task 3: 新建 TerminalPrompt 组件

**Files:**
- Create: `components/ui/TerminalPrompt.tsx`

**Step 1: 创建组件**

```tsx
import { cn } from "@/lib/utils";

interface TerminalPromptProps {
  children?: React.ReactNode;
  command?: string;
  className?: string;
}

export function TerminalPrompt({
  children,
  command,
  className,
}: TerminalPromptProps) {
  return (
    <span className={cn("font-mono text-sm", className)}>
      <span className="text-term-green font-bold">$ </span>
      {command && (
        <span className="text-text-secondary">{command}</span>
      )}
      {children}
    </span>
  );
}
```

---

### Task 4: 新建 CodeTag 组件

**Files:**
- Create: `components/ui/CodeTag.tsx`

**Step 1: 创建组件**

```tsx
import { cn } from "@/lib/utils";

interface CodeTagProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeTag({ children, className }: CodeTagProps) {
  return (
    <span className={cn("code-tag", className)}>
      {"<"}
      {children}
      {" />"}
    </span>
  );
}
```

---

### Task 5: 扩展数据层 — getAllCategories

**Files:**
- Modify: `lib/mdx.ts`

**Step 1: 在文件末尾 `getPostBySlug` 之后追加函数**

```ts
export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const counter = new Map<string, number>();
  for (const p of posts) {
    for (const c of p.categories) {
      counter.set(c, (counter.get(c) ?? 0) + 1);
    }
  }
  return Array.from(counter, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
```

**Step 2: 验证构建**

Run: `npx next build 2>&1 | tail -5`
Expected: 构建成功。

---

### Task 6: 改造 Navbar — $ 提示符 + > 标记 + mono 字体

**Files:**
- Modify: `components/layout/Navbar.tsx`

**Step 1: 替换 Logo 部分**

将第 37-41 行的 Logo Link 替换为：

```tsx
              <Link
                href="/"
                className="font-mono text-xl font-bold text-text-primary hover:text-accent-purple transition-colors"
              >
                <span className="text-term-green">$ </span>
                qingwa@blog:~
              </Link>
```

**Step 2: 替换桌面端导航链接渲染**

将第 46-63 行的 `{navLinks.map(...)}` 整块替换为：

```tsx
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-mono text-text-muted hover:text-text-primary transition-colors py-2"
                >
                  {pathname === link.href && (
                    <span className="text-term-green mr-1">&gt;</span>
                  )}
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-purple"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
```

**Step 3: 不改移动端**

MobileMenu 和 hamburger 按钮保持原样不动。

---

### Task 7: 改造 Footer — git remote 终端形态

**Files:**
- Modify: `components/layout/Footer.tsx`

**Step 1: 整体替换 Footer 组件**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/blog", label: "博客" },
  { href: "/works", label: "项目" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-bg-deep">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Terminal-style remote listing */}
        <div className="font-mono text-sm space-y-1 mb-8">
          <p>
            <span className="text-term-green font-bold">$ </span>
            <span className="text-text-secondary">git remote -v</span>
          </p>
          <p>
            <span className="text-term-yellow">origin</span>
            <span className="text-text-muted">
              {"    "}https://github.com/goodniceqingwa{" "}
              {"(fetch)"}
            </span>
          </p>
          <p>
            <span className="text-term-yellow">qingwa</span>
            <span className="text-text-muted">
              {"    "}https://qingwaaa.top{" "}
              {"(site)"}
            </span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Nav links */}
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted text-sm font-mono hover:text-accent-purple transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <motion.a
              href="https://github.com/goodniceqingwa"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-text-muted hover:text-accent-purple hover:glow-purple transition-all"
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-glass-border text-center text-text-muted text-xs font-mono">
          <p>&copy; {new Date().getFullYear()} QingWaaa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

### Task 8: 改造 Hero — 代码字面量副标题

**Files:**
- Modify: `components/sections/Hero.tsx`

**Step 1: 替换副标题部分**

将第 34-41 行的 `<motion.p>` 块替换为代码字面量组件：

```tsx
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-10"
        >
          <pre className="font-mono text-sm md:text-base text-text-muted text-left inline-block bg-bg-deep/50 rounded-lg px-6 py-4 border border-glass-border">
            <code>
              <span className="text-term-red">const</span>{" "}
              <span className="text-accent-cyan">qingwa</span>{" "}
              <span className="text-text-muted">= {"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-text-muted">role:</span>{" "}
              <span className="text-term-yellow">"Developer"</span>,{"\n"}
              {"  "}
              <span className="text-text-muted">focus:</span>{" "}
              <span className="text-text-muted">[</span>
              <span className="text-term-yellow">"AI"</span>,{" "}
              <span className="text-term-yellow">"Robotics"</span>,{" "}
              <span className="text-term-yellow">"Full-stack"</span>
              <span className="text-text-muted">]</span>,{"\n"}
              {"  "}
              <span className="text-text-muted">typing:</span>{" "}
              <span className="text-term-yellow">"_"</span>
              <span className="caret-blink text-term-green">█</span>,{"\n"}
              <span className="text-text-muted">{"}"};</span>
            </code>
          </pre>
        </motion.div>
```

**Step 2: 移除未使用的 TextReveal 以外的导入（如有）**

确认 `TextReveal` 仍用于大标题 `QingWaaa`。其余按钮、粒子、滚动指示器不变。

---

### Task 9: 新建 CategoryPill 组件

**Files:**
- Create: `components/blog/CategoryPill.tsx`

**Step 1: 创建组件**

```tsx
"use client";

import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function CategoryPill({
  name,
  count,
  active,
  onClick,
}: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-mono text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer",
        active
          ? "border-accent-purple text-accent-purple bg-accent-purple/10"
          : "border-glass-border text-text-muted hover:border-accent-purple hover:text-accent-purple"
      )}
    >
      {active && <span className="mr-1">[</span>}
      {name}
      <span className="ml-1 opacity-60">({count})</span>
      {active && <span className="ml-0.5">]</span>}
    </button>
  );
}
```

---

### Task 10: 新建 BlogListClient 组件 + 改造博客列表页

**Files:**
- Create: `components/blog/BlogListClient.tsx`
- Modify: `app/blog/page.tsx`

**Step 1: 创建 BlogListClient**

```tsx
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
                    <div className="mb-2">
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
```

**Step 2: 改造 `app/blog/page.tsx` 为 Server 壳**

将整个文件替换为：

```tsx
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
```

---

### Task 11: 改造博客详情页 — 面包屑 + 分类 tag

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: 添加 CodeTag 导入 + 替换返回的 JSX**

在文件顶部 import 区追加：

```ts
import { CodeTag } from "@/components/ui/CodeTag";
```

将 `<article>` 内的返回内容替换为：

```tsx
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
          <div className="font-mono text-xs text-text-muted mb-4">
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
```

---

### Task 12: 验证构建

**Step 1: 完整构建**

Run: `npx next build 2>&1 | tail -20`
Expected: 构建成功，所有路由正常生成。

**Step 2: 检查静态产出**

Run: `ls out/blog/`
Expected: 8 个 slug 目录 + `index.html` 均存在。

**Step 3: 本地开发验证**

Run: `npx next dev`
手动检查：
- 首页 Hero 代码块 + 闪烁光标
- Navbar `$` 提示符 + `>` 激活标记
- Footer `git remote` 形态
- `/blog` 分类 Pill 筛选正常工作
- 文章详情页面包屑 + 分类 tag
- 明暗主题切换无色差错乱
