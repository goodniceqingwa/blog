# Gazebo Fortress Blog Post Design

**Date:** 2026-03-11

## Goal

Publish a Chinese blog post on `qingwaaa.top` that documents the real installation process for Gazebo Fortress on Ubuntu 22.04 and includes the ROS 2 Humble integration package `ros_gz`.

## Audience

- Chinese readers using Ubuntu 22.04
- Users who already installed or plan to use ROS 2 Humble
- Readers who want a practical, copy-paste friendly installation guide

## Scope

- Add one new MDX blog post under `content/blog/`
- Include:
  - environment scope and prerequisites
  - why the article uses Gazebo Fortress
  - one-click Bash installation script
  - execution instructions
  - post-install verification commands
  - explanation of installed packages
  - common issues and caveats
- Do not add a separate asset download file

## Content Decisions

- Positioning: practical installation article, not a deep history of Gazebo naming
- Keep writing style aligned with the ROS 2 installation article already published
- Title: `Ubuntu 22.04 安装 Gazebo Fortress 实战：附 ROS 2 Humble 集成与一键安装脚本`
- Script policy:
  - no hardcoded passwords
  - use `sudo` normally
  - fail early on non-`Ubuntu 22.04`
  - install `ignition-fortress` and `ros-humble-ros-gz`
  - keep `.bashrc` edits idempotent
  - verify both Gazebo CLI and ROS bridge availability

## Technical Notes

- Blog is a Next.js + MDX static export site
- This is a content-only change unless MDX syntax issues appear during build
- Verification will rely on `npm run build`

## Verification Plan

- Run the production build to confirm MDX parsing and route generation
- If build succeeds, the new post is considered render-safe for deployment
