---
title: "Ubuntu 22.04 中文输入法配置指南"
date: 2026-02-27
draft: false
tags: ["Linux", "Ubuntu", "输入法", "Qt"]
categories: ["技术"]
summary: "解决 Ubuntu 22.04 GNOME Wayland 环境下 Qt Creator 及其他应用无法输入中文的问题。"
ShowToc: true
TocOpen: true
---

## 问题描述

在 Ubuntu 22.04 (GNOME + Wayland) 环境下，Qt Creator 和部分应用无法输入中文。

## 环境分析

| 项目 | 值 |
|---|---|
| 系统 | Ubuntu 22.04.5 LTS |
| 桌面 | GNOME (Wayland) |
| 输入法框架 | ibus（Wayland 下唯一可用） |

> **关键点：** GNOME + Wayland 环境下，fcitx4 无法正常工作，必须使用 ibus。

## 解决方案

### 1. 安装必要软件包

```bash
sudo apt install ibus ibus-libpinyin ibus-gtk ibus-gtk3 ibus-gtk4
```

### 2. 设置环境变量

编辑 `/etc/environment`：

```
GTK_IM_MODULE=ibus
QT_IM_MODULE=ibus
XMODIFIERS=@im=ibus
```

创建 `~/.xprofile`：

```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
```

### 3. 配置默认输入法

```bash
im-config -n ibus
```

### 4. 添加中文输入源

```bash
gsettings set org.gnome.desktop.input-sources sources \
  "[('xkb', 'us'), ('ibus', 'libpinyin')]"
```

### 5. 注销重新登录

使用 `Super + Space` 切换输入法。

## Qt Creator 专项

如果 Qt Creator 自带的插件目录缺少 ibus 插件，需要手动复制：

```bash
cp /usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/libibusplatforminputcontextplugin.so \
   ~/Qt5.15.2/Tools/QtCreator/lib/Qt/plugins/platforminputcontexts/
```
