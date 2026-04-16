export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tools";
}

export const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "开始接触 ROS2 与机器人",
    description:
      "学习 ROS2 Humble、Gazebo 仿真，搭建无人机仿真场景，开始机器人开发之旅。",
  },
  {
    year: "2025",
    title: "深入工程项目实践",
    description:
      "参与雷达避碰系统开发，基于 Qt/QML 构建 PPI 雷达态势显示与 CPA 算法实现。",
  },
  {
    year: "2026",
    title: "探索 AI 与全栈开发",
    description:
      "搭建个人技术博客，学习 LLM 应用开发，将 AI 能力融入实际工程项目。",
  },
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "C++", category: "language" },
  { name: "QML", category: "language" },
  { name: "Next.js", category: "framework" },
  { name: "React", category: "framework" },
  { name: "ROS2", category: "framework" },
  { name: "Qt", category: "framework" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Linux", category: "tools" },
  { name: "Gazebo", category: "tools" },
];
