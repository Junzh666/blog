---
title: 解决vimplus中youcompleteme无法使用的问题
description: 
date: 2024-01-19 17:08:27
cover: /assets/images/vimplus-logo.png
isOriginal: true
category:
  - Linux
  - 运维
tag:
  - vim
  - 插件
---

::: tip
参考：vimplus官方github仓库：<https://github.com/chxuan/vimplus>
:::

## 安装

```bash
git clone https://github.com/chxuan/vimplus.git ~/.vimplus
cd ~/.vimplus
./install.sh
```

安装完成后使用`vim`命令编辑文件时，会提示：

```txt
The ycmd server SHUT DOWN (restart with ':YcmRestartServer')...
```

解决办法：使用`apt`重新安装`vim-youcompleteme`

```bash
sudo apt update
sudo apt install vim-youcompleteme
vim-addons remove youcompleteme
vim-addons install youcompleteme
```
