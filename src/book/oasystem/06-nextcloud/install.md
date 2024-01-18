---
title: 安装
order: 1
---

## 创建容器所需的文件

`vim db.env`

::: code-tabs#language
@tab db.env

```env
MYSQL_PASSWORD=qwer1234
MYSQL_DATABASE=nextcloud
MYSQL_USER=nextcloud
```

:::
*这里使用的是弱密码，请自行修改*

创建本地目录：

```bash
mkdir certdata proxy vhostdata web certdata dbdata htmldata
```

把ssl证书copy到certdata目录下。

## 配置Nginx proxy

**以下配置均在刚才创建的`proxy`目录中，请cd到该目录创建文件和操作。**

**1. 创建`Dockerfile`文件，内容如下：**

::: code-tabs#language
@tab Dockerfile

```Dockerfile
FROM nginxproxy/nginx-proxy:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY uploadsize.conf /etc/nginx/conf.d/uploadsize.conf
```

:::

**2. 创建`nginx.conf`配置文件:**

::: code-tabs#language
@tab nginx.conf

```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  10240;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/vhost.d/*;
    include /etc/nginx/conf.d/*.conf;
}
daemon off;
```

:::

**3. 创建`uploadsize.conf`文件：**
::: code-tabs#language

@tab uploadsize.conf

```nginx
client_max_body_size 10G;
proxy_request_buffering off;
proxy_read_timeout 300s;
```

:::
