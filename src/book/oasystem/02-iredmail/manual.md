---
title: 使用说明
order: 6
date: 2024-01-17
article: false
category:
    - Linux
    - 运维
tag:
    - iredmail
    - 邮件
---

## 系统信息

iRedMail所有服务及组件的地址、端口、账户数据可以在`/root/iRedMail-x.x.x/iRedMail.tips`中查到。

## 创建用户

iRedMail用户其实就是OpenLDAP用户，不建议手动创建，可使用iRedMail官方提供的脚本进行创建，经测试bash版本可用，python版本不可用，如需嵌入python应用请自行修改和测试官方py脚本。

### 修改脚本

编辑`/root/iRedMail-1.6.3/tools/create_mail_user_OpenLDAP.sh`文件，需要修改的内容：

```shell
LDAP_SUFFIX="dc=mydomain,dc=com"        # LDAP后缀
DEFAULT_PASSWD='12345678'      # 用户默认密码
USE_DEFAULT_PASSWD='YES'               # 是否启用默认密码
```

### 添加用户

```bash
./create_mail_user_OpenLDAP.sh <your domain> <username>
```
