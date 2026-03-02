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
    description:
      "被 Invader Zim 和 South Park 深深吸引，开始创作同人艺术。",
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
