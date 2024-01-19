---
title: 本地快速安装一个vsftp服务
date: 2024-01-19
cover: /assets/images/vsftpd-1.png
sticky: 99
isOriginal: true
category:
    - Linux
    - 运维
tag: 
    - ftp
---

## 安装服务

```shell
sudo apt update
sudo apt install vsftpd
```

## 创建用户

```shell
sudo adduser ftpuser
sudo mkdir /opt/ftp
sudo chown -R ftpuser:ftpuser /opt/ftp 
```

## 修改配置

/etc/vsftpd.conf文件内容：

::: code-tabs#language
@tab vscftpd.conf

```config
listen=NO
listen_ipv6=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
local_root=/opt/ftp
allow_writeable_chroot=YES

secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO
```

:::
