---
title: 解决问题
order: 3
---

## 无法访问market place

可能是DNS解析不正确造成的，将服务器的DNS地址改为8.8.8.8和114.114.114.114。

## 解除Rocket.Chat上传文件大小限制

### Rocket.Chat设置

workspace -> Settings -> File Upload -> Maximum File Upload Size (in bytes)  设置为 1073741824 (1GB)

### Nginx设置

编辑本地nginx配置文件：`/etc/nginx/conf-enabled/client_max_body_size.conf`修改内容为：

```nginx
client_max_body_size 1024000m;
```
