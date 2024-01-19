import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as s,f as a}from"./app-PgAZdStI.js";const i={},d=a(`<p>Nginx为iRedMail安装过程中自动安装，无需另外手动安装。但默认安装的nginx并不能直接拿来正式使用，需要修改配置文件。</p><h2 id="上传ssl证书" tabindex="-1"><a class="header-anchor" href="#上传ssl证书" aria-hidden="true">#</a> 上传ssl证书</h2><p>将证书文件上传到服务器的<code>/etc/nginx/cert</code>，当然你也可以放在自己习惯的目录下。</p><p>crt文件：<code>demo.mydomain.com.pem</code></p><p>key文件：<code>demo.mydomain.com.key</code></p><h2 id="修改配置" tabindex="-1"><a class="header-anchor" href="#修改配置" aria-hidden="true">#</a> 修改配置</h2><p>编辑<code>/etc/nginx/sites-enabled/00-default-ssl.conf</code>文件，修改如下内容：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">listen</span> <span class="token number">44444</span> ssl http2</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">listen</span> [::]:44444 ssl http2</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">server_name</span> demo.mydomain.com</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除<code>/etc/nginx/sites-enabled/00-default.conf</code>文件，不开放80端口：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">rm</span> /etc/nginx/sites-enabled/00-default.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="重启nginx" tabindex="-1"><a class="header-anchor" href="#重启nginx" aria-hidden="true">#</a> 重启nginx</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">service</span> nginx restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,12),c=[d];function t(o,l){return e(),s("div",null,c)}const u=n(i,[["render",t],["__file","config_nginx.html.vue"]]);export{u as default};
