import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as n,f as t}from"./app-PgAZdStI.js";const i={},c=t(`<h2 id="无法访问market-place" tabindex="-1"><a class="header-anchor" href="#无法访问market-place" aria-hidden="true">#</a> 无法访问market place</h2><p>可能是DNS解析不正确造成的，将服务器的DNS地址改为8.8.8.8和114.114.114.114。</p><h2 id="解除rocket-chat上传文件大小限制" tabindex="-1"><a class="header-anchor" href="#解除rocket-chat上传文件大小限制" aria-hidden="true">#</a> 解除Rocket.Chat上传文件大小限制</h2><h3 id="rocket-chat设置" tabindex="-1"><a class="header-anchor" href="#rocket-chat设置" aria-hidden="true">#</a> Rocket.Chat设置</h3><p>workspace -&gt; Settings -&gt; File Upload -&gt; Maximum File Upload Size (in bytes) 设置为 1073741824 (1GB)</p><h3 id="nginx设置" tabindex="-1"><a class="header-anchor" href="#nginx设置" aria-hidden="true">#</a> Nginx设置</h3><p>编辑本地nginx配置文件：<code>/etc/nginx/conf-enabled/client_max_body_size.conf</code>修改内容为：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">1024000m</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8),s=[c];function r(o,d){return a(),n("div",null,s)}const p=e(i,[["render",r],["__file","troubleshooting.html.vue"]]);export{p as default};
