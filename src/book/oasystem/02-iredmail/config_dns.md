---
title: 配置DNS
order: 4
---
请将`<public ip>`替换为自己服务器的外网IP地址。

## 基本解析

| 域名   | 类型 | 值                |
| ---- | -- | ---------------- |
| @    | A  | `<public ip>`    |
| @    | MX | mail.mydomain.com |
| demo | A  | `<public ip>`    |
| mail | A  | `<public ip>`    |
| imap | A  | `<public ip>`    |

## SPF记录

| 域名 | 类型  | 值                              |
| -- | --- | ------------------------------ |
| @  | TXT | v=spf1 ipv4:\<public ip> \~all |

## DKIM记录

### 查询本机域名的p值：

```bash
sudo amavisd-new showkey
```

### 设置解析

| 域名               | 类型  | 值      |
| ---------------- | --- | ------ |
| dkim.\_domainkey | TXT | <你的p值> |

### 查询结果

```bash
sudo amavisd-new testkey
```

如果显示：

`TESTING#1 mydomain.com: dkim._domainkey.mydomain.com => pass`

则表示设置成功。
