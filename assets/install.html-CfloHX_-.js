import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as r,c as p,e as c,w as e,f as u,b as n,d as s}from"./app-j4kN759Y.js";const d={},k=u(`<h2 id="创建容器" tabindex="-1"><a class="header-anchor" href="#创建容器" aria-hidden="true">#</a> 创建容器</h2><p>获取床架你容器所需文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/ONLYOFFICE/Docker-DocumentServer.git
<span class="token builtin class-name">cd</span> Docker-DocumentServer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>docker-compose.yml</code>文件：</p>`,4),m=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[s(),n("span",{class:"token key atrule"},"version"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'2'"),s(`
 `),n("span",{class:"token key atrule"},"services"),n("span",{class:"token punctuation"},":"),s(`
   `),n("span",{class:"token key atrule"},"onlyoffice-documentserver"),n("span",{class:"token punctuation"},":"),s(`
     `),n("span",{class:"token key atrule"},"build"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token key atrule"},"context"),n("span",{class:"token punctuation"},":"),s(` .
     `),n("span",{class:"token key atrule"},"container_name"),n("span",{class:"token punctuation"},":"),s(" onlyoffice"),n("span",{class:"token punctuation"},"-"),s(`documentserver
     `),n("span",{class:"token key atrule"},"depends_on"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(" onlyoffice"),n("span",{class:"token punctuation"},"-"),s(`postgresql
       `),n("span",{class:"token punctuation"},"-"),s(" onlyoffice"),n("span",{class:"token punctuation"},"-"),s(`rabbitmq
     `),n("span",{class:"token key atrule"},"environment"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(` DB_TYPE=postgres
       `),n("span",{class:"token punctuation"},"-"),s(" DB_HOST=onlyoffice"),n("span",{class:"token punctuation"},"-"),s(`postgresql
       `),n("span",{class:"token punctuation"},"-"),s(` DB_PORT=5432
       `),n("span",{class:"token punctuation"},"-"),s(` DB_NAME=onlyoffice
       `),n("span",{class:"token punctuation"},"-"),s(` DB_USER=onlyoffice
       `),n("span",{class:"token punctuation"},"-"),s(" AMQP_URI=amqp"),n("span",{class:"token punctuation"},":"),s("//guest"),n("span",{class:"token punctuation"},":"),s("guest@onlyoffice"),n("span",{class:"token punctuation"},"-"),s(`rabbitmq
       `),n("span",{class:"token comment"},"# Uncomment strings below to enable the JSON Web Token validation."),s(`
       `),n("span",{class:"token punctuation"},"-"),s(` JWT_ENABLED=true
       `),n("span",{class:"token punctuation"},"-"),s(` JWT_SECRET=secret
       `),n("span",{class:"token punctuation"},"-"),s(` JWT_HEADER=Authorization
       `),n("span",{class:"token punctuation"},"-"),s(` JWT_IN_BODY=true
     `),n("span",{class:"token key atrule"},"ports"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},"'8880:80'"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},"'6443:443'"),s(`
     `),n("span",{class:"token key atrule"},"stdin_open"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token boolean important"},"true"),s(`
     `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
     `),n("span",{class:"token key atrule"},"stop_grace_period"),n("span",{class:"token punctuation"},":"),s(` 60s
     `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token punctuation"},"-"),s(` /var/www/onlyoffice/Data
        `),n("span",{class:"token punctuation"},"-"),s(` /var/log/onlyoffice
        `),n("span",{class:"token punctuation"},"-"),s(` /var/lib/onlyoffice/documentserver/App_Data/cache/files
        `),n("span",{class:"token punctuation"},"-"),s(" /var/www/onlyoffice/documentserver"),n("span",{class:"token punctuation"},"-"),s(`example/public/files
        `),n("span",{class:"token punctuation"},"-"),s(` /usr/share/fonts
   `),n("span",{class:"token key atrule"},"onlyoffice-rabbitmq"),n("span",{class:"token punctuation"},":"),s(`
     `),n("span",{class:"token key atrule"},"container_name"),n("span",{class:"token punctuation"},":"),s(" onlyoffice"),n("span",{class:"token punctuation"},"-"),s(`rabbitmq
     `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(` rabbitmq
     `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
     `),n("span",{class:"token key atrule"},"expose"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},"'5672'"),s(`

   `),n("span",{class:"token key atrule"},"onlyoffice-postgresql"),n("span",{class:"token punctuation"},":"),s(`
     `),n("span",{class:"token key atrule"},"container_name"),n("span",{class:"token punctuation"},":"),s(" onlyoffice"),n("span",{class:"token punctuation"},"-"),s(`postgresql
     `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(" postgres"),n("span",{class:"token punctuation"},":"),n("span",{class:"token number"},"9.5"),s(`
     `),n("span",{class:"token key atrule"},"environment"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(` POSTGRES_DB=onlyoffice
       `),n("span",{class:"token punctuation"},"-"),s(` POSTGRES_USER=onlyoffice
       `),n("span",{class:"token punctuation"},"-"),s(` POSTGRES_HOST_AUTH_METHOD=trust
     `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
     `),n("span",{class:"token key atrule"},"expose"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},"'5432'"),s(`
     `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
       `),n("span",{class:"token punctuation"},"-"),s(" postgresql_data"),n("span",{class:"token punctuation"},":"),s(`/var/lib/postgresql

 `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
   `),n("span",{class:"token key atrule"},"postgresql_data"),n("span",{class:"token punctuation"},":"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=n("h2",{id:"配置https",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置https","aria-hidden":"true"},"#"),s(" 配置HTTPS")],-1),b=n("p",null,[s("创建"),n("code",null,"onlyoffice.conf"),s("内容为：")],-1),y=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{class:"language-nginx"},[n("code",null,[s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" docservice")]),s(),n("span",{class:"token punctuation"},"{"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" 127.0.0.1:8880")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token punctuation"},"}"),s(`

 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"map"),s(),n("span",{class:"token variable"},"$http_host"),s(),n("span",{class:"token variable"},"$this_host")]),s(),n("span",{class:"token punctuation"},"{"),s(`
     "" $host`),n("span",{class:"token punctuation"},";"),s(`
     `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token variable"},"$http_host")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token punctuation"},"}"),s(`

 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"map"),s(),n("span",{class:"token variable"},"$http_x_forwarded_proto"),s(),n("span",{class:"token variable"},"$the_scheme")]),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token variable"},"$http_x_forwarded_proto")]),n("span",{class:"token punctuation"},";"),s(`
      "" $scheme`),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token punctuation"},"}"),s(`

 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"map"),s(),n("span",{class:"token variable"},"$http_x_forwarded_host"),s(),n("span",{class:"token variable"},"$the_host")]),s(),n("span",{class:"token punctuation"},"{"),s(`
     `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token variable"},"$http_x_forwarded_host")]),n("span",{class:"token punctuation"},";"),s(`
     "" $this_host`),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token punctuation"},"}"),s(`

 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"map"),s(),n("span",{class:"token variable"},"$http_upgrade"),s(),n("span",{class:"token variable"},"$proxy_connection")]),s(),n("span",{class:"token punctuation"},"{"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"default"),s(" upgrade")]),n("span",{class:"token punctuation"},";"),s(`
   "" `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"close")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token punctuation"},"}"),s(`

 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_set_header"),s(" Upgrade "),n("span",{class:"token variable"},"$http_upgrade")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_set_header"),s(" Connection "),n("span",{class:"token variable"},"$proxy_connection")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_set_header"),s(" X-Forwarded-Host "),n("span",{class:"token variable"},"$the_host")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_set_header"),s(" X-Forwarded-Proto "),n("span",{class:"token variable"},"$the_scheme")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_set_header"),s(" X-Forwarded-For "),n("span",{class:"token variable"},"$proxy_add_x_forwarded_for")]),n("span",{class:"token punctuation"},";"),s(`
 `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"44446"),s(" ssl http2")]),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(" [::]:44446 ssl http2")]),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s(" demo.mydomain.com")]),n("span",{class:"token punctuation"},";"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_tokens"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s(" /usr/share/nginx/html")]),n("span",{class:"token punctuation"},";"),s(`

   `),n("span",{class:"token comment"},"## Strong SSL Security"),s(`
   `),n("span",{class:"token comment"},"## https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl"),s(),n("span",{class:"token boolean"},"on")]),n("span",{class:"token punctuation"},";"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_certificate"),s(" /etc/nginx/cert/demo.mydomain.com.pem")]),n("span",{class:"token punctuation"},";"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_certificate_key"),s(" /etc/nginx/cert/demo.mydomain.com.key")]),n("span",{class:"token punctuation"},";"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_verify_client"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`

   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_ciphers"),s(),n("span",{class:"token string"},'"EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH"')]),n("span",{class:"token punctuation"},";"),s(`

   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_protocols"),s("  TLSv1 TLSv1.1 TLSv1.2")]),n("span",{class:"token punctuation"},";"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_session_cache"),s("  builtin:1000  shared:SSL:10m")]),n("span",{class:"token punctuation"},";"),s(`

   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_prefer_server_ciphers"),s("   "),n("span",{class:"token boolean"},"on")]),n("span",{class:"token punctuation"},";"),s(`

   `),n("span",{class:"token comment"},"## [Optional] Before enabling Strict-Transport-Security headers, ensure your server is properly configured for SSL."),s(`
   `),n("span",{class:"token comment"},"## This directive informs the browser to always use HTTPS. For more info see:"),s(`
   `),n("span",{class:"token comment"},"## - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security"),s(`
   `),n("span",{class:"token comment"},'# add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;'),s(`
   `),n("span",{class:"token comment"},"# add_header X-Frame-Options SAMEORIGIN;"),s(`
   `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" X-Content-Type-Options nosniff")]),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
     `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://docservice")]),n("span",{class:"token punctuation"},";"),s(`
     `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_http_version"),s(" 1.1")]),n("span",{class:"token punctuation"},";"),s(`
   `),n("span",{class:"token punctuation"},"}"),s(`
 `),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function _(f,h){const l=i("CodeTabs");return r(),p("div",null,[k,c(l,{id:"10",data:[{id:"docker-compose.yml"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("docker-compose.yml")]),tab0:e(({value:a,isActive:t})=>[m]),_:1},8,["data"]),v,b,c(l,{id:"21",data:[{id:"onlyoffice.conf"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("onlyoffice.conf")]),tab0:e(({value:a,isActive:t})=>[y]),_:1},8,["data"])])}const S=o(d,[["render",_],["__file","install.html.vue"]]);export{S as default};
