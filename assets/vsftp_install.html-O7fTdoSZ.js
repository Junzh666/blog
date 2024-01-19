import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as c,c as r,e as d,w as n,f as o,d as u,b as e}from"./app-j4kN759Y.js";const p={},v=o(`<h2 id="安装服务" tabindex="-1"><a class="header-anchor" href="#安装服务" aria-hidden="true">#</a> 安装服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> vsftpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户" aria-hidden="true">#</a> 创建用户</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> adduser ftpuser
<span class="token function">sudo</span> <span class="token function">mkdir</span> /opt/ftp
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> ftpuser:ftpuser /opt/ftp 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置" aria-hidden="true">#</a> 修改配置</h2><p>/etc/vsftpd.conf文件内容：</p>`,6),m=e("div",{class:"language-config line-numbers-mode","data-ext":"config"},[e("pre",{class:"language-config"},[e("code",null,`listen=NO
listen_ipv6=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
local_root=/opt/ftp
allow_writeable_chroot=YES

secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1);function b(f,_){const s=t("CodeTabs");return c(),r("div",null,[v,d(s,{id:"14",data:[{id:"vscftpd.conf"}],"tab-id":"language"},{title0:n(({value:a,isActive:i})=>[u("vscftpd.conf")]),tab0:n(({value:a,isActive:i})=>[m]),_:1},8,["data"])])}const k=l(p,[["render",b],["__file","vsftp_install.html.vue"]]);export{k as default};
