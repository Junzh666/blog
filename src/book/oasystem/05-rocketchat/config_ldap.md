---
title: 配置LDAP
order: 2
date: 2024-01-18
article: false
category:
    - Linux
    - 运维
tag:
    - rocketchat
    - 聊天
---
>[!warning]
> 如果rocketchat配置了Manually Approve New Users可能会导致新创建的LDAP用户无法同步。

以管理员账号登录Rocketchat，找到Workspace > Settings > LDAP:

## Connection

- Enable
- Host:    host.docker.internal
- Reconnect
- Authentication > Enable
- User DN:    cn=Manager,dc=mydomain,dc=com
- Password:    \<your-password>

## User Search

- Find user after login
- Base DN:    ou=Users,domainName=mydomain.com,o=domains,dc=mydomain,dc=com
- Filter:    (&(accountStatus=active)(memberof=cn=Rocketchat,ou=Groups,domainName=mydomain.com,o=domains,dc=mydomain,dc=com))
- Search Field:    uid

## Data Sync

- Merge Existing Users
- Update User Data on Login
- Default Domain:    mydomain.com
- Mapping Username Field:  cn
- Email Field:    Email
- Name Field:  <为空>

配置完这几个选项之后就可以使Rocket.Chat通过OpenLDAP认证了。
