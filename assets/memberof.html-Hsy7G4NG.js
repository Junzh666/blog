import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o,c as r,a,b as e,d as s,f as l}from"./app-PgAZdStI.js";const c={},t=l(`<h2 id="关于group" tabindex="-1"><a class="header-anchor" href="#关于group" aria-hidden="true">#</a> 关于Group</h2><div class="hint-container warning"><p class="hint-container-title">注意</p><p>默认情况下，OpenLDAP的用户组属性为Posixgroup，起与用户之间没有实际对应关系，这会导致LDAP无法根据用户与组之间的隶属关系做查询。而在实际的项目和组织架&gt;构管理中，这种隶属关系的应用很普遍，所以需要启用LDAP的memberOf模块。 普遍情况下启动memberOf模块并不复杂，网上的教程和文档也很多，但由于<strong>这里的OpenLDAP是由iRedMail自动安装和配置的</strong>，网上的资源完全无法使用。</p></div><p><strong>为什么会出现这种情况？</strong></p><p>OpenLDAP是在iRedMail的自动安装脚本过程中自动被安装的，我们无法控制这一过程，我曾尝试先安装配置OpenLDAP后再将iRedMail手动接入，但由于iRedMail所包含的组件较多，涉及到LDAP的相关配置很复杂最终放弃。在这种情况下我们只有一条路可以走，那就是使用iRedMail自动配置好的OpenLDAP策略，这会导致一个问题，OpenLDAP的<strong>静态配置</strong>和<strong>动态配置</strong>问题。</p><p><strong>静态配置</strong>：我想修改LDAP的配置，我只能修改/etc/ldap/slapd.conf这配置文件，删除slapd.d目录后，通过slaptest重新生成子配置文件，重启OpenLDAP生效。</p><p><strong>动态配置</strong>：使用ldapadd通过编辑ldif文件内容执行OpenLDAP配置，这需要执行一条命令，不需要重启服务。而iRedMail安装的OpenLDAP使用的是静态配置，而网上的教程采用的是动态配置。所以不管你怎么执行动态配置的命令，都无法修改slapd.d目录下的内容，也就无法添加memberof模块。</p><h2 id="静态模式下配置memberof" tabindex="-1"><a class="header-anchor" href="#静态模式下配置memberof" aria-hidden="true">#</a> 静态模式下配置memberOf</h2><h3 id="_1-修改-etc-ldap-slapd-conf文件-在moduleload-back-monitor的下一行插入2行" tabindex="-1"><a class="header-anchor" href="#_1-修改-etc-ldap-slapd-conf文件-在moduleload-back-monitor的下一行插入2行" aria-hidden="true">#</a> 1. 修改<code>/etc/ldap/slapd.conf</code>文件，在moduleload back_monitor的下一行插入2行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>moduleload memberof
moduleload refint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-在database-monitor的上一行添加" tabindex="-1"><a class="header-anchor" href="#_2-在database-monitor的上一行添加" aria-hidden="true">#</a> 2. 在<code>database monitor</code>的上一行添加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>database config
access to *
    by <span class="token assign-left variable">dn.exact</span><span class="token operator">=</span><span class="token string">&quot;gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth&quot;</span> manage
    by * none
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-在database-mdb的下一行添加" tabindex="-1"><a class="header-anchor" href="#_3-在database-mdb的下一行添加" aria-hidden="true">#</a> 3. 在<code>database mdb</code>的下一行添加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>overlay memberof
overlay refint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-刷新配置文件" tabindex="-1"><a class="header-anchor" href="#_4-刷新配置文件" aria-hidden="true">#</a> 4. 刷新配置文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span> /etc/ldap/slapd.d
<span class="token function">sudo</span> <span class="token function">mkdir</span> /etc/ldap/slapd.d
<span class="token function">sudo</span> slaptest <span class="token parameter variable">-f</span> /etc/ldap/slapd.conf <span class="token parameter variable">-F</span> /etc/ldap/slapd.d
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> openldap:openldap /etc/ldap/slapd.d
<span class="token function">sudo</span> <span class="token function">service</span> slapd restar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-创建应用组" tabindex="-1"><a class="header-anchor" href="#_5-创建应用组" aria-hidden="true">#</a> 5. 创建应用组</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span>  <span class="token operator">&gt;</span> groups.ldif <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
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
EOF</span>


ldapadd <span class="token parameter variable">-D</span> <span class="token string">&quot;cn=Manager,dc=mydomain,dc=com&quot;</span> <span class="token parameter variable">-w</span> <span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>-x <span class="token parameter variable">-f</span>  groups.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),m={href:"https://www.openldap.org/doc/admin24/overlays.html",target:"_blank",rel:"noopener noreferrer"},p={href:"https://forum.iredmail.org/topic8673-general-ldap-setup-question.html",target:"_blank",rel:"noopener noreferrer"};function u(b,v){const n=i("ExternalLinkIcon");return o(),r("div",null,[t,a("blockquote",null,[a("p",null,[e("参考资料： "),a("a",m,[e("https://www.openldap.org/doc/admin24/overlays.html"),s(n)]),a("a",p,[e("https://forum.iredmail.org/topic8673-general-ldap-setup-question.html"),s(n)])])])])}const f=d(c,[["render",u],["__file","memberof.html.vue"]]);export{f as default};
