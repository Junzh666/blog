---
title: 安装
order: 1
date: 2024-01-18
article: false
category:
    - linux
    - 运维
tag:
    - nextcloud
    - nas
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

## 配置vhostdata

**以下配置均在刚才创建的`vhostdata`目录中，请cd到该目录创建文件和操作。**

创建名为`ssl`的nginx配置文件:

::: code-tabs#language
@tab ssl

```nginx
server {
    listen              443 ssl;
    server_name         demo.mydomain.com;
    ssl_certificate     certs/demo.mydomain.com.pem;
    ssl_certificate_key certs/demo.mydomain.com.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    proxy_read_timeout 300s;

        location / {
        proxy_pass http://nas;
    }
}
```

:::

## 配置Web

**以下配置均在刚才创建的`web`目录中，请cd到该目录创建文件和操作。**

创建`Dockerfile`文件：

::: code-tabs#language
@tab Dockerfile

```Dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
```

:::

创建`nginx.conf`配置文件:

::: code-tabs#language
@tab nginx.conf

```nginx
worker_processes auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
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

    # Prevent nginx HTTP Server Detection
    server_tokens   off;

    keepalive_timeout  65;

    #gzip  on;
    proxy_read_timeout 300s; 

    upstream php-handler {
        server app:9000;
    }

    server {
        listen 80;

        # HSTS settings
        # WARNING: Only add the preload option once you read about
        # the consequences in https://hstspreload.org/. This option
        # will add the domain to a hardcoded list that is shipped
        # in all major browsers and getting removed from this list
        # could take several months.
        #add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;" always;

        # set max upload size
        client_max_body_size 512M;
        fastcgi_buffers 64 4K;

        proxy_connect_timeout    600;
        proxy_read_timeout       600;
        proxy_send_timeout       600;

        # Enable gzip but do not remove ETag headers
        gzip on;
        gzip_vary on;
        gzip_comp_level 4;
        gzip_min_length 256;
        gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
        gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;

        # Pagespeed is not supported by Nextcloud, so if your server is built
        # with the `ngx_pagespeed` module, uncomment this line to disable it.
        #pagespeed off;

        # HTTP response headers borrowed from Nextcloud `.htaccess`
        add_header Referrer-Policy                      "no-referrer"   always;
        add_header X-Content-Type-Options               "nosniff"       always;
        add_header X-Download-Options                   "noopen"        always;
        add_header X-Frame-Options                      "SAMEORIGIN"    always;
        add_header X-Permitted-Cross-Domain-Policies    "none"          always;
        add_header X-Robots-Tag                         "none"          always;
        add_header X-XSS-Protection                     "1; mode=block" always;

        # Remove X-Powered-By, which is an information leak
        fastcgi_hide_header X-Powered-By;

        # Path to the root of your installation
        root /var/www/html;

        # Specify how to handle directories -- specifying `/index.php$request_uri`
        # here as the fallback means that Nginx always exhibits the desired behaviour
        # when a client requests a path that corresponds to a directory that exists
        # on the server. In particular, if that directory contains an index.php file,
        # that file is correctly served; if it doesn't, then the request is passed to
        # the front-end controller. This consistent behaviour means that we don't need
        # to specify custom rules for certain paths (e.g. images and other assets,
        # `/updater`, `/ocm-provider`, `/ocs-provider`), and thus
        # `try_files $uri $uri/ /index.php$request_uri`
        # always provides the desired behaviour.
        index index.php index.html /index.php$request_uri;

        # Rule borrowed from `.htaccess` to handle Microsoft DAV clients
        location = / {
            if ( $http_user_agent ~ ^DavClnt ) {
                return 302 /remote.php/webdav/$is_args$args;
            }
        }

        location = /robots.txt {
            allow all;
            log_not_found off;
            access_log off;
        }

        # Make a regex exception for `/.well-known` so that clients can still
        # access it despite the existence of the regex rule
        # `location ~ /(\.|autotest|...)` which would otherwise handle requests
        # for `/.well-known`.
        location ^~ /.well-known {
            # The rules in this block are an adaptation of the rules
            # in `.htaccess` that concern `/.well-known`.

            location = /.well-known/carddav { return 301 /remote.php/dav/; }
            location = /.well-known/caldav  { return 301 /remote.php/dav/; }

            location /.well-known/acme-challenge    { try_files $uri $uri/ =404; }
            location /.well-known/pki-validation    { try_files $uri $uri/ =404; }

            # Let Nextcloud's API for `/.well-known` URIs handle all other
            # requests by passing them to the front-end controller.
            return 301 /index.php$request_uri;
        }

        # Rules borrowed from `.htaccess` to hide certain paths from clients
        location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)(?:$|/)  { return 404; }
        location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console)                { return 404; }

        # Ensure this block, which passes PHP files to the PHP process, is above the blocks
        # which handle static assets (as seen below). If this block is not declared first,
        # then Nginx will encounter an infinite rewriting loop when it prepends `/index.php`
        # to the URI, resulting in a HTTP 500 error response.
        location ~ \.php(?:$|/) {
            # Required for legacy support
            rewrite ^/(?!index|remote|public|cron|core\/ajax\/update|status|ocs\/v[12]|updater\/.+|oc[ms]-provider\/.+|.+\/richdocumentscode\/proxy) /index.php$request_uri;

            fastcgi_split_path_info ^(.+?\.php)(/.*)$;
            set $path_info $fastcgi_path_info;

            try_files $fastcgi_script_name =404;

            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param PATH_INFO $path_info;
            #fastcgi_param HTTPS on;
            fastcgi_read_timeout 600;
            fastcgi_send_timeout 600;
            fastcgi_connect_timeout 600;
            proxy_connect_timeout 600;
            proxy_send_timeout 600;
            proxy_read_timeout 600;
            send_timeout 600;           
            fastcgi_param modHeadersAvailable true;         # Avoid sending the security headers twice
            fastcgi_param front_controller_active true;     # Enable pretty urls
            fastcgi_pass php-handler;

            fastcgi_intercept_errors on;
            fastcgi_request_buffering off;
        }

        location ~ \.(?:css|js|svg|gif)$ {
            try_files $uri /index.php$request_uri;
            expires 6M;         # Cache-Control policy borrowed from `.htaccess`
            access_log off;     # Optional: Don't log access to assets
        }

        location ~ \.woff2?$ {
            try_files $uri /index.php$request_uri;
            expires 7d;         # Cache-Control policy borrowed from `.htaccess`
            access_log off;     # Optional: Don't log access to assets
        }

        # Rule borrowed from `.htaccess`
        location /remote {
            return 301 /remote.php$request_uri;
        }

        location / {
            try_files $uri $uri/ /index.php$request_uri;
        }
    }
}

```

:::

创建`docker-compose.yml`文件：

::: code-tabs#language
@tab docker-compose.yml

```yaml
version: '3'

services:
  db:
    image: mariadb:10.5
    command: --transaction-isolation=READ-COMMITTED --log-bin=binlog --binlog-format=ROW
    restart: always
    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=qwer1234
      - MARIADB_AUTO_UPGRADE=1
      - MARIADB_DISABLE_UPGRADE_BACKUP=1
    env_file:
      - db.env

  redis:
    image: redis:alpine
    restart: always

  app:
    image: nextcloud:fpm-alpine
    restart: always
    volumes:
      - nextcloud:/var/www/html
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      - MYSQL_HOST=db
      - REDIS_HOST=redis
    env_file:
      - db.env
    depends_on:
      - db
      - redis

  web:
    build: ./web
    restart: always
    volumes:
      - nextcloud:/var/www/html:ro
    environment:
      - VIRTUAL_HOST=nas
    depends_on:
      - app
    networks:
      - proxy-tier
      - default

  cron:
    image: nextcloud:fpm-alpine
    restart: always
    volumes:
      - nextcloud:/var/www/html
    entrypoint: /cron.sh
    depends_on:
      - db
      - redis

  proxy:
    build: ./proxy
    restart: always
    ports:
      - 4080:80
      - 44445:443
    volumes:
      - certs:/etc/nginx/certs:ro
      - vhost.d:/etc/nginx/vhost.d
      - html:/usr/share/nginx/html
      - /var/run/docker.sock:/tmp/docker.sock:ro
    networks:
      - proxy-tier

volumes:
  db:
    driver: local
    driver_opts:
      type: 'none'
      o: 'bind'
      device: './dbdata'

  nextcloud:
    driver: local
    driver_opts:
      type: 'none'
      o: 'bind'
      device: './appdata'
      
  certs:
    driver: local
    driver_opts:
      type: 'none'
      o: 'bind'
      device: './certdata'

  vhost.d:
    driver: local
    driver_opts:
      type: 'none'
      o: 'bind'
      device: './vhostdata'

  html:
    driver: local
    driver_opts:
      type: 'none'
      o: 'bind'
      device: './htmldata'

networks:
  proxy-tier:
```

:::

**注意替换配置文件中`MYSQL_ROOT_PASSWORD`为你设置的密码**

## 初始化

打开浏览器输入：<https://demo.mydomain.com:44445>初始化管理员账号。
