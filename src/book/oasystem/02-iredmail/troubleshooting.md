---
title: 解决问题
order: 7
---
## iRedMail手法邮件延迟问题

一般是由于本地DNS解析出错或超时导致，日志包含如下内容：

* `Host or domain name not found.`
* `MX: Host not found, try again`

解决方法：将iRedMail服务器的DNS服务器修改为公网DNS。

不同的发行版修改DNS的方式不同，Ubuntu 22.04下直接修改/etc/resolv.conf文件只会临时生效，永久修改的方法参考：xxxxxx



{% hint style="success" %}
以下为大陆地区建议使用的DNS地址

阿里云：223.5.5.5, 223.6.6.6

电信：114.114.114.114

百度：180.76.76.76

Google：8.8.8.8, 8.4.4.4
{% endhint %}

## iredmail无法接收某些后缀的邮件

由于iredmail的白名单机制造成的，对某些域名关闭白名单

```
cd /opt/iredapd/tools
./greylisting_admin.py --disable --from '@qq.com'

```
