import { assetPath } from "@/lib/utils";

export interface Work {
  slug: string;
  title: string;
  description: string;
  category: "robotics" | "frontend" | "algorithm" | "other";
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
  { id: "robotics", label: "机器人" },
  { id: "frontend", label: "前端" },
  { id: "algorithm", label: "算法" },
  { id: "other", label: "其他" },
] as const;

export const works: Work[] = [
  {
    slug: "ppiais-qt-ppi-collision-avoidance",
    title: "PPIAIS-Qt 雷达避碰系统",
    description:
      "基于 Qt/QML 的 PPI 雷达态势与避碰系统，包含 DCPA/TCPA 计算、风险加权、警戒区告警与目标跟踪联动。",
    category: "algorithm",
    categoryLabel: "算法",
    image: assetPath("/images/works/ppiais-qt-cover.svg"),
    thumbnail: assetPath("/images/works/ppiais-qt-cover.svg"),
    date: "2026-03-20",
    tags: ["qt", "qml", "radar", "cpa", "collision-avoidance"],
    featured: true,
    width: 1600,
    height: 900,
  },
  {
    slug: "ros2-uav-simulation",
    title: "ROS2 无人机仿真系统",
    description:
      "基于 ROS2 Humble + Gazebo 的四旋翼无人机仿真平台，支持自主起降、航线规划与避障。",
    category: "robotics",
    categoryLabel: "机器人",
    image: assetPath("/images/works/placeholder-1.svg"),
    thumbnail: assetPath("/images/works/placeholder-1.svg"),
    date: "2026-03-11",
    tags: ["ros2", "gazebo", "uav", "simulation"],
    featured: true,
    width: 1200,
    height: 1600,
  },
  {
    slug: "personal-tech-blog",
    title: "个人技术博客",
    description:
      "基于 Next.js 16 + Tailwind CSS v4 的个人技术博客，支持 MDX、暗色主题与动画交互。",
    category: "frontend",
    categoryLabel: "前端",
    image: assetPath("/images/works/placeholder-2.svg"),
    thumbnail: assetPath("/images/works/placeholder-2.svg"),
    date: "2026-02-27",
    tags: ["nextjs", "react", "tailwind", "typescript"],
    featured: true,
    width: 1400,
    height: 1000,
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
