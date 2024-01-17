---
title: Web管理
order: 1
---

OpenLDAP会在iRedMail安装过程中自动安装。

## phpldapadmin

phpLDAPadmin是一个基于Web的LDAP客户端，它小巧且易于部署，这里使用docker的方式部署。

创建docker-compose.yml文件：

{% tabs %}
{% tab title="docker-compose.yml" %}
```yaml
version: "3"
services:
  phpldapadmin:
    container_name: phpldapadmin-single
    image: osixia/phpldapadmin:0.9.0-amd64
    restart: always
    ports:
      - 8099:80
    volumes:
      - /etc/localtime:/etc/localtime
    extra_hosts:
      - "host.docker.internal:host-gateway"

    environment:
      - PHPLDAPADMIN_LDAP_HOSTS=host.docker.internal
      - PHPLDAPADMIN_HTTPS=false
    deploy:
      resources:
        limits:
           memory: 1G
        reservations:
           memory: 256M
```
{% endtab %}
{% endtabs %}

创建容器：`docker compose up -d`

打开浏览器，输入地址：`http://<ip>:8099` 访问LDAP管理页面。

{% hint style="warning" %}
OpenLDAP不建议暴露在公网，请从内网访问和管理。
{% endhint %}

## 自助密码修改

{% tabs %}
{% tab title="docker-compose.yml" %}
```yaml
version: '2'
services:
  self-service-password:
    container_name: self-service-password
    image: tiredofit/self-service-password:latest
    restart: always
    ports:
      - "8090:80"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      - LDAP_SERVER=ldap://host.docker.internal:389
      - LDAP_BINDDN=cn=Manager,dc=ppsuper,dc=com
      - LDAP_BINDPASS=<your ldap manage password>
      - LDAP_BASE_SEARCH=ou=Users,domainName=ppsuper.com,o=domains,dc=ppsuper,dc=com
      - MAIL_FROM=postmaster@ppsuper.com
      - MAIL_FROM_NAME=LDAP账号自助服务平台
      - SMTP_DEBUG=1
      - SMTP_HOST=demo.ppsuper.com
      - SMTP_USER=postmaster@ppsuper.com
      - SMTP_PASS=demo@ici.com
      - SMTP_PORT=465
      - SMTP_SECURE_TYPE=tls
      - SMTP_AUTH_ON=true
      - NOTIFY_ON_CHANGE=true
    volumes:
      - /etc/localtime:/etc/localtime
      - ./self-service-password/htdocs:/www/ssp
      - ./self-service-password/logs:/www/logs
```
{% endtab %}
{% endtabs %}

创建容器：`docker compose up -d`

浏览器输入：`http://<ip>:8090/` 访问页面
