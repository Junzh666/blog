import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as t,c,b as e,d as s,e as l,f as o}from"./app-V8cbPLlB.js";const d={},r={class:"hint-container tip"},u=e("p",{class:"hint-container-title"},"提示",-1),p={href:"https://github.com/chxuan/vimplus",target:"_blank",rel:"noopener noreferrer"},m=o(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/chxuan/vimplus.git ~/.vimplus
<span class="token builtin class-name">cd</span> ~/.vimplus
./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后使用<code>vim</code>命令编辑文件时，会提示：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>The ycmd server SHUT DOWN (restart with &#39;:YcmRestartServer&#39;)...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决办法：使用<code>apt</code>重新安装<code>vim-youcompleteme</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> vim-youcompleteme
vim-addons remove youcompleteme
vim-addons <span class="token function">install</span> youcompleteme
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function v(h,b){const n=i("ExternalLinkIcon");return t(),c("div",null,[e("div",r,[u,e("p",null,[s("参考：vimplus官方github仓库："),e("a",p,[s("https://github.com/chxuan/vimplus"),l(n)])])]),m])}const g=a(d,[["render",v],["__file","vimplus_issue.html.vue"]]);export{g as default};
