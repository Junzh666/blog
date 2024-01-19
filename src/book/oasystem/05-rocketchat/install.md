---
title: 安装
order: 1
date: 2024-01-18
article: false
category:
    - linux
    - 运维
tag:
    - rocketchat
    - 聊天
---

## 创建容器

```bash
mkdir -p ~/work/rocketchat && cd ~/work/rocketchat
touch docker-compose.yml
```

::: code-tabs#language
@tab docker-compose.yml

```yaml
 volumes:
     mongodb_data: { driver: local }
 services:
   rocketchat:
     image: registry.rocket.chat/rocketchat/rocket.chat:6.2.0
     restart: on-failure
     labels:
       traefik.enable: "true"
       traefik.http.routers.rocketchat.rule: Host(`${DOMAIN}`)
       traefik.http.routers.rocketchat.tls: "true"
       traefik.http.routers.rocketchat.entrypoints: https
       traefik.http.routers.rocketchat.tls.certresolver: le
     environment:
       ADMIN_USERNAME: rc.admin
       ADMIN_PASS: <set your password>
       MONGO_URL: "${MONGO_URL:-mongodb://${MONGODB_ADVERTISED_HOSTNAME:-mongodb}:${MONGODB_INITIAL_PRIMARY_PORT_NUMBER:-27017}/${MONGODB_DATABASE:-rocketchat}?replicaSet=${MONGODB_REPLICA_SET_NAME:-rs0}}"
       MONGO_OPLOG_URL: "${MONGO_OPLOG_URL:-mongodb://${MONGODB_ADVERTISED_HOSTNAME:-mongodb}:${MONGODB_INITIAL_PRIMARY_PORT_NUMBER:-27017}/local?replicaSet=${MONGODB_REPLICA_SET_NAME:-rs0}}"
     extra_hosts:
       - "host.docker.internal:host-gateway"
     depends_on:
       - mongodb
     expose:
       - ${PORT:-3000}
     ports:
       - "${BIND_IP:-0.0.0.0}:${HOST_PORT:-3000}:${PORT:-3000}"

   mongodb:
     image: docker.io/bitnami/mongodb:latest
     restart: on-failure
     volumes:
       - mongodb_data:/bitnami/mongodb
     environment:
       MONGODB_REPLICA_SET_MODE: primary
       MONGODB_REPLICA_SET_NAME: ${MONGODB_REPLICA_SET_NAME:-rs0}
       MONGODB_PORT_NUMBER: ${MONGODB_PORT_NUMBER:-27017}
       MONGODB_INITIAL_PRIMARY_HOST: ${MONGODB_INITIAL_PRIMARY_HOST:-mongodb}
       MONGODB_INITIAL_PRIMARY_PORT_NUMBER: ${MONGODB_INITIAL_PRIMARY_PORT_NUMBER:-27017}
       MONGODB_ADVERTISED_HOSTNAME: ${MONGODB_ADVERTISED_HOSTNAME:-mongodb}
       MONGODB_ENABLE_JOURNAL: ${MONGODB_ENABLE_JOURNAL:-true}
       ALLOW_EMPTY_PASSWORD: ${ALLOW_EMPTY_PASSWORD:-yes}
```

:::

使用`docker compose up -d`启动容器。

## 重置管理员密码（可选）

进入mongo容器：

```bash
docker exec -it rocketchat-mongodb-1 /bin/bash
mongsh
```

```mongodb
use rocketchat
db.getCollection('users').update({username:"rc.admin"}, { $set: {"services" : { "password" : {"bcrypt" : "$2a$10$n9CM8OgInDlwpvjLKLPML.eizXIzLlRtgCh3GRLafOdR9ldAUh/KG" } } } })
```

## 配置HTTPS

创建nginx配置文件

```bash
sudo vim /etc/nginx/sites-enabled/rocketchat.conf
```

::: code-tabs#language
@tab rocketchat.conf

```nginx
 server {
     listen 44443 ssl http2;
     listen [::]:44443 ssl http2;
     server_name demo.mydomain.com;

     location / {
         proxy_pass http://127.0.0.1:3000;
         proxy_http_version 1.1;  
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host $host; 
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection "upgrade";
         proxy_set_header Host $host;
     }
     include /etc/nginx/templates/ssl.tmpl;
 }
```

:::

重启nginx:

```shell
sudo service nginx reload
```

在浏览器中打开链接: <https://demo.mydomain.com:44443> 根据指引完成初始化操作。

**安装过程到此结束，下面是有可能出现的问题，如果没有出现该问题则忽略后面的内容。**

>[!note]
> 如果服务器重启后导致rocketchat-rocketchat-1无法启动，如果检查日志发现是无法连接mongodb导致的话，有可能是compose文件中的admin.rc用户的密码与mongodb中存贮的密码不匹配导致的可以用如下脚本生成对应密码的bcrypt字符串。

::: code-tabs#language
@tab demo.py

```python
import bcrypt

# 要加密的字符串
input_string = "123456"

# 生成bcrypt哈希值
hashed = bcrypt.hashpw(input_string.encode('utf-8'), bcrypt.gensalt())

# 打印哈希值
print(hashed)
```

:::

执行这个文件后会获得对应的bcrypt字符串，然后在compose文件中把bcrypt字符串修改为生成的字符串，重新build

```bash
docker compose up --build rocketchat
```
