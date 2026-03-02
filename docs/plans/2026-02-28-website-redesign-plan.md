# QingWaaa.top 全站改版 - 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 qingwaaa.top 从 Hugo 博客改版为 Cyber-Dark 风格的个人艺术展示网站（Next.js 14 + Tailwind + Framer Motion + GSAP）。

**Architecture:** Next.js 14 App Router 静态导出，Tailwind CSS v4 暗黑模式，Framer Motion 页面过渡 + GSAP ScrollTrigger 滚动动画，tsparticles 粒子背景，MDX 博客系统。本地 TypeScript 文件管理作品数据，部署至 Vercel。

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Lenis, tsparticles, vanilla-tilt, next-mdx-remote, Shiki, react-masonry-css

---

## Task 1: 项目初始化 — 清理 Hugo + 创建 Next.js 项目

**Files:**
- Delete: Hugo 相关文件 (archetypes/, assets/, content/, data/, i18n/, layouts/, themes/, public/, hugo.toml, .gitmodules, .hugo_build.lock)
- Create: Next.js 项目根文件 (package.json, tsconfig.json, next.config.mjs, tailwind.config.ts, postcss.config.mjs)
- Create: `app/layout.tsx`, `app/page.tsx`, `styles/globals.css`

**Step 1: 备份并清理 Hugo 文件**

```bash
cd /home/qingwa/blog
# 备份 Hugo 内容（以防需要）
mkdir -p /tmp/blog-backup
cp -r content/ /tmp/blog-backup/
cp hugo.toml /tmp/blog-backup/
# 保留 .git, .github, .gitignore, docs, static/CNAME
rm -rf archetypes/ assets/ content/ data/ i18n/ layouts/ themes/ public/ hugo.toml .gitmodules .hugo_build.lock
```

**Step 2: 初始化 Next.js 项目**

```bash
cd /home/qingwa/blog
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --no-turbopack
```

注意：因为目录非空，create-next-app 可能需要 `--yes` 或手动确认覆盖。如果失败，改为在临时目录创建后移动文件：

```bash
cd /tmp && npx create-next-app@latest qingwa-blog --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --no-turbopack
# 将生成的文件复制到 /home/qingwa/blog/
cp -r /tmp/qingwa-blog/* /home/qingwa/blog/
cp /tmp/qingwa-blog/.eslintrc.json /home/qingwa/blog/ 2>/dev/null
rm -rf /tmp/qingwa-blog
```

**Step 3: 安装所有依赖**

```bash
cd /home/qingwa/blog
npm install framer-motion gsap @gsap/react lenis @studio-freight/lenis react-tsparticles tsparticles-engine tsparticles vanilla-tilt react-masonry-css next-mdx-remote shiki next-themes gray-matter reading-time
npm install -D @types/react-masonry-css
```

**Step 4: 配置 next.config.mjs**

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // 静态导出需要
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
```

**Step 5: 配置 tailwind.config.ts — 自定义色彩系统**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          deepest: "#0A0A0A",
          deep: "#1C1C1C",
          mid: "#2E2E2E",
          light: "#4A4A4A",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#E5E5E5",
          muted: "#A0A0A0",
        },
        accent: {
          purple: "#A020F0",
          cyan: "#00F5FF",
          silver: "#C0C0C0",
        },
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "var(--font-noto-sans-sc)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-noto-sans-sc)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(160, 32, 240, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(160, 32, 240, 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 6: 配置全局样式 globals.css**

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-deepest: #FFFFFF;
    --bg-deep: #F5F5F5;
    --bg-mid: #EBEBEB;
    --bg-light: #D4D4D4;
    --text-primary: #0A0A0A;
    --text-secondary: #3A3A3A;
    --text-muted: #6B6B6B;
    --accent-purple: #7B16C9;
    --accent-cyan: #00B8D4;
  }

  .dark {
    --bg-deepest: #0A0A0A;
    --bg-deep: #1C1C1C;
    --bg-mid: #2E2E2E;
    --bg-light: #4A4A4A;
    --text-primary: #FFFFFF;
    --text-secondary: #E5E5E5;
    --text-muted: #A0A0A0;
    --accent-purple: #A020F0;
    --accent-cyan: #00F5FF;
  }

  body {
    @apply bg-bg-deepest text-text-secondary antialiased;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  ::selection {
    @apply bg-accent-purple/30 text-white;
  }

  /* 自定义滚动条 */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-bg-deep;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-accent-purple/40 rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-accent-purple/60;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
  }
  .glass-hover {
    @apply hover:bg-white/10 hover:border-white/20 transition-all duration-300;
  }
  .glow-purple {
    box-shadow: 0 0 20px rgba(160, 32, 240, 0.3);
  }
  .glow-cyan {
    box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
  }
  .text-gradient {
    @apply bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent;
  }
}
```

**Step 7: 创建基础 layout.tsx 和 page.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Noto_Sans_SC } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QingWaaa | Digital Artist & Fanart Creator",
  description: "个人艺术作品集 — Invader Zim, South Park, Stranger Things 同人艺术展示",
  keywords: ["fanart", "digital art", "invader zim", "south park", "stranger things"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`}
    >
      <body className="font-body">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx (临时占位)
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-deepest">
      <h1 className="text-4xl font-heading text-text-primary">
        QingWaaa — Coming Soon
      </h1>
    </main>
  );
}
```

**Step 8: 创建 ThemeProvider**

```tsx
// components/providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
```

**Step 9: 验证项目启动**

```bash
cd /home/qingwa/blog && npm run dev
```

Expected: 本地 dev server 启动，访问 localhost:3000 可见暗色背景 + "QingWaaa — Coming Soon"。

**Step 10: 提交**

```bash
git add -A
git commit -m "feat: initialize Next.js 14 project with Tailwind + dark theme system"
```

---

## Task 2: 工具库 + Hooks — 平滑滚动 + 滚动检测 + 媒体查询

**Files:**
- Create: `lib/utils.ts`
- Create: `hooks/useSmoothScroll.ts`
- Create: `hooks/useScrollDirection.ts`
- Create: `hooks/useScrollProgress.ts`
- Create: `hooks/useMediaQuery.ts`

**Step 1: 创建工具函数**

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";

// 注意: 不使用 tailwind-merge，保持零依赖
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

安装 clsx:
```bash
npm install clsx
```

**Step 2: 创建 useSmoothScroll hook**

```typescript
// hooks/useSmoothScroll.ts
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
```

**Step 3: 创建 useScrollDirection hook**

```typescript
// hooks/useScrollDirection.ts
"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollDirection, scrollY };
}
```

**Step 4: 创建 useScrollProgress hook**

```typescript
// hooks/useScrollProgress.ts
"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}
```

**Step 5: 创建 useMediaQuery hook**

```typescript
// hooks/useMediaQuery.ts
"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// 快捷方法
export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsTablet() {
  return useMediaQuery("(max-width: 1024px)");
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
```

**Step 6: 验证编译**

```bash
cd /home/qingwa/blog && npm run build
```

Expected: 构建成功，无 TypeScript 错误。

**Step 7: 提交**

```bash
git add lib/ hooks/
git commit -m "feat: add utility library and custom hooks (scroll, media query)"
```

---

## Task 3: 布局组件 — 导航栏 + 页脚 + 自定义光标 + 暗/亮切换

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/CustomCursor.tsx`
- Create: `components/ui/ThemeToggle.tsx`
- Modify: `app/layout.tsx` — 集成导航栏 + 页脚 + 光标

**Step 1: 创建 ThemeToggle 组件**

```tsx
// components/ui/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full glass glass-hover flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {/* 月亮 */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {/* 太阳 */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </motion.div>
    </button>
  );
}
```

**Step 2: 创建 Navbar 组件**

```tsx
// components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/works", label: "作品集" },
  { href: "/blog", label: "博客" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollDirection, scrollY } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHidden = scrollDirection === "down" && scrollY > 100;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-xl font-bold text-text-primary hover:text-accent-purple transition-colors">
            QingWaaa
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-text-muted hover:text-text-primary transition-colors py-2"
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-purple"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-text-primary block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-text-primary block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-text-primary block"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu links={navLinks} onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
```

**Step 3: 创建 MobileMenu 组件**

```tsx
// components/layout/MobileMenu.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-bg-deepest/95 backdrop-blur-lg flex items-center justify-center"
    >
      <nav className="flex flex-col items-center gap-8">
        {links.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="text-3xl font-heading text-text-primary hover:text-accent-purple transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}
```

**Step 4: 创建 CustomCursor 组件**

```tsx
// components/layout/CustomCursor.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // 检测可交互元素
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);

    // 隐藏默认光标
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.body.style.cursor = "";
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* 内圈 - 紧跟鼠标 */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-purple rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0 }}
      />
      {/* 外圈 - 有延迟跟随 */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border border-accent-purple/50"
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? "rgba(160, 32, 240, 0.8)" : "rgba(160, 32, 240, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}
```

**Step 5: 创建 Footer 组件**

```tsx
// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/works", label: "作品集" },
  { href: "/blog", label: "博客" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/goodniceqingwa", icon: "github" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-deep">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
              QingWaaa
            </h3>
            <p className="text-text-muted text-sm">
              Digital Artist | Fanart Creator
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-medium mb-3">导航</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-accent-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-text-primary font-medium mb-3">社交</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-text-muted hover:text-accent-purple hover:glow-purple transition-all"
                  aria-label={social.name}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-text-muted text-sm">
          <p>Made with ❤️ & lots of coffee</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} QingWaaa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 6: 更新 layout.tsx — 集成所有布局组件**

修改 `app/layout.tsx`，在 `<body>` 中添加：

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
// ... 保留已有的字体和 ThemeProvider

// body 内容改为：
<body className="font-body">
  <ThemeProvider>
    <CustomCursor />
    <Navbar />
    <main className="pt-16">{children}</main>
    <Footer />
  </ThemeProvider>
</body>
```

**Step 7: 验证**

```bash
cd /home/qingwa/blog && npm run dev
```

Expected: 导航栏显示（毛玻璃效果），滚动时自动隐/显，暗黑/浅色切换工作，自定义光标可见，页脚渲染正确。

**Step 8: 提交**

```bash
git add components/layout/ components/ui/ThemeToggle.tsx app/layout.tsx
git commit -m "feat: add navbar, footer, custom cursor, and theme toggle"
```

---

## Task 4: 动画效果组件 — 粒子背景 + 滚动揭示 + 文字动画 + Tilt 卡片 + 光标跟踪

**Files:**
- Create: `components/effects/ParticleBackground.tsx`
- Create: `components/effects/ScrollReveal.tsx`
- Create: `components/effects/TextReveal.tsx`
- Create: `components/effects/TiltCard.tsx`
- Create: `components/effects/MouseFollowGlow.tsx`

**Step 1: 创建 ParticleBackground**

```tsx
// components/effects/ParticleBackground.tsx
"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface ParticleBackgroundProps {
  className?: string;
  variant?: "stars" | "minimal";
}

export function ParticleBackground({ className = "", variant = "stars" }: ParticleBackgroundProps) {
  const reducedMotion = useReducedMotion();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (reducedMotion) return null;

  const particleCount = variant === "stars" ? 80 : 30;

  return (
    <Particles
      className={className}
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#A020F0" },
          links: {
            color: "#A020F0",
            distance: 150,
            enable: variant === "stars",
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true, area: 800 },
            value: particleCount,
          },
          opacity: { value: { min: 0.1, max: 0.4 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}
```

**Step 2: 创建 ScrollReveal**

```tsx
// components/effects/ScrollReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion = useReducedMotion();

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 3: 创建 TextReveal**

```tsx
// components/effects/TextReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = "h1",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const chars = text.split("");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
```

**Step 4: 创建 TiltCard**

```tsx
// components/effects/TiltCard.tsx
"use client";

import { useRef, useEffect } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  glareEnable?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltMaxAngle = 8,
  glareEnable = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isMobile || reducedMotion || !ref.current) return;

    let tiltInstance: any = null;

    import("vanilla-tilt").then((VanillaTilt) => {
      if (ref.current) {
        VanillaTilt.default.init(ref.current, {
          max: tiltMaxAngle,
          speed: 400,
          glare: glareEnable,
          "max-glare": 0.15,
          perspective: 1000,
        });
        tiltInstance = (ref.current as any).vanillaTilt;
      }
    });

    return () => {
      tiltInstance?.destroy();
    };
  }, [isMobile, reducedMotion, tiltMaxAngle, glareEnable]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

**Step 5: 创建 MouseFollowGlow**

```tsx
// components/effects/MouseFollowGlow.tsx
"use client";

import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface MouseFollowGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function MouseFollowGlow({
  children,
  className = "",
  glowColor = "rgba(160, 32, 240, 0.15)",
}: MouseFollowGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {isHovered && !isMobile && (
        <div
          className="absolute pointer-events-none z-0 transition-opacity duration-300"
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
            left: position.x - 100,
            top: position.y - 100,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

**Step 6: 验证编译**

```bash
cd /home/qingwa/blog && npm run build
```

**Step 7: 提交**

```bash
git add components/effects/
git commit -m "feat: add animation effect components (particles, scroll reveal, text, tilt, glow)"
```

---

## Task 5: UI 基础组件 — GlassCard + Button + Modal

**Files:**
- Create: `components/ui/GlassCard.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Modal.tsx`

**Step 1: 创建 GlassCard**

```tsx
// components/ui/GlassCard.tsx
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div className={cn("glass rounded-xl p-6", hover && "glass-hover", className)}>
      {children}
    </div>
  );
}
```

**Step 2: 创建 Button**

```tsx
// components/ui/Button.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary: "bg-accent-purple text-white hover:bg-accent-purple/80 glow-purple",
    ghost: "bg-transparent text-text-secondary hover:bg-white/5",
    outline: "border border-accent-purple/50 text-accent-purple hover:bg-accent-purple/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const Comp = href ? "a" : "button";

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Comp
        href={href}
        onClick={onClick}
        type={href ? undefined : type}
        disabled={disabled}
        className={classes}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
```

**Step 3: 创建 Modal（作品预览弹窗）**

```tsx
// components/ui/Modal.tsx
"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full overflow-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary hover:text-accent-purple transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 4: 验证编译**

```bash
cd /home/qingwa/blog && npm run build
```

**Step 5: 提交**

```bash
git add components/ui/
git commit -m "feat: add UI base components (GlassCard, Button, Modal)"
```

---

## Task 6: 数据层 — 作品数据定义 + 示例数据

**Files:**
- Create: `data/works.ts`
- Create: `public/images/works/.gitkeep`

**Step 1: 定义作品数据类型和示例**

```typescript
// data/works.ts
export interface Work {
  slug: string;
  title: string;
  description: string;
  category: "invader-zim" | "south-park" | "stranger-things" | "other";
  categoryLabel: string;
  image: string;       // 相对于 /public 的路径
  thumbnail: string;   // 缩略图
  date: string;        // YYYY-MM-DD
  tags: string[];
  featured: boolean;
  width: number;       // 原始尺寸（用于 masonry 比例）
  height: number;
}

export const categories = [
  { id: "all", label: "全部" },
  { id: "invader-zim", label: "Invader Zim" },
  { id: "south-park", label: "South Park" },
  { id: "stranger-things", label: "Stranger Things" },
  { id: "other", label: "其他" },
] as const;

export const works: Work[] = [
  // --- 示例数据（替换为真实作品） ---
  {
    slug: "zim-invasion",
    title: "Zim's Invasion",
    description: "Invader Zim 正在执行他的地球征服计划",
    category: "invader-zim",
    categoryLabel: "Invader Zim",
    image: "/images/works/placeholder-1.jpg",
    thumbnail: "/images/works/placeholder-1.jpg",
    date: "2026-02-15",
    tags: ["invader zim", "fanart", "digital"],
    featured: true,
    width: 1200,
    height: 1600,
  },
  {
    slug: "cartman-rage",
    title: "Cartman's Fury",
    description: "South Park 经典角色 Cartman 的愤怒时刻",
    category: "south-park",
    categoryLabel: "South Park",
    image: "/images/works/placeholder-2.jpg",
    thumbnail: "/images/works/placeholder-2.jpg",
    date: "2026-02-10",
    tags: ["south park", "fanart", "character"],
    featured: true,
    width: 1400,
    height: 1000,
  },
  {
    slug: "upside-down",
    title: "The Upside Down",
    description: "Stranger Things 颠倒世界的奇幻景象",
    category: "stranger-things",
    categoryLabel: "Stranger Things",
    image: "/images/works/placeholder-3.jpg",
    thumbnail: "/images/works/placeholder-3.jpg",
    date: "2026-02-05",
    tags: ["stranger things", "fanart", "landscape"],
    featured: true,
    width: 1600,
    height: 900,
  },
  {
    slug: "gir-snacks",
    title: "GIR's Snack Time",
    description: "GIR 正在享受他最爱的零食",
    category: "invader-zim",
    categoryLabel: "Invader Zim",
    image: "/images/works/placeholder-4.jpg",
    thumbnail: "/images/works/placeholder-4.jpg",
    date: "2026-01-28",
    tags: ["invader zim", "GIR", "cute"],
    featured: false,
    width: 1000,
    height: 1200,
  },
  {
    slug: "kenny-immortal",
    title: "Kenny's Return",
    description: "Kenny 又活过来了",
    category: "south-park",
    categoryLabel: "South Park",
    image: "/images/works/placeholder-5.jpg",
    thumbnail: "/images/works/placeholder-5.jpg",
    date: "2026-01-20",
    tags: ["south park", "kenny", "comedy"],
    featured: false,
    width: 1200,
    height: 1200,
  },
  {
    slug: "eleven-power",
    title: "Eleven's Power",
    description: "Eleven 释放她的超能力",
    category: "stranger-things",
    categoryLabel: "Stranger Things",
    image: "/images/works/placeholder-6.jpg",
    thumbnail: "/images/works/placeholder-6.jpg",
    date: "2026-01-15",
    tags: ["stranger things", "eleven", "powers"],
    featured: false,
    width: 1400,
    height: 1800,
  },
];

// 获取精选作品
export function getFeaturedWorks(): Work[] {
  return works.filter((w) => w.featured);
}

// 按分类筛选
export function getWorksByCategory(category: string): Work[] {
  if (category === "all") return works;
  return works.filter((w) => w.category === category);
}

// 按 slug 获取
export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

// 搜索
export function searchWorks(query: string): Work[] {
  const q = query.toLowerCase();
  return works.filter(
    (w) =>
      w.title.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q) ||
      w.tags.some((t) => t.toLowerCase().includes(q))
  );
}
```

**Step 2: 创建占位图片目录**

```bash
mkdir -p /home/qingwa/blog/public/images/works
touch /home/qingwa/blog/public/images/works/.gitkeep
```

**Step 3: 提交**

```bash
git add data/ public/images/
git commit -m "feat: add works data layer with TypeScript definitions and sample data"
```

---

## Task 7: 首页 — Hero Section + 精选作品 + 关于预览

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `components/sections/FeaturedWorks.tsx`
- Create: `components/sections/AboutPreview.tsx`
- Modify: `app/page.tsx`

**Step 1: 创建 Hero 组件**

```tsx
// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/effects/TextReveal";
import { Button } from "@/components/ui/Button";

const ParticleBackground = dynamic(
  () => import("@/components/effects/ParticleBackground").then((m) => m.ParticleBackground),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 粒子背景 */}
      <ParticleBackground className="absolute inset-0 z-0" variant="stars" />

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deepest/50 to-bg-deepest z-[1]" />

      {/* 内容 */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <TextReveal
          text="QingWaaa"
          as="h1"
          className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-text-primary mb-6"
          staggerDelay={0.05}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl md:text-2xl text-text-muted font-body mb-10"
        >
          Digital Artist | Fanart Creator
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
          className="flex gap-4 justify-center"
        >
          <Button href="/works" variant="primary" size="lg">
            探索作品
          </Button>
          <Button href="/about" variant="outline" size="lg">
            了解更多
          </Button>
        </motion.div>

        {/* 下滑箭头 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-text-muted"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5" />
              <path d="M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: 创建 FeaturedWorks 组件**

```tsx
// components/sections/FeaturedWorks.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getFeaturedWorks } from "@/data/works";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { TiltCard } from "@/components/effects/TiltCard";
import { MouseFollowGlow } from "@/components/effects/MouseFollowGlow";
import { Button } from "@/components/ui/Button";

export function FeaturedWorks() {
  const featured = getFeaturedWorks();

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary text-center mb-4">
            精选作品
          </h2>
          <p className="text-text-muted text-center mb-16 max-w-2xl mx-auto">
            探索我最喜爱的同人艺术创作
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((work, i) => (
            <ScrollReveal key={work.slug} delay={i * 0.15}>
              <Link href={`/works/${work.slug}`}>
                <TiltCard className="group">
                  <MouseFollowGlow className="glass rounded-xl overflow-hidden">
                    {/* 图片 */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-xs text-accent-purple font-medium uppercase tracking-wider">
                          {work.categoryLabel}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-white mt-1">
                          {work.title}
                        </h3>
                        <p className="text-text-muted text-sm mt-1 line-clamp-2">
                          {work.description}
                        </p>
                      </div>
                    </div>
                  </MouseFollowGlow>
                </TiltCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/works" variant="outline" size="lg">
            查看全部作品 →
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: 创建 AboutPreview 组件**

```tsx
// components/sections/AboutPreview.tsx
"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="py-24 px-6 bg-bg-deep">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* 头像 */}
        <ScrollReveal direction="left">
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan animate-pulse-glow" />
            <div className="absolute inset-1 rounded-full bg-bg-deep" />
            <div className="absolute inset-3 rounded-full bg-bg-mid overflow-hidden flex items-center justify-center text-text-muted text-6xl">
              🐸
            </div>
          </div>
        </ScrollReveal>

        {/* 文字 */}
        <ScrollReveal direction="right">
          <h2 className="text-4xl font-heading font-bold text-text-primary mb-6">
            关于我
          </h2>
          <p className="text-text-secondary mb-4 leading-relaxed">
            大家好，我是 QingWaaa，一名数字艺术爱好者和同人画师。
          </p>
          <p className="text-text-muted mb-8 leading-relaxed">
            我热爱用数字工具创作，主要围绕 Invader Zim、South Park、Stranger Things
            等我喜欢的动画和影视作品进行同人创作。每一幅作品都倾注了我对角色和故事的理解与热爱。
          </p>
          <Button href="/about" variant="outline">
            了解更多 →
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

**Step 4: 更新首页 page.tsx**

```tsx
// app/page.tsx
import { Hero } from "@/components/sections/Hero";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
import { AboutPreview } from "@/components/sections/AboutPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <AboutPreview />
    </>
  );
}
```

**Step 5: 验证**

```bash
cd /home/qingwa/blog && npm run dev
```

Expected: 首页显示 Hero（粒子背景 + 标题动画）→ 精选作品（3列卡片）→ 关于预览。

**Step 6: 提交**

```bash
git add components/sections/ app/page.tsx
git commit -m "feat: build homepage with Hero, featured works, and about preview"
```

---

## Task 8: 作品集页面 — 瀑布流 + 筛选 + 搜索 + 预览弹窗

**Files:**
- Create: `app/works/page.tsx`
- Create: `app/works/[slug]/page.tsx`
- Create: `components/sections/WorksGrid.tsx`
- Create: `components/ui/WorkPreviewModal.tsx`

**Step 1: 创建 WorksGrid 组件（瀑布流 + 筛选 + 搜索）**

```tsx
// components/sections/WorksGrid.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { works, categories, searchWorks, getWorksByCategory, type Work } from "@/data/works";
import { TiltCard } from "@/components/effects/TiltCard";
import { MouseFollowGlow } from "@/components/effects/MouseFollowGlow";
import { WorkPreviewModal } from "@/components/ui/WorkPreviewModal";

export function WorksGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filteredWorks = useMemo(() => {
    let result = getWorksByCategory(activeCategory);
    if (searchQuery.trim()) {
      const searched = searchWorks(searchQuery);
      result = result.filter((w) => searched.some((s) => s.slug === w.slug));
    }
    return result;
  }, [activeCategory, searchQuery]);

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <>
      {/* 筛选 + 搜索 */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-accent-purple text-white glow-purple"
                  : "glass glass-hover text-text-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="搜索作品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg glass bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 border border-white/10 transition-colors"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* 瀑布流 */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work) => (
            <motion.div
              key={work.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <TiltCard className="group cursor-pointer" tiltMaxAngle={6}>
                <MouseFollowGlow
                  className="glass rounded-xl overflow-hidden"
                  glowColor="rgba(160, 32, 240, 0.12)"
                >
                  <div
                    onClick={() => setSelectedWork(work)}
                    className="relative overflow-hidden"
                    style={{ aspectRatio: `${work.width}/${work.height}` }}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs text-accent-purple font-medium uppercase tracking-wider">
                        {work.categoryLabel}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-white mt-1">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </MouseFollowGlow>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </Masonry>

      {filteredWorks.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg">没有找到匹配的作品</p>
          <p className="text-sm mt-2">试试其他关键词或分类</p>
        </div>
      )}

      {/* 预览弹窗 */}
      <WorkPreviewModal
        work={selectedWork}
        allWorks={filteredWorks}
        onClose={() => setSelectedWork(null)}
        onNavigate={setSelectedWork}
      />
    </>
  );
}
```

**Step 2: 创建 WorkPreviewModal**

```tsx
// components/ui/WorkPreviewModal.tsx
"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Work } from "@/data/works";

interface WorkPreviewModalProps {
  work: Work | null;
  allWorks: Work[];
  onClose: () => void;
  onNavigate: (work: Work) => void;
}

export function WorkPreviewModal({ work, allWorks, onClose, onNavigate }: WorkPreviewModalProps) {
  const currentIndex = work ? allWorks.findIndex((w) => w.slug === work.slug) : -1;

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(allWorks[currentIndex - 1]);
  }, [currentIndex, allWorks, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < allWorks.length - 1) onNavigate(allWorks[currentIndex + 1]);
  }, [currentIndex, allWorks, onNavigate]);

  useEffect(() => {
    if (!work) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [work, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row gap-6"
          >
            {/* 图片 */}
            <div className="flex-1 relative min-h-[300px] md:min-h-0">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-contain rounded-xl"
                sizes="80vw"
                priority
              />
            </div>

            {/* 信息面板 */}
            <div className="w-full md:w-80 flex flex-col justify-between">
              <div>
                <span className="text-xs text-accent-purple font-medium uppercase tracking-wider">
                  {work.categoryLabel}
                </span>
                <h2 className="text-2xl font-heading font-bold text-text-primary mt-2">
                  {work.title}
                </h2>
                <p className="text-text-muted mt-3">{work.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs glass text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-text-muted text-sm mt-4">{work.date}</p>
              </div>

              {/* 导航按钮 */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={goPrev}
                  disabled={currentIndex <= 0}
                  className="px-4 py-2 glass rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 transition-all"
                >
                  ← 上一个
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex >= allWorks.length - 1}
                  className="px-4 py-2 glass rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 transition-all"
                >
                  下一个 →
                </button>
              </div>
            </div>

            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary hover:text-accent-purple transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 3: 创建作品集页面**

```tsx
// app/works/page.tsx
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
```

**Step 4: 创建作品详情页**

```tsx
// app/works/[slug]/page.tsx
import { works, getWorkBySlug } from "@/data/works";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
  if (!work) return { title: "Not Found" };
  return {
    title: `${work.title} | QingWaaa`,
    description: work.description,
  };
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
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
            <span key={tag} className="px-3 py-1 rounded-full text-xs glass text-text-muted">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-text-muted text-sm">{work.date}</p>
      </div>
    </section>
  );
}
```

**Step 5: 验证**

```bash
cd /home/qingwa/blog && npm run dev
```

Expected: /works 页面显示瀑布流、分类筛选、搜索框，卡片点击弹出预览弹窗。

**Step 6: 提交**

```bash
git add app/works/ components/sections/WorksGrid.tsx components/ui/WorkPreviewModal.tsx
git commit -m "feat: build works gallery with masonry grid, filtering, search, and preview modal"
```

---

## Task 9: 关于我页面 — 时间线 + 技能标签

**Files:**
- Create: `app/about/page.tsx`
- Create: `data/about.ts`

**Step 1: 创建 about 数据**

```typescript
// data/about.ts
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  category: "tools" | "style" | "fandom";
}

export const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "开始数字绘画",
    description: "第一次接触数字艺术，开始用平板创作简单的插画。",
  },
  {
    year: "2025",
    title: "入坑同人创作",
    description: "被 Invader Zim 和 South Park 深深吸引，开始创作同人艺术。",
  },
  {
    year: "2026",
    title: "建立个人网站",
    description: "搭建 qingwaaa.top，向世界展示我的作品。",
  },
];

export const skills: Skill[] = [
  { name: "Procreate", category: "tools" },
  { name: "Photoshop", category: "tools" },
  { name: "Clip Studio Paint", category: "tools" },
  { name: "数字插画", category: "style" },
  { name: "角色设计", category: "style" },
  { name: "场景绘制", category: "style" },
  { name: "Invader Zim", category: "fandom" },
  { name: "South Park", category: "fandom" },
  { name: "Stranger Things", category: "fandom" },
];
```

**Step 2: 创建 about 页面**

```tsx
// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { timeline, skills } from "@/data/about";

export default function AboutPage() {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary text-center mb-16">
            关于我
          </h1>
        </ScrollReveal>

        {/* 简介区 */}
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
              从 Invader Zim 的外星入侵到 South Park 的荒诞幽默，再到 Stranger Things 的暗黑奇幻，
              每部作品都激发了我独特的创作灵感。
            </p>
          </ScrollReveal>
        </div>

        {/* 时间线 */}
        <ScrollReveal>
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-12">
            创作历程
          </h2>
        </ScrollReveal>

        <div className="relative max-w-2xl mx-auto mb-24">
          {/* 垂直线 */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-accent-purple/20" />

          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.15}>
              <div className={`relative flex items-start gap-8 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}>
                {/* 圆点 */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent-purple -translate-x-1/2 mt-2 glow-purple" />

                {/* 内容 */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-accent-purple font-mono text-sm">{item.year}</span>
                  <h3 className="text-xl font-heading font-bold text-text-primary mt-1">
                    {item.title}
                  </h3>
                  <p className="text-text-muted mt-2">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 技能标签云 */}
        <ScrollReveal>
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-8">
            技能 & 兴趣
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.05}>
              <motion.span
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(160, 32, 240, 0.4)" }}
                className={`px-5 py-2 rounded-full text-sm cursor-default transition-colors ${
                  skill.category === "fandom"
                    ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                    : skill.category === "tools"
                    ? "glass text-text-secondary border border-white/10"
                    : "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
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
```

**Step 3: 验证**

```bash
cd /home/qingwa/blog && npm run dev
```

Expected: /about 显示头像 + 简介 + 时间线 + 技能标签云。

**Step 4: 提交**

```bash
git add app/about/ data/about.ts
git commit -m "feat: build about page with timeline and skill tags"
```

---

## Task 10: 博客系统 — MDX + 列表 + 文章页

**Files:**
- Create: `lib/mdx.ts`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `content/blog/hello-world.mdx` (迁移)
- Create: `components/ui/MdxContent.tsx`

**Step 1: 创建 MDX 处理库**

```typescript
// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  categories: string[];
  cover?: string;
  draft: boolean;
  readingTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(source);

      if (data.draft) return null;

      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : "",
        summary: data.summary || "",
        tags: data.tags || [],
        categories: data.categories || [],
        cover: data.cover || undefined,
        draft: data.draft || false,
        readingTime: readingTime(content).text,
        content,
      } as BlogPost;
    })
    .filter(Boolean) as BlogPost[];

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}
```

**Step 2: 创建 MDX 渲染组件**

```tsx
// components/ui/MdxContent.tsx
"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-heading font-bold text-text-primary mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-heading font-bold text-text-primary mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-heading font-semibold text-text-primary mt-5 mb-2" {...props} />,
  p: (props: any) => <p className="text-text-secondary leading-relaxed mb-4" {...props} />,
  a: (props: any) => <a className="text-accent-purple hover:text-accent-cyan transition-colors underline" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-text-secondary mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-accent-purple/50 pl-4 italic text-text-muted my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-bg-mid px-2 py-0.5 rounded text-sm font-mono text-accent-cyan" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-bg-deep rounded-xl p-4 overflow-x-auto my-4 border border-white/5" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-text-secondary" {...props} />
    </div>
  ),
  th: (props: any) => <th className="text-left p-2 border-b border-white/10 text-text-primary font-medium" {...props} />,
  td: (props: any) => <td className="p-2 border-b border-white/5" {...props} />,
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
```

**Step 3: 创建博客列表页**

```tsx
// app/blog/page.tsx
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
                        <p className="text-text-muted mt-2 line-clamp-2">{post.summary}</p>
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
```

**Step 4: 创建博客文章页**

```tsx
// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | QingWaaa`,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-text-muted hover:text-accent-purple transition-colors mb-8 inline-block"
        >
          ← 返回博客
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-text-muted text-sm">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple">
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
```

**Step 5: 迁移博客内容**

```bash
mkdir -p /home/qingwa/blog/content/blog
```

```mdx
---
title: "你好，世界！"
date: 2026-02-27
tags: ["博客", "Hugo"]
categories: ["生活"]
summary: "这是我的第一篇博客文章，记录博客搭建的过程。"
---

## 博客上线了！

经过一番折腾，我的个人博客终于搭建好了。

### 为什么选择 Next.js？

- **React 生态** — 丰富的组件和动画库支持
- **静态生成** — 构建后纯静态，加载极快
- **Markdown 写作** — MDX 支持 React 组件嵌入
- **炫酷交互** — GSAP + Framer Motion 加持

欢迎常来逛逛 :)
```

保存为 `content/blog/hello-world.mdx`。

**Step 6: 在 globals.css 中添加 prose 样式**

在 `styles/globals.css` 的 `@layer utilities` 末尾添加：

```css
.prose-custom h1 { @apply text-3xl font-heading font-bold text-text-primary mt-8 mb-4; }
.prose-custom h2 { @apply text-2xl font-heading font-bold text-text-primary mt-6 mb-3; }
.prose-custom h3 { @apply text-xl font-heading font-semibold text-text-primary mt-5 mb-2; }
.prose-custom p { @apply text-text-secondary leading-relaxed mb-4; }
.prose-custom a { @apply text-accent-purple hover:text-accent-cyan transition-colors underline; }
.prose-custom ul { @apply list-disc list-inside text-text-secondary mb-4 space-y-1; }
.prose-custom ol { @apply list-decimal list-inside text-text-secondary mb-4 space-y-1; }
.prose-custom blockquote { @apply border-l-4 border-accent-purple/50 pl-4 italic text-text-muted my-4; }
.prose-custom code { @apply bg-bg-mid px-2 py-0.5 rounded text-sm font-mono text-accent-cyan; }
.prose-custom pre { @apply bg-bg-deep rounded-xl p-4 overflow-x-auto my-4 border border-white/5; }
.prose-custom table { @apply w-full text-text-secondary my-4; }
.prose-custom th { @apply text-left p-2 border-b border-white/10 text-text-primary font-medium; }
.prose-custom td { @apply p-2 border-b border-white/5; }
.prose-custom li { @apply text-text-secondary; }
.prose-custom strong { @apply text-text-primary font-semibold; }
.prose-custom hr { @apply border-white/10 my-8; }
```

**Step 7: 验证**

```bash
cd /home/qingwa/blog && npm run dev
```

Expected: /blog 显示文章列表，点击进入文章详情页正常渲染 MDX。

**Step 8: 提交**

```bash
git add lib/mdx.ts app/blog/ components/ui/MdxContent.tsx content/blog/ styles/globals.css
git commit -m "feat: build blog system with MDX support and article pages"
```

---

## Task 11: 联系我页面 — 表单 + 社交图标

**Files:**
- Create: `app/contact/page.tsx`
- Create: `components/sections/ContactForm.tsx`

**Step 1: 创建 ContactForm**

```tsx
// components/sections/ContactForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 静态站点 — 实际可接入 Formspree / Getform 等服务
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      {["name", "email", "message"].map((field) => (
        <div key={field} className="relative group">
          <label className="block text-text-muted text-sm mb-2 capitalize">
            {field === "name" ? "姓名" : field === "email" ? "邮箱" : "消息"}
          </label>
          {field === "message" ? (
            <textarea
              rows={5}
              value={formData[field as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              required
              className="w-full bg-transparent border-b-2 border-white/10 focus:border-accent-purple px-0 py-2 text-text-primary focus:outline-none transition-colors resize-none"
            />
          ) : (
            <input
              type={field === "email" ? "email" : "text"}
              value={formData[field as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              required
              className="w-full bg-transparent border-b-2 border-white/10 focus:border-accent-purple px-0 py-2 text-text-primary focus:outline-none transition-colors"
            />
          )}
          {/* 聚焦动画线 */}
          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-purple group-focus-within:w-full group-focus-within:left-0 transition-all duration-300" />
        </div>
      ))}

      <div className="pt-4">
        <Button type="submit" variant="primary" size="lg" className="w-full">
          {submitted ? "✓ 已发送！" : "发送消息"}
        </Button>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-accent-purple text-lg font-medium"
        >
          🎉 感谢你的消息！
        </motion.div>
      )}
    </form>
  );
}
```

**Step 2: 创建 contact 页面**

```tsx
// app/contact/page.tsx
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = {
  title: "联系我 | QingWaaa",
  description: "联系 QingWaaa",
};

export default function ContactPage() {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary text-center mb-4">
            联系我
          </h1>
          <p className="text-text-muted text-center mb-16 max-w-2xl mx-auto">
            有合作想法或者只是想打个招呼？随时给我留言
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <ContactForm />
        </ScrollReveal>

        {/* 社交链接 */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-text-muted mb-4">或者在这里找到我：</p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/goodniceqingwa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-text-muted hover:text-accent-purple hover:glow-purple transition-all hover:-translate-y-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

**Step 3: 验证并提交**

```bash
cd /home/qingwa/blog && npm run dev
# 验证 /contact 页面表单和社交图标

git add app/contact/ components/sections/ContactForm.tsx
git commit -m "feat: build contact page with animated form and social links"
```

---

## Task 12: Lenis 平滑滚动集成 + 全站构建验证

**Files:**
- Create: `components/providers/SmoothScrollProvider.tsx`
- Modify: `app/layout.tsx` — 集成 SmoothScrollProvider

**Step 1: 创建 SmoothScrollProvider**

```tsx
// components/providers/SmoothScrollProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

**Step 2: 更新 layout.tsx 集成 SmoothScroll**

在 `<body>` 中的 `<ThemeProvider>` 内添加 `<SmoothScrollProvider>`：

```tsx
<ThemeProvider>
  <SmoothScrollProvider>
    <CustomCursor />
    <Navbar />
    <main className="pt-16">{children}</main>
    <Footer />
  </SmoothScrollProvider>
</ThemeProvider>
```

**Step 3: 全站构建验证**

```bash
cd /home/qingwa/blog && npm run build
```

Expected: 构建成功，所有页面静态导出无错误。

**Step 4: 提交**

```bash
git add components/providers/SmoothScrollProvider.tsx app/layout.tsx
git commit -m "feat: integrate Lenis smooth scroll and verify full site build"
```

---

## Task 13: 生成占位图片 + 最终验证 + .gitignore 更新

**Files:**
- Create: 占位图片（SVG/生成脚本）
- Modify: `.gitignore`
- Modify: `static/CNAME` → 移到 `public/CNAME`

**Step 1: 创建占位 SVG 图片**

创建一个脚本生成简单占位图片：

```bash
cd /home/qingwa/blog/public/images/works

for i in 1 2 3 4 5 6; do
  cat > "placeholder-${i}.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="#1C1C1C"/>
  <rect x="100" y="300" width="600" height="400" rx="20" fill="#2E2E2E"/>
  <text x="400" y="520" font-family="monospace" font-size="48" fill="#A020F0" text-anchor="middle">作品占位图</text>
</svg>
SVGEOF
done
```

注意：需将 `data/works.ts` 中的 `.jpg` 后缀改为 `.svg`（或使用真实图片替换）。

**Step 2: 移动 CNAME 到 public/**

```bash
mv /home/qingwa/blog/static/CNAME /home/qingwa/blog/public/CNAME 2>/dev/null
rmdir /home/qingwa/blog/static 2>/dev/null
```

**Step 3: 更新 .gitignore**

```
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build
.next/
out/
build/

# Misc
*.pem
.DS_Store
*.tsbuildinfo
next-env.d.ts

# Debug
npm-debug.log*

# IDE
.vscode/
.idea/

# Env
.env*.local
```

**Step 4: 最终构建 + dev 验证**

```bash
cd /home/qingwa/blog
npm run build
npm run dev
```

验证所有页面：
- `/` — Hero + 精选作品 + 关于预览
- `/works` — 瀑布流 + 筛选 + 搜索 + 弹窗
- `/about` — 时间线 + 技能标签
- `/blog` — 文章列表
- `/blog/hello-world` — MDX 文章
- `/contact` — 联系表单
- 导航栏滚动隐/显、暗/亮切换、自定义光标

**Step 5: 提交**

```bash
git add -A
git commit -m "feat: add placeholder images, update gitignore, final build verification"
```

---

## 后续优化（可选）

- 替换占位图片为真实作品
- 接入 Formspree 处理联系表单
- 配置 Vercel 部署 + 自定义域名
- 添加 SEO meta tags（Open Graph、Twitter Card）
- 添加 Google Analytics / Plausible
- 性能调优 Lighthouse 评分
