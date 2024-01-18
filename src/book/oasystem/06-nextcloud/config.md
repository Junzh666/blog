---
title: 配置
order: 2
---

::: tip
NextCloud的配置文件主要在app容器中， 配置文件的路径为`/var/www/html/config/config.php`
:::

## 问题1

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
