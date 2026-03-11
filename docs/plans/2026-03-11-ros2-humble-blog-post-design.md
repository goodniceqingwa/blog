# ROS 2 Humble Blog Post Design

**Date:** 2026-03-11

## Goal

Publish a Chinese blog post on `qingwaaa.top` that documents the real ROS 2 installation process completed on this machine and includes a reusable one-click installation script.

## Audience

- Chinese readers
- Primary target: Ubuntu 22.04 users who want ROS 2 Humble
- Preference: copy-paste friendly, low ambiguity, practical steps

## Scope

- Add one new MDX blog post under `content/blog/`
- Include:
  - environment scope and prerequisites
  - concise explanation of the installation path used
  - full one-click Bash script
  - run instructions
  - verification commands
  - common issues and caveats
- Do not add a separate download page or asset file

## Content Decisions

- Positioning: practical installation article, not theory-heavy ROS introduction
- Title: `Ubuntu 22.04 安装 ROS 2 Humble 实战：附一键安装脚本`
- Script policy:
  - do not hardcode passwords
  - use `sudo` normally
  - detect unsupported systems and stop early
  - keep `.bashrc` updates idempotent
  - initialize and update `rosdep`

## Technical Notes

- Blog is a Next.js + MDX site
- New article should match existing front matter format
- No separate application code changes are required unless the MDX content reveals rendering issues

## Verification Plan

- Run site build to verify the new MDX parses correctly
- Confirm the post appears in the generated blog index via successful build
