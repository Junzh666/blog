import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as m,c as o,e as t,w as n,b as e,d as s,f as r}from"./app-j4kN759Y.js";const b={},p=r(`<div class="hint-container note"><p class="hint-container-title">注</p><p>大多数ISP会限制25端口（smtp），请与ISP沟通解除25端口限制，否则iRedmail将无法正常发送邮件。</p></div><h2 id="设置fqdn" tabindex="-1"><a class="header-anchor" href="#设置fqdn" aria-hidden="true">#</a> 设置FQDN</h2><p>编辑<code>/etc/hosts</code>文件，内容如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1 mail.mydomain.com sz-demo localhost localhost.localdomain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="修改apt源为阿里云源或清华源" tabindex="-1"><a class="header-anchor" href="#修改apt源为阿里云源或清华源" aria-hidden="true">#</a> 修改apt源为阿里云源或清华源</h2>`,5),v=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"sudo"),s(),e("span",{class:"token function"},"cp"),s(` /etc/apt/sources.list /etc/apt/sources.list.bak
`),e("span",{class:"token function"},"sudo"),s(),e("span",{class:"token function"},"cat"),s(),e("span",{class:"token operator"},">"),s(" /etc/apt/sources.list "),e("span",{class:"token operator"},"<<"),s(),e("span",{class:"token string"},`EOF
deb https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse

# deb https://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
EOF`),s(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),h=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"sudo"),s(),e("span",{class:"token function"},"cp"),s(` /etc/apt/sources.list /etc/apt/sources.list.bak
`),e("span",{class:"token function"},"sudo"),s(),e("span",{class:"token function"},"cat"),s(),e("span",{class:"token operator"},">"),s(" /etc/apt/sources.list "),e("span",{class:"token operator"},"<<"),s(),e("span",{class:"token string"},`EOF
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
# deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
EOF`),s(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),g=r(`<h2 id="安装iredmail所需组件" tabindex="-1"><a class="header-anchor" href="#安装iredmail所需组件" aria-hidden="true">#</a> 安装iRedMail所需组件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">gzip</span> dialog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="下载iredmail" tabindex="-1"><a class="header-anchor" href="#下载iredmail" aria-hidden="true">#</a> 下载iRedMail</h2>`,3),y={href:"https://www.iredmail.org/download.html",target:"_blank",rel:"noopener noreferrer"},_=e("li",null,[s("上传到服务器"),e("code",null,"/root/iRedMail-x.y.z.tar.gz")],-1),k=e("li",null,"解压安装包：",-1),f=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /root
<span class="token function">tar</span> zxf iRedMail-x.y.z.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),j={href:"https://docs.iredmail.org/install.iredmail.on.debian.ubuntu.html",target:"_blank",rel:"noopener noreferrer"};function x(z,E){const c=l("Tabs"),u=l("ExternalLinkIcon");return m(),o("div",null,[p,t(c,{id:"16",data:[{id:"阿里云镜像"},{id:"清华大学镜像"}],active:0},{title0:n(({value:i,isActive:a})=>[s("阿里云镜像")]),title1:n(({value:i,isActive:a})=>[s("清华大学镜像")]),tab0:n(({value:i,isActive:a})=>[v]),tab1:n(({value:i,isActive:a})=>[h]),_:1}),g,e("ul",null,[e("li",null,[s("访问"),e("a",y,[s("下载页面"),t(u)]),s("，下载最新的稳定版程序")]),_,k]),f,e("blockquote",null,[e("p",null,[s("参考文档："),e("a",j,[s("iRedmail官方安装文档"),t(u)])])])])}const F=d(b,[["render",x],["__file","pre-install.html.vue"]]);export{F as default};
