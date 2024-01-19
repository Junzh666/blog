---
title: OpenLDAP的迁移和备份
date: 2024-01-19
isOriginal: true
star: true
category:
    - Linux
    - 运维
tag: 
    - 迁移
    - 备份
    - LDAP
---

## 原服务器

生成备份数据：

```bash
mkdir -p openldap/{config,lib}
sudo cp -r /var/lib/ldap openldap/lib/
sudo cp -r /etc/ldap openldap/config/

# 打包
sudo tar czvf openldap.tar.gz openldap
```

将文件copy到新服务器上。

## 新服务器

安装OpenLDAP:

```bash
sudo apt update
sudo apt -y install slapd ldap-utils 
```

清空本地OpenLDAP数据：

```bash
sudo systemctl stop slapd.service
sudo rm -rf /var/lib/ldap/*
sudo rm -rf /etc/ldap/*
```

开始迁移：

```bash
# 解压
tar zxvf openldap.tar.gz
sudo cp -r openldap/config/ldap/* /etc/ldap/
sudo cp -r openldap/lib/ldap/* /var/lib/ldap/

# 修改权限
sudo chown -R openldap:openldap /var/lib/ldap/
sudo chown -R openldap:openldap /etc/ldap/{ldap.conf,slapd.conf,slapd.d}

# 重启openldap
sudo systemctl restart slapd.service
```
