---
title: 配置
order: 2
date: 2024-01-18
article: false
category:
    - linux
    - 运维
tag:
    - nextcloud
    - nas
---

::: tip
NextCloud的配置文件主要在app容器中， 配置文件的路径为`/var/www/html/config/config.php`
:::

## 无法登录问题

登录NextCloud时会出现点击登录后页面卡住的问题（[参考资料](https://crossrt.me/fix-nextcloud-login-form-content-security-policy-issue/)），需要再在config/config.php文件中添加：

::: code-tabs#language
@tab config.php

```php
// ... 其他配置信息 ...
'overwritehost' => 'demo.mydomain.com:44445',
'overwriteprotocol' => 'https',
// ... 其他配置信息 ...
```

:::

## 为APP商店配置socks5代理

NextCLoud的配置文件是`config/config.php`
下面的内容用于配置onlyoffice常见的jwt部分、启用socks5代理，和mail app的设置参数：

```php
  'allow_local_remote_servers' => true,
  'onlyoffice' =>
  array (
    'jwt_secret' => 'secret',
    'jwt_header' => 'AuthorizationJwt',
  ),
  'mail_smtpsecure' => 'tls',
  'proxy' => 'socks5://<ip address>:10808',
  'app.mail.imap.timeout' => 20,
  'app.mail.smtp.timeout' => 20,
  'app.mail.sieve.timeout' => 20,
  'app.mail.verify-tls-peer' => false,
```

## 在NextCloud中安装了Rocket.Chat APP后无法访问，显示`connect be refused`

原因：rocketchat本身配置不允许被其他的页面嵌入和调用。
解决办法：

1. 修改rocketchat的配置，关闭 Restrict access inside any Iframe。
1. Options to X-Frame-Options 设置为 nextcloud的URL。
1. 最关键的一条在rocketchat的nginx中修改配置文件`conf-available/headers.conf`添加内容：

```nginx
#add_header X-Frame-Options sameorigin;
add_header X-Frame-Options "ALLOW-FROM https://www.mydomain.com:44445/";
```

***注意把URL改成你自己的***
