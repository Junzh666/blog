---
title: 搭建私有apt镜像站
date: 2024-01-19
star: 1
category:
    - linux
    - 运维
tag: 
    - 镜像
    - apt
    - 私有
---

::: tip
本文搭建的apt镜像站只针对x86架构的Ubuntu 22.04。
:::

## 安装apache2

```bash
sudo apt install -y apache2
sudo systemctl enable apache2
```

## 创建mirror数据所在目录

```bash
mkdir /home/ubuntu/mirrors
sudo chown www-data:www-data /home/ubuntu/mirrors
```

## 安装apt-mirror

```bash
sudo apt update
sudo apt install -y apt-mirror
```

## 配置apt-mirror

```bash
sudo cp /etc/apt/mirror.list /etc/apt/mirror.list-bak
```

::: code-tabs#language
@tab mirror.list

```list
 deb-amd64 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
 deb-amd64 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
 deb-amd64 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
 deb-amd64 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
 deb-amd64 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

 deb-i386 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
 deb-i386 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
 deb-i386 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
 deb-i386 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
 deb-i386 https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

 clean https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
```

:::

## 启动mirror拉取数据

```bash
sudo apt-mirror
```

可以在byobu/tmux中运行，也可以丢到后台：

```bash
nohup sudo apt-mirror &
tail nohup.out
```

## 问题1

在使用apt-mirror工具下载ubuntu22[镜像源](https://so.csdn.net/so/search?q=%E9%95%9C%E5%83%8F%E6%BA%90&spm=1001.2101.3001.7020)导入内网后，apt-get update发现缺少dep11，cnf及binary-i386下的一些索引文件，导致更新失败，无法正常使用。这是由于apt-mirror在2017年就停止了维护更新，之后出现的ubuntu20和ubuntu22更新了仓库的索引文件，apt-mirror没有办法兼容。

### 方法1

创建一个脚本`fix-errors.sh`自动下载这些文件：

```bash
#!/bin/bash

cd /home/ubuntu/mirrors/mirror/mirrors.tuna.tsinghua.edu.cn/ubuntu/dists

for dist in jammy jammy-updates jammy-security jammy-backports; do
  for comp in main multiverse universe; do
    for size in 48 64 128; do
    wget http://mirrors.tuna.tsinghua.edu.cn/ubuntu/dists/$dist/$comp/dep11/icons-${size}x${size}@2.tar.gz -O $dist/$comp/dep11/icons-${size}x${size}@2.tar.gz;
   done
 done
done

cd /var/tmp
for p in "${1:-jammy}"{,-{security,updates,backports}}\
/{main,restricted,universe,multiverse};do >&2 echo "${p}"
#echo '-----'
#echo "http://mirrors.tuna.tsinghua.edu.cn/ubuntu/dists/${p}/cnf/Commands-amd64.xz"
wget -q -c -r -np -R "index.html*" "http://mirrors.tuna.tsinghua.edu.cn/ubuntu/dists/${p}/cnf/Commands-amd64.xz"
wget -q -c -r -np -R "index.html*" "http://mirrors.tuna.tsinghua.edu.cn/ubuntu/dists/${p}/cnf/Commands-i386.xz"
wget -q -c -r -np -R "index.html*" "http://mirrors.tuna.tsinghua.edu.cn/ubuntu/dists/${p}/binary-i386/"
done

sudo cp -av mirrors.tuna.tsinghua.edu.cn/ubuntu/ /home/ubuntu/mirrors/mirror/mirrors.tuna.tsinghua.edu.cn
```

### 方法2

修改`/usr/bin/apt-mirror`文件：

在`add_url_to_download( $url . $_ . "/binary-" . $arch . "/Packages.xz" );`下添加一行：
`add_url_to_download( $url . $_ . "/cnf/Commands-" . $arch . ".xz" );`

注释掉：`$uri =~ s/^([^@]+)?@?// if $uri =~ /@/;`

::: tip
参考资料：
<https://www.linuxtechi.com/setup-local-apt-repository-server-ubuntu/>
<https://blog.csdn.net/qq_41280188/article/details/128534607>
:::

## 问题2

如果apache出现权限问题注意2个地方

1. 将源目录的权限修改为www-data用户
1. 将www-data加入ubuntu组

## 创建一个contab每日同步一次mirrors

```crontab
00  01  *  *  *  /usr/bin/apt-mirror
```

## 客户端

```list
deb  http://mirrors.iciwh.com/ubuntu/ jammy main restricted universe multiverse
deb  http://mirrors.iciwh.com/ubuntu/ jammy-security main restricted universe multiverse
deb  http://mirrors.iciwh.com/ubuntu/ jammy-updates main restricted universe multiverse
deb  http://mirrors.iciwh.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb  http://mirrors.iciwh.com/ubuntu/ jammy-backports main restricted universe multiverse
```

## 发布镜像

```bash
sudo ln -s /home/ubuntu/mirrors/mirror/mirrors.tuna.tsinghua.edu.cn/ubuntu /var/www/html/ubuntu
```
