# UAV Open Field Blog Post Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a new blog post that explains the ROS 2 Humble + Gazebo UAV open-field simulation from structure to runnable steps, and make it fit the existing site content format.

**Architecture:** Create one new `.mdx` article under `content/blog/` that follows the existing front matter and long-form tutorial style already used by the ROS 2 and Gazebo installation posts. Verify the article with lightweight content checks and a local blog build so the post is both structurally valid and useful for readers.

**Tech Stack:** MDX, Next.js content pipeline, Markdown front matter, `npm`, `rg`

---

### Task 1: Create the article skeleton and front matter

**Files:**
- Create: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
- Test: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`

**Step 1: Write the failing test**

Use a content checklist as the failing test:

```text
- article file exists
- title exists
- date exists
- tags exists
- categories exists
- summary exists
```

**Step 2: Run test to verify it fails**

Run: `cd ~/blog && test -f content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: FAIL because the article file does not exist yet

**Step 3: Write minimal implementation**

Create the new article file with front matter only:

```mdx
---
title: "ROS 2 Humble + Gazebo 搭建无人机仿真场景实战：从空旷起降场到 ROS2 话题桥接"
date: 2026-03-11
tags: ["ROS2", "Gazebo", "无人机", "仿真", "机器人"]
categories: ["技术"]
summary: "记录我如何基于 ROS 2 Humble、ros_gz 和本地四旋翼模型，搭建一个可直接运行的无人机仿真场景，并整理出目录结构、关键文件说明、运行命令和踩坑记录。"
---
```

**Step 4: Run test to verify it passes**

Run: `cd ~/blog && rg -n "^title:|^date:|^tags:|^categories:|^summary:" content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: PASS with all required front matter fields present

**Step 5: Commit**

```bash
cd ~/blog
git add content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx
git commit -m "feat: add uav simulation blog post skeleton"
```

### Task 2: Write the architecture and structure sections

**Files:**
- Modify: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
- Test: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`

**Step 1: Write the failing test**

Use this section checklist:

```text
- 适用范围
- 这次搭的是什么场景
- 工作区结构
- 核心文件说明
```

**Step 2: Run test to verify it fails**

Run: `cd ~/blog && rg -n "^## 适用范围|^## 这次搭的是什么场景|^## 工作区结构|^## 核心文件说明" content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: FAIL because the sections do not exist yet

**Step 3: Write minimal implementation**

Add article sections that:

- explain this article assumes ROS 2 and Gazebo are already installed
- link to:
  - `/blog/ubuntu-22-04-install-ros2-humble`
  - `/blog/ubuntu-22-04-install-gazebo-fortress`
- describe the UAV open-field scene
- include a `uav_sim_ws` directory tree
- explain the responsibilities of:
  - `worlds/open_field.sdf`
  - `models/quadrotor/model.sdf`
  - `config/bridge.yaml`
  - `launch/open_field_uav.launch.py`
  - `scripts/takeoff_demo.py`

**Step 4: Run test to verify it passes**

Run: `cd ~/blog && rg -n "^## 适用范围|^## 这次搭的是什么场景|^## 工作区结构|^## 核心文件说明" content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: PASS

**Step 5: Commit**

```bash
cd ~/blog
git add content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx
git commit -m "feat: add uav simulation architecture sections"
```

### Task 3: Write the runnable setup and verification steps

**Files:**
- Modify: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
- Test: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`

**Step 1: Write the failing test**

Use this runnable-content checklist:

```text
- colcon build command exists
- ros2 launch command exists
- ros2 run takeoff_demo.py command exists
- ros2 topic list verification exists
```

**Step 2: Run test to verify it fails**

Run: `cd ~/blog && rg -n "colcon build|ros2 launch uav_open_field_sim|ros2 run uav_open_field_sim takeoff_demo.py|ros2 topic list" content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: FAIL because the runnable steps do not exist yet

**Step 3: Write minimal implementation**

Add sections that include:

- clone command for `https://github.com/goodniceqingwa/uav_sim_ws`
- dependency install command
- build command
- launch command
- demo command
- topic verification command

Also explain what the reader should expect to see when the simulation starts.

**Step 4: Run test to verify it passes**

Run: `cd ~/blog && rg -n "colcon build|ros2 launch uav_open_field_sim|ros2 run uav_open_field_sim takeoff_demo.py|ros2 topic list" content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: PASS

**Step 5: Commit**

```bash
cd ~/blog
git add content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx
git commit -m "feat: add uav simulation run guide"
```

### Task 4: Add troubleshooting and reuse guidance

**Files:**
- Modify: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
- Test: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`

**Step 1: Write the failing test**

Use this troubleshooting checklist:

```text
- mention Link ... could not be found
- mention allocation matrix rank is 3
- mention ros2 run executable issue
- mention GitHub reuse link
```

**Step 2: Run test to verify it fails**

Run: `cd ~/blog && rg -n "Link .* could not be found|allocation matrix rank is 3|No executable found|github.com/goodniceqingwa/uav_sim_ws" content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: FAIL because troubleshooting content does not exist yet

**Step 3: Write minimal implementation**

Add:

- a troubleshooting section with the three real issues encountered
- short explanations of root cause and fix direction
- a reuse section showing how others can clone and run the project

**Step 4: Run test to verify it passes**

Run: `cd ~/blog && rg -n "Link .* could not be found|allocation matrix rank is 3|No executable found|github.com/goodniceqingwa/uav_sim_ws" content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`
Expected: PASS

**Step 5: Commit**

```bash
cd ~/blog
git add content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx
git commit -m "feat: add uav simulation troubleshooting guide"
```

### Task 5: Verify blog integration

**Files:**
- Modify: `blog/content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx`

**Step 1: Write the failing test**

Use a final acceptance checklist:

```text
- article path is correct
- front matter parses
- internal links present
- article appears in local content build
```

**Step 2: Run test to verify it fails**

Run: `cd ~/blog && npm run build`
Expected: If article formatting is invalid, the build fails and identifies the issue

**Step 3: Write minimal implementation**

Fix any MDX / front matter / content formatting issues surfaced by the build.

Then optionally preview locally:

```bash
cd ~/blog
npm run dev
```

Open the new article route:

```text
/blog/ros2-humble-gazebo-uav-open-field-simulation
```

**Step 4: Run test to verify it passes**

Run: `cd ~/blog && npm run build`
Expected: PASS with a successful Next.js production build

**Step 5: Commit**

```bash
cd ~/blog
git add content/blog/ros2-humble-gazebo-uav-open-field-simulation.mdx
git commit -m "docs: publish uav simulation blog post"
```
