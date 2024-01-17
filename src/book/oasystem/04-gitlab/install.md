---
title: 安装
order: 1
---

## 创建容器：
创建工作目录：
```bash
mkdir -p ~/work/gitlab && cd ~/work/gitlab
touch docker-compose.yml
```
`docker-compose.yml`文件内容如下：

::: code-tabs#language
@tab docker-compose.yml
```yaml
version: '3.6'
services:
  web:
    container_name: 'gitlab'
    image: 'gitlab/gitlab-ee:latest'
    restart: always
    hostname: 'gitlab.mydomain.com'
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      GITLAB_OMNIBUS_CONFIG: 
        external_url 'https://gitlab.mydomain.com:8888'
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
        gitlab_rails['ldap_enabled'] = true
        gitlab_rails['ldap_servers'] = {
          'main' => {
            'label' => 'LDAP',
            'host' =>  'host.docker.internal',
            'port' => 389,
            'uid' => 'uid',
            'encryption' => 'plain',
            'allow_username_or_email_login' => true,
            'user_filter' => '(&(accountStatus=active)(memberof=cn=GitLab,ou=Groups,domainName=mydomain.com,o=domains,dc=mydomain,dc=com))',
            'block_auto_created_users' => false,
            'lowercase_usernames' => false,
            'bind_dn' => 'cn=vmail,dc=mydomain,dc=com',
            'password' => '<your ldap password>',
            'base' => 'dc=mydomain,dc=com'
          }
        }
    ports:
      - '8888:8888'
      - '2222:22'
    volumes:
      - './config:/etc/gitlab'
      - './logs:/var/log/gitlab'
      - './data:/var/opt/gitlab'
    shm_size: '256m'
```
:::
```
(&(accountStatus=active)(memberof=cn=GitLab,ou=Groups,domainName=mydomain.com,o=domains,dc=mydomain,dc=com))
```
表示LDAP账号为启用状态且属于GitLab组，用于实现用户对应用的使用权限。
创建容器：`docker compose up -d`
::: tip
Gitlib镜像较大，pull的过程持续时间较长。
:::
::: code-tabs#language

## root密码
GitLab在安装完成后提供了默认的root用户，密码需要以下命令获取:
::: code-tabs#language
@tab
``` bash
sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```
:::
**该密码为临时密码，请及时修改。**