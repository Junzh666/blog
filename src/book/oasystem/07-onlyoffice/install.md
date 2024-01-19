---
title: 安装
order: 1
date: 2024-01-18
category:
    - linux
    - 运维
tag:
    - onlyoffice
    - 在线文档
---

## 创建容器

获取床架你容器所需文件：

```bash
git clone https://github.com/ONLYOFFICE/Docker-DocumentServer.git
cd Docker-DocumentServer
```

修改`docker-compose.yml`文件：

::: code-tabs#language
@tab docker-compose.yml

```yaml
 version: '2'
 services:
   onlyoffice-documentserver:
     build:
       context: .
     container_name: onlyoffice-documentserver
     depends_on:
       - onlyoffice-postgresql
       - onlyoffice-rabbitmq
     environment:
       - DB_TYPE=postgres
       - DB_HOST=onlyoffice-postgresql
       - DB_PORT=5432
       - DB_NAME=onlyoffice
       - DB_USER=onlyoffice
       - AMQP_URI=amqp://guest:guest@onlyoffice-rabbitmq
       # Uncomment strings below to enable the JSON Web Token validation.
       - JWT_ENABLED=true
       - JWT_SECRET=secret
       - JWT_HEADER=Authorization
       - JWT_IN_BODY=true
     ports:
       - '8880:80'
       - '6443:443'
     stdin_open: true
     restart: always
     stop_grace_period: 60s
     volumes:
        - /var/www/onlyoffice/Data
        - /var/log/onlyoffice
        - /var/lib/onlyoffice/documentserver/App_Data/cache/files
        - /var/www/onlyoffice/documentserver-example/public/files
        - /usr/share/fonts
   onlyoffice-rabbitmq:
     container_name: onlyoffice-rabbitmq
     image: rabbitmq
     restart: always
     expose:
       - '5672'

   onlyoffice-postgresql:
     container_name: onlyoffice-postgresql
     image: postgres:9.5
     environment:
       - POSTGRES_DB=onlyoffice
       - POSTGRES_USER=onlyoffice
       - POSTGRES_HOST_AUTH_METHOD=trust
     restart: always
     expose:
       - '5432'
     volumes:
       - postgresql_data:/var/lib/postgresql

 volumes:
   postgresql_data:
```

:::

## 配置HTTPS

创建`onlyoffice.conf`内容为：

::: code-tabs#language
@tab onlyoffice.conf

```nginx

upstream docservice {
   server 127.0.0.1:8880;
 }

 map $http_host $this_host {
     "" $host;
     default $http_host;
 }

 map $http_x_forwarded_proto $the_scheme {
      default $http_x_forwarded_proto;
      "" $scheme;
 }

 map $http_x_forwarded_host $the_host {
     default $http_x_forwarded_host;
     "" $this_host;
 }

 map $http_upgrade $proxy_connection {
   default upgrade;
   "" close;
 }

 proxy_set_header Upgrade $http_upgrade;
 proxy_set_header Connection $proxy_connection;
 proxy_set_header X-Forwarded-Host $the_host;
 proxy_set_header X-Forwarded-Proto $the_scheme;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 server {
      listen 44446 ssl http2;
      listen [::]:44446 ssl http2;
      server_name demo.mydomain.com;
   server_tokens off;
   root /usr/share/nginx/html;

   ## Strong SSL Security
   ## https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html
   ssl on;
   ssl_certificate /etc/nginx/cert/demo.mydomain.com.pem;
   ssl_certificate_key /etc/nginx/cert/demo.mydomain.com.key;
   ssl_verify_client off;

   ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";

   ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
   ssl_session_cache  builtin:1000  shared:SSL:10m;

   ssl_prefer_server_ciphers   on;

   ## [Optional] Before enabling Strict-Transport-Security headers, ensure your server is properly configured for SSL.
   ## This directive informs the browser to always use HTTPS. For more info see:
   ## - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
   # add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
   # add_header X-Frame-Options SAMEORIGIN;
   add_header X-Content-Type-Options nosniff;
      location / {
     proxy_pass http://docservice;
     proxy_http_version 1.1;
   }
 }
```

:::
