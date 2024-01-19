---
title: 准备工作
order: 1
date: 2024-01-17
category:
    - linux
    - 运维
tag:
    - iredmail
    - 邮件
---
>[!note]
>大多数ISP会限制25端口（smtp），请与ISP沟通解除25端口限制，否则iRedmail将无法正常发送邮件。

## 设置FQDN

编辑`/etc/hosts`文件，内容如下：

```bash
127.0.0.1 mail.mydomain.com sz-demo localhost localhost.localdomain
```

## 修改apt源为阿里云源或清华源

::: tabs

@tab:active 阿里云镜像

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo cat > /etc/apt/sources.list << EOF
deb https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse

# deb https://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
EOF
```

@tab 清华大学镜像

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo cat > /etc/apt/sources.list << EOF
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
# deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
EOF
```

:::

## 安装iRedMail所需组件

```shell
sudo apt-get install gzip dialog
```

## 下载iRedMail

* 访问[下载页面](https://www.iredmail.org/download.html)，下载最新的稳定版程序
* 上传到服务器`/root/iRedMail-x.y.z.tar.gz`
* 解压安装包：

```shell
cd /root
tar zxf iRedMail-x.y.z.tar.gz
```

> 参考文档：[iRedmail官方安装文档](https://docs.iredmail.org/install.iredmail.on.debian.ubuntu.html)
