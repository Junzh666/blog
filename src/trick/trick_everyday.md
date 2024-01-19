---
title: 每天一个小命令（持续更新）
description: 每天一个小命令。
date: 2024-01-19 17:16:02
cover: /assets/images/trick_home.png
sticky: 100
star: 100
isOriginal: true
category:
  - 运维
  - linux
tag:
  - 技巧
  - 命令
---

## iperf3

iperf3 是一个网络性能测试工具，它可以测量 TCP 和 UDP 带宽质量。安装iperf3的方法非常简单：

```bash
sudo apt update
sudo apt install iperf3
```

使用方法：

- 在服务器A上执行:

```bash
iperf3 -s
```

- 在服务区B上执行：

```bash
iperf3 -c <server A ip >
```

会看到两台服务器之间的网络传输带宽和质量。

## cloc

cloc（Count Lines of Code）是一个用于统计源代码行数的命令行工具，可以统计空白行、注释行和实际代码行。

常见用法：

1. 统计单个文件的代码行数：`cloc filename`

1. 统计多个文件的代码行数：`cloc filename1 filename2`

1. 统计目录中所有文件的代码行数：`cloc directory_name`

1. 排除某些文件或目录：`cloc --exclude-dir=dir1,dir2 --exclude-ext=ext1,ext2 directory_name`

1. 对比两个版本的代码差异：`cloc --diff file_v1 file_v2`

1. 如果要统计在当前目录下所有 Python文件的行数: `cloc --include-lang=Python`

## http.server

在linux系统中，可以通过很多工具和服务传输文件，如ftp、ssh等，如果我们需要快速将某些文件传输给某人，又不想搭建或创建新的用户，可以用下面的命令创建一个web下载页面。

```bash
python3 -m http.server
```

它会为**当前**目录下创建一个web下载页面，端口默认是`8000`。当用户下载完毕后，使用`CTRL+c`关闭下载页。
