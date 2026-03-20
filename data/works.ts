import { assetPath } from "@/lib/utils";

export interface Work {
  slug: string;
  title: string;
  description: string;
  category: "invader-zim" | "south-park" | "stranger-things" | "other";
  categoryLabel: string;
  image: string;
  thumbnail: string;
  date: string;
  tags: string[];
  featured: boolean;
  width: number;
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
  {
    slug: "ppiais-qt-ppi-collision-avoidance",
    title: "PPIAIS-Qt 雷达避碰系统",
    description:
      "基于 Qt/QML 的 PPI 雷达态势与避碰系统，包含 DCPA/TCPA 计算、风险加权、警戒区告警与目标跟踪联动。",
    category: "other",
    categoryLabel: "工程项目",
    image: assetPath("/images/works/ppiais-qt-cover.svg"),
    thumbnail: assetPath("/images/works/ppiais-qt-cover.svg"),
    date: "2026-03-20",
    tags: ["qt", "qml", "radar", "cpa", "collision-avoidance"],
    featured: true,
    width: 1600,
    height: 900,
  },
  {
    slug: "zim-invasion",
    title: "Zim's Invasion",
    description: "Invader Zim 正在执行他的地球征服计划",
    category: "invader-zim",
    categoryLabel: "Invader Zim",
    image: assetPath("/images/works/placeholder-1.svg"),
    thumbnail: assetPath("/images/works/placeholder-1.svg"),
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
    image: assetPath("/images/works/placeholder-2.svg"),
    thumbnail: assetPath("/images/works/placeholder-2.svg"),
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
    image: assetPath("/images/works/placeholder-3.svg"),
    thumbnail: assetPath("/images/works/placeholder-3.svg"),
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
    image: assetPath("/images/works/placeholder-4.svg"),
    thumbnail: assetPath("/images/works/placeholder-4.svg"),
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
    image: assetPath("/images/works/placeholder-5.svg"),
    thumbnail: assetPath("/images/works/placeholder-5.svg"),
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
    image: assetPath("/images/works/placeholder-6.svg"),
    thumbnail: assetPath("/images/works/placeholder-6.svg"),
    date: "2026-01-15",
    tags: ["stranger things", "eleven", "powers"],
    featured: false,
    width: 1400,
    height: 1800,
  },
];

export function getFeaturedWorks(): Work[] {
  return works
    .filter((w) => w.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

export function getWorksByCategory(category: string): Work[] {
  if (category === "all") return works;
  return works.filter((w) => w.category === category);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export function searchWorks(query: string): Work[] {
  const q = query.toLowerCase();
  return works.filter(
    (w) =>
      w.title.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q) ||
      w.tags.some((t) => t.toLowerCase().includes(q))
  );
}
