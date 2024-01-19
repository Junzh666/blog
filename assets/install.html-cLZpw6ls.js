import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as p,c as u,e as l,w as e,b as n,d as s,f as d}from"./app-v2FQJYry.js";const k={},m=n("h2",{id:"创建容器所需的文件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#创建容器所需的文件","aria-hidden":"true"},"#"),s(" 创建容器所需的文件")],-1),v=n("p",null,[n("code",null,"vim db.env")],-1),b=n("div",{class:"language-env line-numbers-mode","data-ext":"env"},[n("pre",{class:"language-env"},[n("code",null,`MYSQL_PASSWORD=qwer1234
MYSQL_DATABASE=nextcloud
MYSQL_USER=nextcloud
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),y=d(`<p><em>这里使用的是弱密码，请自行修改</em></p><p>创建本地目录：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> certdata proxy vhostdata web certdata dbdata htmldata
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把ssl证书copy到certdata目录下。</p><h2 id="配置nginx-proxy" tabindex="-1"><a class="header-anchor" href="#配置nginx-proxy" aria-hidden="true">#</a> 配置Nginx proxy</h2><p><strong>以下配置均在刚才创建的<code>proxy</code>目录中，请cd到该目录创建文件和操作。</strong></p><p><strong>1. 创建<code>Dockerfile</code>文件，内容如下：</strong></p>`,7),_=n("div",{class:"language-Dockerfile line-numbers-mode","data-ext":"Dockerfile"},[n("pre",{class:"language-Dockerfile"},[n("code",null,`FROM nginxproxy/nginx-proxy:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY uploadsize.conf /etc/nginx/conf.d/uploadsize.conf
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=n("p",null,[n("strong",null,[s("2. 创建"),n("code",null,"nginx.conf"),s("配置文件:")])],-1),g=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"user"),s("  nginx")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"worker_processes"),s("  auto")]),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"error_log"),s("  /var/log/nginx/error.log notice")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"pid"),s("        /var/run/nginx.pid")]),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"events")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"worker_connections"),s("  "),n("span",{class:"token number"},"10240")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"http")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"include"),s("       /etc/nginx/mime.types")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"default_type"),s("  application/octet-stream")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"log_format"),s("  main  "),n("span",{class:"token string"},[s("'"),n("span",{class:"token variable"},"$remote_addr"),s(" - "),n("span",{class:"token variable"},"$remote_user"),s(" ["),n("span",{class:"token variable"},"$time_local]"),s(' "'),n("span",{class:"token variable"},"$request"),s(`" '`)]),s(`
                      `),n("span",{class:"token string"},[s("'"),n("span",{class:"token variable"},"$status"),s(),n("span",{class:"token variable"},"$body_bytes_sent"),s(' "'),n("span",{class:"token variable"},"$http_referer"),s(`" '`)]),s(`
                      `),n("span",{class:"token string"},[s(`'"`),n("span",{class:"token variable"},"$http_user_agent"),s('" "'),n("span",{class:"token variable"},"$http_x_forwarded_for"),s(`"'`)])]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"access_log"),s("  /var/log/nginx/access.log  main")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"sendfile"),s("        "),n("span",{class:"token boolean"},"on")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token comment"},"#tcp_nopush     on;"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"keepalive_timeout"),s("  "),n("span",{class:"token number"},"65")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token comment"},"#gzip  on;"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"include"),s(" /etc/nginx/vhost.d/*")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"include"),s(" /etc/nginx/conf.d/*.conf")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"daemon"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=n("p",null,[n("strong",null,[s("3. 创建"),n("code",null,"uploadsize.conf"),s("文件：")])],-1),f=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"client_max_body_size"),s(),n("span",{class:"token number"},"10G")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_request_buffering"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_read_timeout"),s(),n("span",{class:"token number"},"300s")]),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("h2",{id:"配置vhostdata",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置vhostdata","aria-hidden":"true"},"#"),s(" 配置vhostdata")],-1),$=n("p",null,[n("strong",null,[s("以下配置均在刚才创建的"),n("code",null,"vhostdata"),s("目录中，请cd到该目录创建文件和操作。")])],-1),A=n("p",null,[s("创建名为"),n("code",null,"ssl"),s("的nginx配置文件:")],-1),S=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s("              "),n("span",{class:"token number"},"443"),s(" ssl")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_name"),s("         demo.mydomain.com")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_certificate"),s("     certs/demo.mydomain.com.pem")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_certificate_key"),s(" certs/demo.mydomain.com.key")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_protocols"),s("       TLSv1 TLSv1.1 TLSv1.2")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"ssl_ciphers"),s("         HIGH:!aNULL:!MD5")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_read_timeout"),s(),n("span",{class:"token number"},"300s")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_pass"),s(" http://nas")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),T=n("h2",{id:"配置web",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置web","aria-hidden":"true"},"#"),s(" 配置Web")],-1),D=n("p",null,[n("strong",null,[s("以下配置均在刚才创建的"),n("code",null,"web"),s("目录中，请cd到该目录创建文件和操作。")])],-1),P=n("p",null,[s("创建"),n("code",null,"Dockerfile"),s("文件：")],-1),R=n("div",{class:"language-Dockerfile line-numbers-mode","data-ext":"Dockerfile"},[n("pre",{class:"language-Dockerfile"},[n("code",null,`FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),O=n("p",null,[s("创建"),n("code",null,"nginx.conf"),s("配置文件:")],-1),q=n("div",{class:"language-nginx line-numbers-mode","data-ext":"nginx"},[n("pre",{class:"language-nginx"},[n("code",null,[n("span",{class:"token directive"},[n("span",{class:"token keyword"},"worker_processes"),s(" auto")]),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"error_log"),s("  /var/log/nginx/error.log warn")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"pid"),s("        /var/run/nginx.pid")]),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"events")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"worker_connections"),s("  "),n("span",{class:"token number"},"1024")]),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"http")]),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"include"),s("       /etc/nginx/mime.types")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"default_type"),s("  application/octet-stream")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"log_format"),s("  main  "),n("span",{class:"token string"},[s("'"),n("span",{class:"token variable"},"$remote_addr"),s(" - "),n("span",{class:"token variable"},"$remote_user"),s(" ["),n("span",{class:"token variable"},"$time_local]"),s(' "'),n("span",{class:"token variable"},"$request"),s(`" '`)]),s(`
                      `),n("span",{class:"token string"},[s("'"),n("span",{class:"token variable"},"$status"),s(),n("span",{class:"token variable"},"$body_bytes_sent"),s(' "'),n("span",{class:"token variable"},"$http_referer"),s(`" '`)]),s(`
                      `),n("span",{class:"token string"},[s(`'"`),n("span",{class:"token variable"},"$http_user_agent"),s('" "'),n("span",{class:"token variable"},"$http_x_forwarded_for"),s(`"'`)])]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"access_log"),s("  /var/log/nginx/access.log  main")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"sendfile"),s("        "),n("span",{class:"token boolean"},"on")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token comment"},"#tcp_nopush     on;"),s(`

    `),n("span",{class:"token comment"},"# Prevent nginx HTTP Server Detection"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server_tokens"),s("   "),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"keepalive_timeout"),s("  "),n("span",{class:"token number"},"65")]),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token comment"},"#gzip  on;"),s(`
    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_read_timeout"),s(),n("span",{class:"token number"},"300s")]),n("span",{class:"token punctuation"},";"),s(` 

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"upstream"),s(" php-handler")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server"),s(" app:9000")]),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"server")]),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"listen"),s(),n("span",{class:"token number"},"80")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# HSTS settings"),s(`
        `),n("span",{class:"token comment"},"# WARNING: Only add the preload option once you read about"),s(`
        `),n("span",{class:"token comment"},"# the consequences in https://hstspreload.org/. This option"),s(`
        `),n("span",{class:"token comment"},"# will add the domain to a hardcoded list that is shipped"),s(`
        `),n("span",{class:"token comment"},"# in all major browsers and getting removed from this list"),s(`
        `),n("span",{class:"token comment"},"# could take several months."),s(`
        `),n("span",{class:"token comment"},'#add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;" always;'),s(`

        `),n("span",{class:"token comment"},"# set max upload size"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"client_max_body_size"),s(),n("span",{class:"token number"},"512M")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_buffers"),s(),n("span",{class:"token number"},"64"),s(),n("span",{class:"token number"},"4K")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_connect_timeout"),s("    "),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_read_timeout"),s("       "),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_send_timeout"),s("       "),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# Enable gzip but do not remove ETag headers"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"gzip"),s(),n("span",{class:"token boolean"},"on")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"gzip_vary"),s(),n("span",{class:"token boolean"},"on")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"gzip_comp_level"),s(),n("span",{class:"token number"},"4")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"gzip_min_length"),s(),n("span",{class:"token number"},"256")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"gzip_proxied"),s(" expired no-cache no-store private no_last_modified no_etag auth")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"gzip_types"),s(" application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# Pagespeed is not supported by Nextcloud, so if your server is built"),s(`
        `),n("span",{class:"token comment"},"# with the `ngx_pagespeed` module, uncomment this line to disable it."),s(`
        `),n("span",{class:"token comment"},"#pagespeed off;"),s(`

        `),n("span",{class:"token comment"},"# HTTP response headers borrowed from Nextcloud `.htaccess`"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" Referrer-Policy                      "),n("span",{class:"token string"},'"no-referrer"'),s("   always")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" X-Content-Type-Options               "),n("span",{class:"token string"},'"nosniff"'),s("       always")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" X-Download-Options                   "),n("span",{class:"token string"},'"noopen"'),s("        always")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" X-Frame-Options                      "),n("span",{class:"token string"},'"SAMEORIGIN"'),s("    always")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" X-Permitted-Cross-Domain-Policies    "),n("span",{class:"token string"},'"none"'),s("          always")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" X-Robots-Tag                         "),n("span",{class:"token string"},'"none"'),s("          always")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"add_header"),s(" X-XSS-Protection                     "),n("span",{class:"token string"},'"1; mode=block"'),s(" always")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# Remove X-Powered-By, which is an information leak"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_hide_header"),s(" X-Powered-By")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# Path to the root of your installation"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"root"),s(" /var/www/html")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# Specify how to handle directories -- specifying `/index.php$request_uri`"),s(`
        `),n("span",{class:"token comment"},"# here as the fallback means that Nginx always exhibits the desired behaviour"),s(`
        `),n("span",{class:"token comment"},"# when a client requests a path that corresponds to a directory that exists"),s(`
        `),n("span",{class:"token comment"},"# on the server. In particular, if that directory contains an index.php file,"),s(`
        `),n("span",{class:"token comment"},"# that file is correctly served; if it doesn't, then the request is passed to"),s(`
        `),n("span",{class:"token comment"},"# the front-end controller. This consistent behaviour means that we don't need"),s(`
        `),n("span",{class:"token comment"},"# to specify custom rules for certain paths (e.g. images and other assets,"),s(`
        `),n("span",{class:"token comment"},"# `/updater`, `/ocm-provider`, `/ocs-provider`), and thus"),s(`
        `),n("span",{class:"token comment"},"# `try_files $uri $uri/ /index.php$request_uri`"),s(`
        `),n("span",{class:"token comment"},"# always provides the desired behaviour."),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"index"),s(" index.php index.html /index.php"),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`

        `),n("span",{class:"token comment"},"# Rule borrowed from `.htaccess` to handle Microsoft DAV clients"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" = /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"if"),s(" ( "),n("span",{class:"token variable"},"$http_user_agent"),s(" ~ ^DavClnt )")]),s(),n("span",{class:"token punctuation"},"{"),s(`
                `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"302"),s(" /remote.php/webdav/"),n("span",{class:"token variable"},"$is_args"),n("span",{class:"token variable"},"$args")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" = /robots.txt")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"allow"),s(" all")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"log_not_found"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"access_log"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token comment"},"# Make a regex exception for `/.well-known` so that clients can still"),s(`
        `),n("span",{class:"token comment"},"# access it despite the existence of the regex rule"),s(`
        `),n("span",{class:"token comment"},"# `location ~ /(\\.|autotest|...)` which would otherwise handle requests"),s(`
        `),n("span",{class:"token comment"},"# for `/.well-known`."),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ^~ /.well-known")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token comment"},"# The rules in this block are an adaptation of the rules"),s(`
            `),n("span",{class:"token comment"},"# in `.htaccess` that concern `/.well-known`."),s(`

            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" = /.well-known/carddav")]),s(),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"301"),s(" /remote.php/dav/")]),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token punctuation"},"}"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" = /.well-known/caldav")]),s("  "),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"301"),s(" /remote.php/dav/")]),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token punctuation"},"}"),s(`

            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /.well-known/acme-challenge")]),s("    "),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"try_files"),s(),n("span",{class:"token variable"},"$uri"),s(),n("span",{class:"token variable"},"$uri"),s("/ =404")]),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token punctuation"},"}"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /.well-known/pki-validation")]),s("    "),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"try_files"),s(),n("span",{class:"token variable"},"$uri"),s(),n("span",{class:"token variable"},"$uri"),s("/ =404")]),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token punctuation"},"}"),s(`

            `),n("span",{class:"token comment"},"# Let Nextcloud's API for `/.well-known` URIs handle all other"),s(`
            `),n("span",{class:"token comment"},"# requests by passing them to the front-end controller."),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"301"),s(" /index.php"),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token comment"},"# Rules borrowed from `.htaccess` to hide certain paths from clients"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)(?:$|/)")]),s("  "),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"404")]),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ~ ^/(?:\\.|autotest|occ|issue|indie|db_|console)")]),s("                "),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"404")]),n("span",{class:"token punctuation"},";"),s(),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token comment"},"# Ensure this block, which passes PHP files to the PHP process, is above the blocks"),s(`
        `),n("span",{class:"token comment"},"# which handle static assets (as seen below). If this block is not declared first,"),s(`
        `),n("span",{class:"token comment"},"# then Nginx will encounter an infinite rewriting loop when it prepends `/index.php`"),s(`
        `),n("span",{class:"token comment"},"# to the URI, resulting in a HTTP 500 error response."),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ~ \\.php(?:$|/)")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token comment"},"# Required for legacy support"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"rewrite"),s(" ^/(?!index|remote|public|cron|core\\/ajax\\/update|status|ocs\\/v[12]|updater\\/.+|oc[ms]-provider\\/.+|.+\\/richdocumentscode\\/proxy) /index.php"),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`

            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_split_path_info"),s(" ^(.+?\\.php)(/.*)$")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"set"),s(),n("span",{class:"token variable"},"$path_info"),s(),n("span",{class:"token variable"},"$fastcgi_path_info")]),n("span",{class:"token punctuation"},";"),s(`

            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"try_files"),s(),n("span",{class:"token variable"},"$fastcgi_script_name"),s(" =404")]),n("span",{class:"token punctuation"},";"),s(`

            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"include"),s(" fastcgi_params")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_param"),s(" SCRIPT_FILENAME "),n("span",{class:"token variable"},"$document_root"),n("span",{class:"token variable"},"$fastcgi_script_name")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_param"),s(" PATH_INFO "),n("span",{class:"token variable"},"$path_info")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token comment"},"#fastcgi_param HTTPS on;"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_read_timeout"),s(),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_send_timeout"),s(),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_connect_timeout"),s(),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_connect_timeout"),s(),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_send_timeout"),s(),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"proxy_read_timeout"),s(),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"send_timeout"),s(),n("span",{class:"token number"},"600")]),n("span",{class:"token punctuation"},";"),s(`           
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_param"),s(" modHeadersAvailable true")]),n("span",{class:"token punctuation"},";"),s("         "),n("span",{class:"token comment"},"# Avoid sending the security headers twice"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_param"),s(" front_controller_active true")]),n("span",{class:"token punctuation"},";"),s("     "),n("span",{class:"token comment"},"# Enable pretty urls"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_pass"),s(" php-handler")]),n("span",{class:"token punctuation"},";"),s(`

            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_intercept_errors"),s(),n("span",{class:"token boolean"},"on")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"fastcgi_request_buffering"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ~ \\.(?:css|js|svg|gif)$")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"try_files"),s(),n("span",{class:"token variable"},"$uri"),s(" /index.php"),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"expires"),s(),n("span",{class:"token number"},"6M")]),n("span",{class:"token punctuation"},";"),s("         "),n("span",{class:"token comment"},"# Cache-Control policy borrowed from `.htaccess`"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"access_log"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s("     "),n("span",{class:"token comment"},"# Optional: Don't log access to assets"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" ~ \\.woff2?$")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"try_files"),s(),n("span",{class:"token variable"},"$uri"),s(" /index.php"),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"expires"),s(),n("span",{class:"token number"},"7d")]),n("span",{class:"token punctuation"},";"),s("         "),n("span",{class:"token comment"},"# Cache-Control policy borrowed from `.htaccess`"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"access_log"),s(),n("span",{class:"token boolean"},"off")]),n("span",{class:"token punctuation"},";"),s("     "),n("span",{class:"token comment"},"# Optional: Don't log access to assets"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token comment"},"# Rule borrowed from `.htaccess`"),s(`
        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /remote")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token number"},"301"),s(" /remote.php"),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`

        `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"location"),s(" /")]),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token directive"},[n("span",{class:"token keyword"},"try_files"),s(),n("span",{class:"token variable"},"$uri"),s(),n("span",{class:"token variable"},"$uri"),s("/ /index.php"),n("span",{class:"token variable"},"$request_uri")]),n("span",{class:"token punctuation"},";"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),I=n("p",null,[s("创建"),n("code",null,"docker-compose.yml"),s("文件：")],-1),M=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"version"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'3'"),s(`

`),n("span",{class:"token key atrule"},"services"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"db"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(" mariadb"),n("span",{class:"token punctuation"},":"),n("span",{class:"token number"},"10.5"),s(`
    `),n("span",{class:"token key atrule"},"command"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token punctuation"},"-"),n("span",{class:"token punctuation"},"-"),s("transaction"),n("span",{class:"token punctuation"},"-"),s("isolation=READ"),n("span",{class:"token punctuation"},"-"),s("COMMITTED "),n("span",{class:"token punctuation"},"-"),n("span",{class:"token punctuation"},"-"),s("log"),n("span",{class:"token punctuation"},"-"),s("bin=binlog "),n("span",{class:"token punctuation"},"-"),n("span",{class:"token punctuation"},"-"),s("binlog"),n("span",{class:"token punctuation"},"-"),s(`format=ROW
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
    `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" db"),n("span",{class:"token punctuation"},":"),s(`/var/lib/mysql
    `),n("span",{class:"token key atrule"},"environment"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` MYSQL_ROOT_PASSWORD=qwer1234
      `),n("span",{class:"token punctuation"},"-"),s(` MARIADB_AUTO_UPGRADE=1
      `),n("span",{class:"token punctuation"},"-"),s(` MARIADB_DISABLE_UPGRADE_BACKUP=1
    `),n("span",{class:"token key atrule"},"env_file"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` db.env

  `),n("span",{class:"token key atrule"},"redis"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(" redis"),n("span",{class:"token punctuation"},":"),s(`alpine
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always

  `),n("span",{class:"token key atrule"},"app"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(" nextcloud"),n("span",{class:"token punctuation"},":"),s("fpm"),n("span",{class:"token punctuation"},"-"),s(`alpine
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
    `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" nextcloud"),n("span",{class:"token punctuation"},":"),s(`/var/www/html
    `),n("span",{class:"token key atrule"},"extra_hosts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token string"},'"host.docker.internal:host-gateway"'),s(`
    `),n("span",{class:"token key atrule"},"environment"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` MYSQL_HOST=db
      `),n("span",{class:"token punctuation"},"-"),s(` REDIS_HOST=redis
    `),n("span",{class:"token key atrule"},"env_file"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` db.env
    `),n("span",{class:"token key atrule"},"depends_on"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` db
      `),n("span",{class:"token punctuation"},"-"),s(` redis

  `),n("span",{class:"token key atrule"},"web"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"build"),n("span",{class:"token punctuation"},":"),s(` ./web
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
    `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" nextcloud"),n("span",{class:"token punctuation"},":"),s("/var/www/html"),n("span",{class:"token punctuation"},":"),s(`ro
    `),n("span",{class:"token key atrule"},"environment"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` VIRTUAL_HOST=nas
    `),n("span",{class:"token key atrule"},"depends_on"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` app
    `),n("span",{class:"token key atrule"},"networks"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" proxy"),n("span",{class:"token punctuation"},"-"),s(`tier
      `),n("span",{class:"token punctuation"},"-"),s(` default

  `),n("span",{class:"token key atrule"},"cron"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"image"),n("span",{class:"token punctuation"},":"),s(" nextcloud"),n("span",{class:"token punctuation"},":"),s("fpm"),n("span",{class:"token punctuation"},"-"),s(`alpine
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
    `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" nextcloud"),n("span",{class:"token punctuation"},":"),s(`/var/www/html
    `),n("span",{class:"token key atrule"},"entrypoint"),n("span",{class:"token punctuation"},":"),s(` /cron.sh
    `),n("span",{class:"token key atrule"},"depends_on"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` db
      `),n("span",{class:"token punctuation"},"-"),s(` redis

  `),n("span",{class:"token key atrule"},"proxy"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"build"),n("span",{class:"token punctuation"},":"),s(` ./proxy
    `),n("span",{class:"token key atrule"},"restart"),n("span",{class:"token punctuation"},":"),s(` always
    `),n("span",{class:"token key atrule"},"ports"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" 4080"),n("span",{class:"token punctuation"},":"),n("span",{class:"token number"},"80"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" 44445"),n("span",{class:"token punctuation"},":"),n("span",{class:"token number"},"443"),s(`
    `),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" certs"),n("span",{class:"token punctuation"},":"),s("/etc/nginx/certs"),n("span",{class:"token punctuation"},":"),s(`ro
      `),n("span",{class:"token punctuation"},"-"),s(" vhost.d"),n("span",{class:"token punctuation"},":"),s(`/etc/nginx/vhost.d
      `),n("span",{class:"token punctuation"},"-"),s(" html"),n("span",{class:"token punctuation"},":"),s(`/usr/share/nginx/html
      `),n("span",{class:"token punctuation"},"-"),s(" /var/run/docker.sock"),n("span",{class:"token punctuation"},":"),s("/tmp/docker.sock"),n("span",{class:"token punctuation"},":"),s(`ro
    `),n("span",{class:"token key atrule"},"networks"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" proxy"),n("span",{class:"token punctuation"},"-"),s(`tier

`),n("span",{class:"token key atrule"},"volumes"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"db"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"driver"),n("span",{class:"token punctuation"},":"),s(` local
    `),n("span",{class:"token key atrule"},"driver_opts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'none'"),s(`
      `),n("span",{class:"token key atrule"},"o"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'bind'"),s(`
      `),n("span",{class:"token key atrule"},"device"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'./dbdata'"),s(`

  `),n("span",{class:"token key atrule"},"nextcloud"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"driver"),n("span",{class:"token punctuation"},":"),s(` local
    `),n("span",{class:"token key atrule"},"driver_opts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'none'"),s(`
      `),n("span",{class:"token key atrule"},"o"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'bind'"),s(`
      `),n("span",{class:"token key atrule"},"device"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'./appdata'"),s(`
      
  `),n("span",{class:"token key atrule"},"certs"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"driver"),n("span",{class:"token punctuation"},":"),s(` local
    `),n("span",{class:"token key atrule"},"driver_opts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'none'"),s(`
      `),n("span",{class:"token key atrule"},"o"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'bind'"),s(`
      `),n("span",{class:"token key atrule"},"device"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'./certdata'"),s(`

  `),n("span",{class:"token key atrule"},"vhost.d"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"driver"),n("span",{class:"token punctuation"},":"),s(` local
    `),n("span",{class:"token key atrule"},"driver_opts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'none'"),s(`
      `),n("span",{class:"token key atrule"},"o"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'bind'"),s(`
      `),n("span",{class:"token key atrule"},"device"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'./vhostdata'"),s(`

  `),n("span",{class:"token key atrule"},"html"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"driver"),n("span",{class:"token punctuation"},":"),s(` local
    `),n("span",{class:"token key atrule"},"driver_opts"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'none'"),s(`
      `),n("span",{class:"token key atrule"},"o"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'bind'"),s(`
      `),n("span",{class:"token key atrule"},"device"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'./htmldata'"),s(`

`),n("span",{class:"token key atrule"},"networks"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"proxy-tier"),n("span",{class:"token punctuation"},":"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),E=n("p",null,[n("strong",null,[s("注意替换配置文件中"),n("code",null,"MYSQL_ROOT_PASSWORD"),s("为你设置的密码")])],-1),z=n("h2",{id:"初始化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#初始化","aria-hidden":"true"},"#"),s(" 初始化")],-1),C={href:"https://demo.mydomain.com:44445",target:"_blank",rel:"noopener noreferrer"};function L(N,H){const c=i("CodeTabs"),o=i("ExternalLinkIcon");return p(),u("div",null,[m,v,l(c,{id:"6",data:[{id:"db.env"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("db.env")]),tab0:e(({value:a,isActive:t})=>[b]),_:1},8,["data"]),y,l(c,{id:"30",data:[{id:"Dockerfile"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("Dockerfile")]),tab0:e(({value:a,isActive:t})=>[_]),_:1}),h,l(c,{id:"38",data:[{id:"nginx.conf"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("nginx.conf")]),tab0:e(({value:a,isActive:t})=>[g]),_:1},8,["data"]),w,l(c,{id:"46",data:[{id:"uploadsize.conf"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("uploadsize.conf")]),tab0:e(({value:a,isActive:t})=>[f]),_:1},8,["data"]),x,$,A,l(c,{id:"60",data:[{id:"ssl"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("ssl")]),tab0:e(({value:a,isActive:t})=>[S]),_:1}),T,D,P,l(c,{id:"74",data:[{id:"Dockerfile"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("Dockerfile")]),tab0:e(({value:a,isActive:t})=>[R]),_:1}),O,l(c,{id:"82",data:[{id:"nginx.conf"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("nginx.conf")]),tab0:e(({value:a,isActive:t})=>[q]),_:1},8,["data"]),I,l(c,{id:"90",data:[{id:"docker-compose.yml"}],"tab-id":"language"},{title0:e(({value:a,isActive:t})=>[s("docker-compose.yml")]),tab0:e(({value:a,isActive:t})=>[M]),_:1},8,["data"]),E,z,n("p",null,[s("打开浏览器输入："),n("a",C,[s("https://demo.mydomain.com:44445"),l(o)]),s("初始化管理员账号。")])])}const U=r(k,[["render",L],["__file","install.html.vue"]]);export{U as default};
