---
title: 配置Nginx
order: 3
---
Nginx为iRedMail安装过程中自动安装，无需另外手动安装。但默认安装的nginx并不能直接拿来正式使用，需要修改配置文件。

## 上传ssl证书

将证书文件上传到服务器的`/etc/nginx/cert`，当然你也可以放在自己习惯的目录下。

crt文件：`demo.mydomain.com.pem`

key文件：`demo.mydomain.com.key`

## 修改配置

编辑`/etc/nginx/sites-enabled/00-default-ssl.conf`文件，修改如下内容：

```nginx
listen 44444 ssl http2;
listen [::]:44444 ssl http2;
server_name demo.mydomain.com;
```

删除`/etc/nginx/sites-enabled/00-default.conf`文件，不开放80端口：

```bash
sudo rm /etc/nginx/sites-enabled/00-default.conf
```

## 重启nginx

```bash
sudo service nginx restart
```
