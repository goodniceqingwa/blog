# QingWaaa 网站内容修改 & 部署指南

## 目录

1. [项目结构一览](#1-项目结构一览)
2. [环境准备](#2-环境准备)
3. [修改作品集](#3-修改作品集)
4. [写博客文章](#4-写博客文章)
5. [修改个人资料](#5-修改个人资料)
6. [修改网站基本信息](#6-修改网站基本信息)
7. [本地预览](#7-本地预览)
8. [部署到 qingwaaa.top](#8-部署到-qingwaaa-top)
9. [常见问题](#9-常见问题)

---

## 1. 项目结构一览

```
blog/
├── app/                    # 页面（一般不用动）
├── components/             # 组件（一般不用动）
├── content/
│   └── blog/               # ✏️ 博客文章（.mdx 文件）
├── data/
│   ├── works.ts            # ✏️ 作品集数据
│   └── about.ts            # ✏️ 个人资料 & 技能
├── public/
│   ├── images/
│   │   └── works/          # ✏️ 作品图片
│   └── CNAME               # 域名配置（不要动）
├── styles/
│   └── globals.css         # 全局样式
├── next.config.ts          # Next.js 配置
└── package.json            # 项目依赖
```

**你日常只需要修改带 ✏️ 标记的文件/目录。**

---

## 2. 环境准备

### 首次使用

```bash
# 1. 安装 Node.js（需要 v20+）
#    下载地址：https://nodejs.org/

# 2. 克隆项目（如果在新电脑上）
git clone https://github.com/goodniceqingwa/blog.git
cd blog

# 3. 安装依赖
npm install
```

### 日常使用

```bash
# 进入项目目录
cd ~/blog
```

---

## 3. 修改作品集

### 3.1 添加作品图片

将你的作品图片放入 `public/images/works/` 目录：

```bash
# 支持格式：.png .jpg .jpeg .webp .svg
# 建议：宽度至少 1200px，文件名不要有中文和空格
public/images/works/my-new-artwork.png
```

### 3.2 编辑作品数据

打开 `data/works.ts`，在 `works` 数组中**添加新条目**：

```typescript
// 在 works 数组中添加一个新对象
{
  slug: "my-new-artwork",           // URL 标识，只用英文、数字、短横线
  title: "我的新作品",                // 作品标题
  description: "这是一幅 Zim 的新画作", // 简短描述
  category: "invader-zim",           // 分类（见下方可选值）
  categoryLabel: "Invader Zim",      // 分类显示名
  image: assetPath("/images/works/my-new-artwork.png"),      // 大图路径
  thumbnail: assetPath("/images/works/my-new-artwork.png"),  // 缩略图路径（可以和大图一样）
  date: "2026-03-01",               // 日期
  tags: ["invader zim", "fanart"],   // 标签
  featured: true,                    // true = 显示在首页精选
  width: 1200,                       // 图片实际宽度（像素）
  height: 1600,                      // 图片实际高度（像素）
},
```

**category 可选值：**

| 值 | 对应分类 |
|---|---|
| `"invader-zim"` | Invader Zim |
| `"south-park"` | South Park |
| `"stranger-things"` | Stranger Things |
| `"other"` | 其他 |

### 3.3 删除作品

在 `data/works.ts` 的 `works` 数组中删除对应的对象即可。
同时可以删除 `public/images/works/` 下对应的图片文件。

### 3.4 修改现有作品

直接修改 `data/works.ts` 中对应对象的字段值。

---

## 4. 写博客文章

### 4.1 创建新文章

在 `content/blog/` 目录下创建一个 `.mdx` 文件：

```
content/blog/my-new-post.mdx
```

**文件名 = URL 路径**，例如 `my-new-post.mdx` 对应 `qingwaaa.top/blog/my-new-post`

### 4.2 文章模板

```mdx
---
title: "文章标题"
date: 2026-03-01
tags: ["标签1", "标签2"]
categories: ["分类"]
summary: "文章摘要，会显示在博客列表页。"
---

## 正文标题

这里写正文内容，支持标准 Markdown 语法。

### 支持的格式

- **粗体** 和 *斜体*
- [链接](https://example.com)
- 图片：![描述](/images/xxx.png)
- 代码块、表格、引用等

> 引用文字

| 列1 | 列2 |
|-----|-----|
| A   | B   |
```

### 4.3 Front Matter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期（YYYY-MM-DD） |
| `tags` | 是 | 标签数组 |
| `categories` | 是 | 分类数组 |
| `summary` | 是 | 摘要，显示在列表页 |
| `cover` | 否 | 封面图片路径 |
| `draft` | 否 | 设为 `true` 则不会发布（草稿） |

### 4.4 删除文章

直接删除 `content/blog/` 下对应的 `.mdx` 文件。

---

## 5. 修改个人资料

编辑 `data/about.ts` 文件。

### 5.1 修改时间线

```typescript
export const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "开始数字绘画",
    description: "第一次接触数字艺术...",
  },
  // 添加更多条目...
];
```

### 5.2 修改技能标签

```typescript
export const skills: Skill[] = [
  { name: "Procreate", category: "tools" },    // 工具类（灰色标签）
  { name: "数字插画", category: "style" },      // 风格类（青色标签）
  { name: "Invader Zim", category: "fandom" },  // 粉丝圈（紫色标签）
  // 添加更多...
];
```

**category 对应颜色：**
- `"tools"` → 灰色玻璃效果
- `"style"` → 青色
- `"fandom"` → 紫色

---

## 6. 修改网站基本信息

### 6.1 网站标题和描述

编辑 `app/layout.tsx` 中的 `metadata` 对象：

```typescript
export const metadata: Metadata = {
  title: "QingWaaa | Digital Artist & Fanart Creator",
  description: "个人艺术作品集 ...",
  keywords: ["fanart", "digital art", ...],
};
```

### 6.2 首页文案

编辑 `components/sections/Hero.tsx` 中的文字内容。

### 6.3 页脚社交链接

编辑 `components/layout/Footer.tsx` 中的链接。

---

## 7. 本地预览

修改完内容后，先在本地预览确认效果：

```bash
# 启动开发服务器
npm run dev

# 然后打开浏览器访问
# http://localhost:3000
```

开发服务器支持**热更新**，保存文件后页面会自动刷新。

确认无误后按 `Ctrl + C` 停止服务器。

---

## 8. 部署到 qingwaaa.top

### 完整流程（每次修改后执行）

```bash
# 1. 查看改了什么
git status

# 2. 添加所有修改的文件
git add .

# 3. 提交（写一句简短说明）
git commit -m "添加新作品 xxx"

# 4. 推送到 GitHub（自动触发部署）
git push
```

**推送后会自动发生：**
1. GitHub Actions 自动运行构建
2. 构建产物部署到 gh-pages 分支
3. GitHub Pages 自动更新 qingwaaa.top

**通常 1-2 分钟后**网站就会更新。

### 一行命令快速部署

```bash
git add . && git commit -m "更新内容" && git push
```

---

## 9. 常见问题

### Q: 推送后网站没更新？
1. 去 https://github.com/goodniceqingwa/blog/actions 查看构建是否成功
2. 清除浏览器缓存（`Ctrl + Shift + R`）
3. 等待 1-2 分钟 GitHub Pages CDN 刷新

### Q: 图片不显示？
- 检查图片是否放在 `public/images/works/` 目录下
- 检查 `data/works.ts` 中路径是否正确，必须用 `assetPath("/images/works/文件名")`
- 文件名不要有中文、空格或特殊字符

### Q: 本地预览报错？
```bash
# 清除缓存后重试
rm -rf .next
npm run dev
```

### Q: 怎么添加新的作品分类？

1. 编辑 `data/works.ts`：
   - 在 `Work` 接口的 `category` 类型中添加新值
   - 在 `categories` 数组中添加新分类
2. 然后就可以在作品数据中使用新分类了

### Q: 想隐藏某篇博客文章？
在文章 front matter 中添加 `draft: true`：
```mdx
---
title: "草稿文章"
draft: true
---
```

### Q: 怎么修改导航栏链接？
编辑 `components/layout/Navbar.tsx` 中的 `navLinks` 数组。

---

## 快速参考卡片

| 我想... | 改哪个文件 |
|---------|-----------|
| 添加/删除/修改作品 | `data/works.ts` + `public/images/works/` |
| 写新博客文章 | `content/blog/新文件名.mdx` |
| 修改个人简介和技能 | `data/about.ts` |
| 修改首页文案 | `components/sections/Hero.tsx` |
| 修改网站标题/描述 | `app/layout.tsx` |
| 修改页脚内容 | `components/layout/Footer.tsx` |
| 修改导航栏 | `components/layout/Navbar.tsx` |

**部署三步走：** `git add .` → `git commit -m "说明"` → `git push`
