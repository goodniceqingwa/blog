# 赛博极客主题 + 博客分类 — 设计文档

**日期**：2026-04-20
**作者**：QingWaaa
**状态**：已批准，待实施

---

## 1. 背景

当前博客是 Next.js 16 + Tailwind v4 + MDX 技术栈，视觉风格为紫青玻璃拟态 + 粒子星空 + 自定义光标。最近一次提交 `10a4524 feat: 将博客主题从数字艺术改为程序员技术主页` 已开始从"数字艺术"迁移至"程序员"方向。

本次目标有两个：

1. **全站视觉改造**：叠加程序员元素（代码块、行号、终端 prompt、文件扩展名标签），但**保留紫青配色、玻璃拟态、粒子背景**，走"赛博极客"路线。
2. **博客分类功能**：MDX frontmatter 已经有 `categories` 字段（现有 4 个分类：AI 学习 3 篇 / 机器人 3 篇 / 工程实践 1 篇 / 生活随笔 1 篇），但博客列表页未展示也不支持筛选。本次在 `/blog` 加一条顶部 Pill 筛选条。

## 2. 核心决策（已与用户对齐）

| 维度 | 选择 | 放弃 |
|------|------|------|
| 主题风格 | 赛博极客（保留紫青 + 叠加代码元素） | 终端黑客风 / IDE 代码编辑器风 / 极简博客风 |
| 分类 UI | 顶部 Pill 筛选条（客户端 state 即时过滤） | 侧栏文件树 / 分段汇总 / 独立分类页 |
| 改动范围 | 全站（Hero / Navbar / Footer / 博客相关页） | 仅博客页 / 首页+博客 |
| 粒子背景 | 保留 stars 变体 | 改代码雨（性能/兼容风险太高，YAGNI） |
| 分类独立路由 | 不做 `/blog/category/[slug]` | 等真有 SEO 需求再加，YAGNI |

## 3. 视觉系统

**保留不动**：紫青双色 `#a020f0 / #00f5ff`、玻璃拟态、粒子背景、明暗主题切换、自定义光标、平滑滚动。

**新增语义色**（挂到 Tailwind v4 `@theme`）：

```css
--term-green:  #7ee787;  /* $ 提示符、状态 ok */
--term-yellow: #d2a8ff;  /* 字符串高亮 */
--term-red:    #ff7b72;  /* 关键词、错误 */
```

这三色只在代码元素里点缀，**不污染紫青主调**。

**新增 utility classes**（`styles/globals.css`）：

| Utility | 用途 |
|---------|------|
| `.terminal-prompt` | 在元素前注入 `$ ` 前缀（绿色 mono） |
| `.line-number` | 4px 宽行号条，`#30363d`，贴卡片左边 |
| `.code-tag` | `<xxx />` 形状的分类标签（紫色边框 + mono） |
| `.caret-blink` | `█` 光标闪烁动画（1s 无限循环） |

**字体策略**：
- 正文：Inter + Noto Sans SC（不变）
- 标题：Space Grotesk（不变）
- **"代码元素"全部走 JetBrains Mono**：行号、分类 tag、文件扩展名、`$` 提示符、Navbar 路径、Hero 代码块、日期

## 4. 页面级改造

### 4.1 Hero (`components/sections/Hero.tsx`)

保留大标题 `QingWaaa`。副标从 `Developer | AI Explorer` 改为**代码对象字面量**：

```ts
const qingwa = {
  role:    "Developer",
  focus:   ["AI", "Robotics", "Full-stack"],
  typing:  "█",
};
```

- 用现有 `TextReveal` 逐字显示
- `█` 应用 `.caret-blink` 光标闪烁
- 按钮 "阅读博客 / 了解我" 不变

### 4.2 Navbar (`components/layout/Navbar.tsx`)

- Logo 前加 `$`：`$ qingwa@blog:~` （`$` 绿色）
- 激活链接前加 `>` 标记：`> /blog`
- 所有链接文字切换到 JetBrains Mono
- 底部紫色高亮条保留（`layoutId="navbar-indicator"`）

### 4.3 Footer (`components/layout/Footer.tsx`)

改成终端式 `git remote` 输出形态：

```
$ git remote -v
origin    https://github.com/goodniceqingwa   (fetch)
qingwa    mailto:...                          (mail)
```

### 4.4 GlassCard (`components/ui/GlassCard.tsx`)

**向后兼容扩展**，新增两个可选 props：

```ts
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  lineNumber?: boolean;    // 左侧 4px 行号条
  fileTag?: string;         // 右上角 .mdx / .tsx / .sh 标签
}
```

**不破坏现有调用**（`FeaturedWorks.tsx`、`AboutPreview.tsx` 等）—— props 缺省时行为完全不变。

应用点：
- 博客卡：`fileTag=".mdx"` + `lineNumber`
- 作品卡：`fileTag=".tsx"`
- 关于卡：`fileTag="README.md"`
- 联系卡：`fileTag="contact.sh"`

### 4.5 博客列表页 (`app/blog/page.tsx`)

**拆分为 Server 壳 + Client 筛选器**：

- Server 组件：调用 `getAllPosts()` + `getAllCategories()`，把两个数组传给客户端组件（SSG 友好，SEO 无损）
- Client 组件 `BlogListClient.tsx`：维护 `selectedCategory` state

**Pill 筛选条**：
```
> category: [*全部(8)] [AI 学习(3)] [机器人(3)] [工程实践(1)] [生活随笔(1)]
```
- 激活态：紫色边框 + 紫色文字 + `[*]` 前缀
- 未激活态：灰色边框 + 悬浮变紫
- 全 mono 字体

**博客卡**：
- 左上角 `<AI 学习 />` 分类 tag（紫色 code-tag）
- 原 `tags` 继续显示但降权重（字号小、颜色淡）
- 日期改 mono 字体
- 无文章时显示 `// no posts in this category`

### 4.6 博客详情页 (`app/blog/[slug]/page.tsx`)

- 标题上方加面包屑：`$ cat ~/blog/<分类>/<slug>.mdx`
- 分类 tag 和原 tags 都展示，分类在前、更醒目

## 5. 数据层改动

### `lib/mdx.ts` 新增：

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

**不改 `BlogPost` interface**（`categories: string[]` 已存在）。

**不修改任何 MDX 文件**。

## 6. 文件改动清单

### 新增文件

| 路径 | 用途 |
|------|------|
| `components/blog/BlogListClient.tsx` | 客户端筛选器（state + Pill + 过滤列表） |
| `components/blog/CategoryPill.tsx` | 单个 Pill 组件（激活/未激活态） |
| `components/ui/CodeTag.tsx` | `<xxx />` 形状标签 |
| `components/ui/TerminalPrompt.tsx` | `$` 提示符组件（绿色 mono + 可选子文本） |
| `docs/plans/2026-04-20-cyber-geek-theme-design.md` | 本文档 |
| `docs/plans/2026-04-20-cyber-geek-theme-plan.md` | 实施计划（writing-plans 产出） |

### 修改文件

| 路径 | 改动摘要 |
|------|---------|
| `styles/globals.css` | 加 3 个语义色变量 + 4 个 utility |
| `lib/mdx.ts` | 加 `getAllCategories()` |
| `app/blog/page.tsx` | 改为 Server 壳 |
| `app/blog/[slug]/page.tsx` | 加面包屑 + 分类 tag |
| `components/sections/Hero.tsx` | 代码字面量副标 |
| `components/layout/Navbar.tsx` | `$` + `>` 标记 + mono 字体 |
| `components/layout/Footer.tsx` | `git remote` 形态 |
| `components/ui/GlassCard.tsx` | 加 `lineNumber` + `fileTag` 可选 props |

### 不改动

- `data/*`、`content/blog/*.mdx`、`next.config.ts`
- 粒子组件 `ParticleBackground`
- 主题切换 `ThemeProvider` / `ThemeToggle`
- `FeaturedWorks.tsx`、`AboutPreview.tsx`、`ContactForm.tsx`、`WorksGrid.tsx`、`WorkPreviewModal.tsx`（会因 GlassCard 扩展**被动受益**，但源码不改）

## 7. 风险与缓解

| 风险 | 缓解 |
|------|------|
| `TextReveal` 对多行缩进的代码字面量可能破坏 | 实施时先小测；如不行退回 `<pre>` + Framer Motion 逐行 fade in |
| `GlassCard` 改动破坏现有复用点 | 所有新 props 均为**可选**，缺省时行为与当前完全一致 |
| Pill 筛选是客户端 state，担心首屏 SSG 正确性 | Server 壳先输出全部文章，客户端挂载后 state 过滤，**首屏含全部文章**，SEO 无损 |
| 明暗主题切换下新 utility 表现不一致 | 所有新色用 `var(--xxx)` 形式，在 `.light` 下提供对应值 |
| JetBrains Mono 汉字回退字体可能异常 | 保留 `var(--font-noto-sans-sc)` 作为 fallback |

## 8. 验证计划

- `npm run build` 通过 → 构建证据
- `npm run dev` 逐页人工检查 → 视觉证据
- 博客页点击 5 个 Pill（全部 + 4 分类）筛选结果正确 → 功能证据
- 明暗主题切换下各页面无色差错乱 → 主题证据
- 构建产物 `out/` 目录含所有原路由（SSG 无回退）→ 静态导出证据

## 9. 非目标（YAGNI）

- **不做**代码雨粒子效果
- **不做**独立分类路由 `/blog/category/[slug]`
- **不做**标签筛选（tags 太碎，等真有需求再加）
- **不做**搜索
- **不引入**新 npm 依赖（现有 `framer-motion` + `gsap` 足够）

## 10. 后续可能的迭代

（不在本次范围内，记录在此供以后回看）

- 代码雨粒子变体（复用 `ParticleBackground` API）
- 文章目录自动生成 TOC
- 分类页 SEO 独立路由
- RSS 按分类订阅
