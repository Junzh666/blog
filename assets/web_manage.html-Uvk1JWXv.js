import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as u,c as p,d as c,w as a,a as n,b as s}from"./app-PgAZdStI.js";const r={},d=n("p",null,"OpenLDAP会在iRedMail安装过程中自动安装。",-1),k=n("h2",{id:"phpldapadmin",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#phpldapadmin","aria-hidden":"true"},"#"),s(" phpldapadmin")],-1),m=n("p",null,"phpLDAPadmin是一个基于Web的LDAP客户端，它小巧且易于部署，这里使用docker的方式部署。",-1),v=n("p",null,"创建docker-compose.yml文件：",-1),b=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"version"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"3"'),s(`
`),n("span",{class:"token key atrule"},"services"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"phpldapadmin"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"container_name"),n("span",{class:"token punctuation"},":"),s(" phpldapadmin"),n("span",{class:"token punctuation"},"-"),s(`single
    `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(" osixia/phpldapadmin"),n("span",{class:"token punctuation"},":"),s("0.9.0"),n("span",{class:"token punctuation"},"-"),s(`amd64
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
    `),n("span",{class:"token key atrule"},"ports"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" 8099"),n("span",{class:"token punctuation"},":"),n("span",{class:"token number"},"80"),s(`
    `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" /etc/localtime"),n("span",{class:"token punctuation"},":"),s(`/etc/localtime
    `),n("span",{class:"token key atrule"},"extra_hosts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},'"host.docker.internal:host-gateway"'),s(`

    `),n("span",{class:"token key atrule"},"environment"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` PHPLDAPADMIN_LDAP_HOSTS=host.docker.internal
      `),n("span",{class:"token punctuation"},"-"),s(` PHPLDAPADMIN_HTTPS=false
    `),n("span",{class:"token key atrule"},"deploy"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token key atrule"},"resources"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token key atrule"},"limits"),n("span",{class:"token punctuation"},":"),s(`
           `),n("span",{class:"token key atrule"},"memory"),n("span",{class:"token punctuation"},":"),s(` 1G
        `),n("span",{class:"token key atrule"},"reservations"),n("span",{class:"token punctuation"},":"),s(`
           `),n("span",{class:"token key atrule"},"memory"),n("span",{class:"token punctuation"},":"),s(` 256M
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=n("p",null,[s("创建容器："),n("code",null,"docker compose up -d")],-1),y=n("p",null,[s("打开浏览器，输入地址："),n("code",null,"http://<ip>:8099"),s(" 访问LDAP管理页面。")],-1),h=n("p",null,"OpenLDAP不建议暴露在公网，请从内网访问和管理。",-1),P=n("h2",{id:"自助密码修改",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#自助密码修改","aria-hidden":"true"},"#"),s(" 自助密码修改")],-1),g=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"version"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'2'"),s(`
`),n("span",{class:"token key atrule"},"services"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"self-service-password"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"container_name"),n("span",{class:"token punctuation"},":"),s(" self"),n("span",{class:"token punctuation"},"-"),s("service"),n("span",{class:"token punctuation"},"-"),s(`password
    `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(" tiredofit/self"),n("span",{class:"token punctuation"},"-"),s("service"),n("span",{class:"token punctuation"},"-"),s("password"),n("span",{class:"token punctuation"},":"),s(`latest
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
    `),n("span",{class:"token key atrule"},"ports"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},'"8090:80"'),s(`
    `),n("span",{class:"token key atrule"},"extra_hosts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},'"host.docker.internal:host-gateway"'),s(`
    `),n("span",{class:"token key atrule"},"environment"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" LDAP_SERVER=ldap"),n("span",{class:"token punctuation"},":"),s("//host.docker.internal"),n("span",{class:"token punctuation"},":"),n("span",{class:"token number"},"389"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" LDAP_BINDDN=cn=Manager"),n("span",{class:"token punctuation"},","),s("dc=mydomain"),n("span",{class:"token punctuation"},","),s(`dc=com
      `),n("span",{class:"token punctuation"},"-"),s(" LDAP_BINDPASS=<your ldap manage password"),n("span",{class:"token punctuation"},">"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" LDAP_BASE_SEARCH=ou=Users"),n("span",{class:"token punctuation"},","),s("domainName=mydomain.com"),n("span",{class:"token punctuation"},","),s("o=domains"),n("span",{class:"token punctuation"},","),s("dc=mydomain"),n("span",{class:"token punctuation"},","),s(`dc=com
      `),n("span",{class:"token punctuation"},"-"),s(` MAIL_FROM=postmaster@mydomain.com
      `),n("span",{class:"token punctuation"},"-"),s(` MAIL_FROM_NAME=LDAP账号自助服务平台
      `),n("span",{class:"token punctuation"},"-"),s(` SMTP_DEBUG=1
      `),n("span",{class:"token punctuation"},"-"),s(` SMTP_HOST=demo.mydomain.com
      `),n("span",{class:"token punctuation"},"-"),s(` SMTP_USER=postmaster@mydomain.com
      `),n("span",{class:"token punctuation"},"-"),s(` SMTP_PASS=demo@ici.com
      `),n("span",{class:"token punctuation"},"-"),s(` SMTP_PORT=465
      `),n("span",{class:"token punctuation"},"-"),s(` SMTP_SECURE_TYPE=tls
      `),n("span",{class:"token punctuation"},"-"),s(` SMTP_AUTH_ON=true
      `),n("span",{class:"token punctuation"},"-"),s(` NOTIFY_ON_CHANGE=true
    `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" /etc/localtime"),n("span",{class:"token punctuation"},":"),s(`/etc/localtime
      `),n("span",{class:"token punctuation"},"-"),s(" ./self"),n("span",{class:"token punctuation"},"-"),s("service"),n("span",{class:"token punctuation"},"-"),s("password/htdocs"),n("span",{class:"token punctuation"},":"),s(`/www/ssp
      `),n("span",{class:"token punctuation"},"-"),s(" ./self"),n("span",{class:"token punctuation"},"-"),s("service"),n("span",{class:"token punctuation"},"-"),s("password/logs"),n("span",{class:"token punctuation"},":"),s(`/www/logs
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),A=n("p",null,[s("创建容器："),n("code",null,"docker compose up -d")],-1),w=n("p",null,[s("浏览器输入："),n("code",null,"http://<ip>:8090/"),s(" 访问页面")],-1);function S(D,T){const l=i("CodeTabs");return u(),p("div",null,[d,k,m,v,c(l,{id:"12",data:[{id:"docker-compose.yml"}],"tab-id":"language"},{title0:a(({value:e,isActive:t})=>[s("docker-compose.yml")]),tab0:a(({value:e,isActive:t})=>[b]),_:1},8,["data"]),_,y,h,P,c(l,{id:"29",data:[{id:"docker-compose.yml"}],"tab-id":"language"},{title0:a(({value:e,isActive:t})=>[s("docker-compose.yml")]),tab0:a(({value:e,isActive:t})=>[g]),_:1},8,["data"]),A,w])}const L=o(r,[["render",S],["__file","web_manage.html.vue"]]);export{L as default};
