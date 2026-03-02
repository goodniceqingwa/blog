# QingWaaa.top 全站改版设计文档

> 日期: 2026-02-28
> 状态: 已确认

## 概述

将 qingwaaa.top 从 Hugo + PaperMod 技术博客全面改版为 Cyber-Dark 风格的个人艺术展示网站，主打 Fanart 作品集展示（Invader Zim、South Park、Stranger Things 等同人艺术），同时保留完整博客功能。

## 技术决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 框架 | Next.js 14 App Router | SSG + 强生态 + Vercel 原生支持 |
| 样式 | Tailwind CSS v4 | 原子化 CSS，暗黑模式 class 策略 |
| 动画 | Framer Motion + GSAP + ScrollTrigger | 页面过渡 + 滚动动画业界标配 |
| 平滑滚动 | Lenis | 轻量级，与 GSAP 兼容好 |
| 粒子效果 | tsparticles | 替代 Three.js，性能更优 |
| 3D 效果 | CSS 3D + vanilla-tilt | 轻量级，移动端友好 |
| 博客 | MDX + next-mdx-remote | 支持 React 组件嵌入 |
| 数据管理 | 本地 TypeScript 文件 | 最简单直接，无外部依赖 |
| 部署 | Vercel | 零配置，自定义域名 |
| 现有项目 | 全新替换 | Hugo 内容极少（2篇文章），直接重建 |

## 技术栈详细

```
Next.js 14 (App Router, output: 'export')
├── TypeScript (严格模式)
├── Tailwind CSS v4
├── Framer Motion
├── GSAP + ScrollTrigger (免费版)
├── Lenis (平滑滚动)
├── tsparticles (粒子背景)
├── vanilla-tilt (3D 卡片)
├── next-mdx-remote (MDX 渲染)
├── Shiki (代码高亮)
└── react-masonry-css (瀑布流)
```

## 项目结构

```
/home/qingwa/blog/
├── app/
│   ├── layout.tsx          — 根布局 (字体、主题、导航、Lenis)
│   ├── page.tsx            — 首页 (Hero + 精选作品)
│   ├── about/page.tsx      — 关于我
│   ├── works/
│   │   ├── page.tsx        — 作品集 (瀑布流 + 筛选)
│   │   └── [slug]/page.tsx — 作品详情
│   ├── blog/
│   │   ├── page.tsx        — 博客列表
│   │   └── [slug]/page.tsx — 博客文章
│   └── contact/page.tsx    — 联系我
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      — 毛玻璃导航栏
│   │   ├── Footer.tsx      — 页脚
│   │   ├── MobileMenu.tsx  — 全屏汉堡菜单
│   │   └── CustomCursor.tsx— 自定义鼠标指针
│   ├── ui/
│   │   ├── GlassCard.tsx   — 玻璃拟态卡片
│   │   ├── Button.tsx      — 按钮组件
│   │   ├── Modal.tsx       — 作品预览弹窗
│   │   └── ThemeToggle.tsx — 暗/亮模式切换
│   ├── sections/
│   │   ├── Hero.tsx        — 首页全屏 Hero
│   │   ├── FeaturedWorks.tsx— 精选作品展示
│   │   ├── AboutPreview.tsx— 关于我预览
│   │   └── ContactForm.tsx — 联系表单
│   └── effects/
│       ├── ParticleBackground.tsx — 粒子背景
│       ├── ScrollReveal.tsx       — 滚动揭示包装器
│       ├── TextReveal.tsx         — 文字逐行/逐字打出
│       ├── TiltCard.tsx           — 3D tilt 卡片
│       └── MouseFollowGlow.tsx    — 鼠标跟随光点
├── data/
│   └── works.ts            — 作品数据定义
├── content/
│   └── blog/               — MDX 博客文章
├── lib/
│   ├── mdx.ts              — MDX 处理工具
│   └── utils.ts            — 通用工具函数
├── hooks/
│   ├── useSmoothScroll.ts  — Lenis 初始化
│   ├── useScrollDirection.ts— 滚动方向检测
│   ├── useScrollProgress.ts— 滚动进度
│   └── useMediaQuery.ts    — 响应式断点
├── styles/
│   └── globals.css         — Tailwind + 全局样式
├── public/
│   ├── images/works/       — 作品图片
│   └── fonts/              — 自托管字体（可选）
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## 色彩设计系统

### 暗黑模式（默认）

| 用途 | 色值 | 说明 |
|------|------|------|
| 背景-最深 | #0A0A0A | 页面主背景 |
| 背景-深 | #1C1C1C | 卡片/容器背景 |
| 背景-中 | #2E2E2E | 二级容器 |
| 背景-浅 | #4A4A4A | 边框/分割线 |
| 文字-主 | #FFFFFF | 标题/重要文字 |
| 文字-次 | #E5E5E5 | 正文 |
| 文字-辅 | #A0A0A0 | 次要信息 |
| 强调-紫 | #A020F0 | 交互/高亮/CTA |
| 强调-青 | #00F5FF | hover/微光 |
| 金属银 | #C0C0C0 | 图标/装饰线 |
| 玻璃背景 | rgba(255,255,255,0.05) | 毛玻璃组件 |

### 浅色模式

| 用途 | 色值 |
|------|------|
| 背景-主 | #FFFFFF |
| 背景-次 | #F5F5F5 |
| 文字-主 | #0A0A0A |
| 文字-次 | #3A3A3A |
| 强调-紫 | #7B16C9 |

### 字体

- 标题: Space Grotesk (英文) + Noto Sans SC (中文)
- 正文: Inter (英文) + Noto Sans SC (中文)
- 等宽: JetBrains Mono

## 页面设计

### 1. 首页 Hero

- 全屏粒子背景 (tsparticles 星空 + 网格线条)
- 入场动画序列: 粒子渐入(0.5s) → 标题逐字弹出(GSAP stagger) → 副标题 fade-in slide-up → CTA scale 弹入
- 大标题 "QingWaaa" + 副标题 "Digital Artist | Fanart Creator"
- CTA: "探索作品" 按钮 + 下滑 bounce 箭头
- 鼠标互动: 粒子被推开效果

### 2. 导航栏

- 固定顶部，毛玻璃: backdrop-blur-md bg-black/20
- 下滑隐藏 / 上滑显示（useScrollDirection）
- hover 下划线 Framer Motion layoutId 滑动
- 移动端: 汉堡菜单 → 全屏覆盖 + stagger slide-in

### 3. 作品集

- Masonry 瀑布流 (react-masonry-css)
- 分类筛选: 全部 / Invader Zim / South Park / Stranger Things / 其他
- AnimatePresence + layout 动画重排
- 卡片 hover: 3D tilt + scale(1.02) + glow 边框 + 信息滑入
- 鼠标跟随光斑
- 全屏弹窗: layoutId 过渡 + 左右滑动 + 放大 + 下载
- 搜索框: 实时过滤

### 4. 关于我

- 左右布局: 头像(紫色发光边框) + 简介
- 垂直时间线: ScrollTrigger 逐条揭示
- 技能标签云: pill 样式，hover 发光

### 5. 博客

- 卡片列表: 标题 + 日期 + 摘要 + 封面
- 滚动触发 stagger fade-in
- 文章页: MDX + Shiki 代码高亮 + ToC 目录

### 6. 联系我

- 表单: 姓名 / 邮箱 / 消息
- 聚焦动画: 底部边框从中心展开(紫色)
- 提交成功: 粒子爆炸庆祝
- 社交图标: 弹跳 + 发光 hover

### 7. 页脚

- 版权信息 + 快速导航链接
- "Made with ❤️ & lots of coffee"
- 打字机效果统计 (作品数 / 粉丝数)

## 全局交互效果

| 效果 | 实现 | 说明 |
|------|------|------|
| 自定义光标 | CustomCursor.tsx | 霓虹圆环，hover 变形，移动端禁用 |
| 平滑滚动 | Lenis | 全站丝滑滚动 |
| 页面过渡 | Framer Motion AnimatePresence | fade + slide |
| 滚动揭示 | GSAP ScrollTrigger | fade-in + slide-up |
| 暗/亮切换 | ThemeToggle + CSS transition | 太阳/月亮旋转动画 |
| 粒子背景 | tsparticles | Hero + 联系页 |

## 性能策略

### 图片
- next/image: WebP/AVIF 自动转换 + 响应式
- lazy loading + blurDataURL 模糊占位

### 动画
- will-change 仅动画时添加
- transform + opacity 优先 (GPU 加速)
- 移动端降级: 减少粒子数、禁用 tilt
- prefers-reduced-motion 支持

### 代码
- 重组件动态 import (Modal, ParticleBackground)
- next/font 字体优化
- Tailwind purge 无用 CSS

### 目标
- Lighthouse Performance: 95+
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1
