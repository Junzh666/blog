---
title: memberof
order: 2
date: 2024-01-18
article: false
category:
    - Linux
    - 运维
tag:
    - LDAP
---
## 关于Group

> [!warning]
>默认情况下，OpenLDAP的用户组属性为Posixgroup，起与用户之间没有实际对应关系，这会导致LDAP无法根据用户与组之间的隶属关系做查询。而在实际的项目和组织架>构管理中，这种隶属关系的应用很普遍，所以需要启用LDAP的memberOf模块。
>普遍情况下启动memberOf模块并不复杂，网上的教程和文档也很多，但由于**这里的OpenLDAP是由iRedMail自动安装和配置的**，网上的资源完全无法使用。

**为什么会出现这种情况？**

OpenLDAP是在iRedMail的自动安装脚本过程中自动被安装的，我们无法控制这一过程，我曾尝试先安装配置OpenLDAP后再将iRedMail手动接入，但由于iRedMail所包含的组件较多，涉及到LDAP的相关配置很复杂最终放弃。在这种情况下我们只有一条路可以走，那就是使用iRedMail自动配置好的OpenLDAP策略，这会导致一个问题，OpenLDAP的**静态配置**和**动态配置**问题。

**静态配置**：我想修改LDAP的配置，我只能修改/etc/ldap/slapd.conf这配置文件，删除slapd.d目录后，通过slaptest重新生成子配置文件，重启OpenLDAP生效。

**动态配置**：使用ldapadd通过编辑ldif文件内容执行OpenLDAP配置，这需要执行一条命令，不需要重启服务。而iRedMail安装的OpenLDAP使用的是静态配置，而网上的教程采用的是动态配置。所以不管你怎么执行动态配置的命令，都无法修改slapd.d目录下的内容，也就无法添加memberof模块。

## 静态模式下配置memberOf

### 1. 修改`/etc/ldap/slapd.conf`文件，在moduleload back\_monitor的下一行插入2行

```bash
moduleload memberof
moduleload refint
```

### 2. 在`database monitor`的上一行添加

```bash
database config
access to *
    by dn.exact="gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth" manage
    by * none
```

### 3. 在`database mdb`的下一行添加

```bash
overlay memberof
overlay refint
```

### 4. 刷新配置文件

```bash
sudo rm -r /etc/ldap/slapd.d
sudo mkdir /etc/ldap/slapd.d
sudo slaptest -f /etc/ldap/slapd.conf -F /etc/ldap/slapd.d
sudo chown -R openldap:openldap /etc/ldap/slapd.d
sudo service slapd restar
```

### 5. 创建应用组

```bash
cat  > groups.ldif << EOF
dn: cn=GitLab,ou=Groups,domainName=mydomain.com,o=domains,dc=mydomain,dc=com
cn: GitLab
objectClass: groupOfNames
objectClass: top
Member: mail=ops@mydomain.com,ou=Users,domainName=mydomain.com,o=domains,dc=mydomain,dc=com

dn: cn=NAS,ou=Groups,domainName=mydomain.com,o=domains,dc=mydomain,dc=com
cn: NAS
objectClass: groupOfNames
objectClass: top
Member: mail=ops@mydomain.com,ou=Users,domainName=mydomain.com,o=domains,dc=mydomain,dc=com

dn: cn=Squid,ou=Groups,domainName=mydomain.com,o=domains,dc=mydomain,dc=com
cn: Squid
objectClass: groupOfNames
objectClass: top
Member: mail=ops@mydomain.com,ou=Users,domainName=mydomain.com,o=domains,dc=mydomain,dc=com
EOF


ldapadd -D "cn=Manager,dc=mydomain,dc=com" -w <password>-x -f  groups.ldif
```

> 参考资料：
> [https://www.openldap.org/doc/admin24/overlays.html](https://www.openldap.org/doc/admin24/overlays.html)
> [https://forum.iredmail.org/topic8673-general-ldap-setup-question.html](https://forum.iredmail.org/topic8673-general-ldap-setup-question.html)
