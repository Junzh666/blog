---
title: 配置HTTPS
order: 2
---
将证书文件copy到容器：
::: code-tabs#language
@tab
``` bash
docker cp demo.mydomain.com.pem gitlab:/etc/gitlab/ssl/demo.mydomain.com.crt
docker cp demo.mydomain.com.key gitlab:/etc/gitlab/ssl/demo.mydomain.com.key
```
:::

进入容器，修改配置文件`/etc/gitlab/gitlab.rb` 添加内容:
::: code-tabs#language
@tab
``` bash
external_url "https://demo.mydomain.com:8888"
letsencrypt['enable'] = false
nginx['ssl_certificate'] = "/etc/gitlab/ssl/demo.mydomain.com.crt"
nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/demo.mydomain.com.key"
```
:::

重启容器： `docker restart gitlab`

使用浏览器访问：[https://demo.mydomain.com:8888]()