---
title: 安装过程
order: 2
date: 2024-01-17
category:
    - linux
    - 运维
tag:
    - iredmail
    - 邮件
---
> [!important]
> 由于iRedMail集成环境所安装的组件过多，如MySQL, OpenLDAP, Postfix, Dovecot, Amavisd服务将在iRedMail安装过程中被自动安装。请保证系统的纯净性，否则iRedMail将安装失败。

## 开始安装

进入解压后的iRedMail安装目录，执行安装文件。

```bash
cd /root/iRedMail-x.y.z/
bash iRedMail.sh
```

## 安装过程

iRedMail整个安装过程是需要用户通过交互设定所需的安装参数，并不能通过教程全自动进行安装。以下是完整安装过程中出现的所有需要交互的页面示例：

### 交互界面1

![执行脚本成功后的欢迎界面](https://docs.iredmail.org/images/installation/welcome.png)

### 交互界面2

![执行邮件的存储目录。默认是/var/vmail/](https://docs.iredmail.org/images/installation/mail\_storage.png)

### 交互界面3

![选择后端存储邮件账户的组件，选择OpenLDAP](https://docs.iredmail.org/images/installation/backends.png)

### 交互界面4

![输入：dc=mydomain.com,dc=com](https://docs.iredmail.org/images/installation/ldap\_suffix.png)

### 交互界面5

![输入：demo.mydomain.com](https://docs.iredmail.org/images/installation/first\_domain.png)

### 交互界面6

![这里是邮箱管理员密码，建议输入大于12位且包含特殊字符的强密码](https://docs.iredmail.org/images/installation/admin\_pw.png)

### 交互界面7

![保持默认选项即可](https://docs.iredmail.org/images/installation/optional\_components.png)

### 交互界面8

![输入：y](https://docs.iredmail.org/images/installation/review.png)

安装程序会自动下载所需文件，并自动安装完成。
