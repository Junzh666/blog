import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,f as e}from"./app-V8cbPLlB.js";const p={},l=e(`<h2 id="原服务器" tabindex="-1"><a class="header-anchor" href="#原服务器" aria-hidden="true">#</a> 原服务器</h2><p>生成备份数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> openldap/<span class="token punctuation">{</span>config,lib<span class="token punctuation">}</span>
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-r</span> /var/lib/ldap openldap/lib/
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-r</span> /etc/ldap openldap/config/

<span class="token comment"># 打包</span>
<span class="token function">sudo</span> <span class="token function">tar</span> czvf openldap.tar.gz openldap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将文件copy到新服务器上。</p><h2 id="新服务器" tabindex="-1"><a class="header-anchor" href="#新服务器" aria-hidden="true">#</a> 新服务器</h2><p>安装OpenLDAP:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> slapd ldap-utils 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>清空本地OpenLDAP数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl stop slapd.service
<span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/ldap/*
<span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/ldap/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开始迁移：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 解压</span>
<span class="token function">tar</span> zxvf openldap.tar.gz
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-r</span> openldap/config/ldap/* /etc/ldap/
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-r</span> openldap/lib/ldap/* /var/lib/ldap/

<span class="token comment"># 修改权限</span>
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> openldap:openldap /var/lib/ldap/
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> openldap:openldap /etc/ldap/<span class="token punctuation">{</span>ldap.conf,slapd.conf,slapd.d<span class="token punctuation">}</span>

<span class="token comment"># 重启openldap</span>
<span class="token function">sudo</span> systemctl restart slapd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),i=[l];function c(t,d){return a(),s("div",null,i)}const u=n(p,[["render",c],["__file","migrate_ldap.html.vue"]]);export{u as default};
