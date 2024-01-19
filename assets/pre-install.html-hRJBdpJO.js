const e=JSON.parse('{"key":"v-52ea53ae","path":"/book/oasystem/02-iredmail/pre-install.html","title":"准备工作","lang":"zh-CN","frontmatter":{"title":"准备工作","order":1,"date":"2024-01-17T00:00:00.000Z","article":false,"category":["Linux","运维"],"tag":["iredmail","邮件"],"description":"注 大多数ISP会限制25端口（smtp），请与ISP沟通解除25端口限制，否则iRedmail将无法正常发送邮件。 设置FQDN 编辑/etc/hosts文件，内容如下： 127.0.0.1 mail.mydomain.com sz-demo localhost localhost.localdomain","head":[["meta",{"property":"og:url","content":"https://www,ppsuper.com/book/oasystem/02-iredmail/pre-install.html"}],["meta",{"property":"og:site_name","content":"Cheny的博客"}],["meta",{"property":"og:title","content":"准备工作"}],["meta",{"property":"og:description","content":"注 大多数ISP会限制25端口（smtp），请与ISP沟通解除25端口限制，否则iRedmail将无法正常发送邮件。 设置FQDN 编辑/etc/hosts文件，内容如下： 127.0.0.1 mail.mydomain.com sz-demo localhost localhost.localdomain"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-19T15:33:32.000Z"}],["meta",{"property":"article:author","content":"Cheny"}],["meta",{"property":"article:tag","content":"iredmail"}],["meta",{"property":"article:tag","content":"邮件"}],["meta",{"property":"article:published_time","content":"2024-01-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-19T15:33:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"准备工作\\",\\"description\\":\\"注 大多数ISP会限制25端口（smtp），请与ISP沟通解除25端口限制，否则iRedmail将无法正常发送邮件。 设置FQDN 编辑/etc/hosts文件，内容如下： 127.0.0.1 mail.mydomain.com sz-demo localhost localhost.localdomain\\"}"]]},"headers":[{"level":2,"title":"设置FQDN","slug":"设置fqdn","link":"#设置fqdn","children":[]},{"level":2,"title":"修改apt源为阿里云源或清华源","slug":"修改apt源为阿里云源或清华源","link":"#修改apt源为阿里云源或清华源","children":[]},{"level":2,"title":"安装iRedMail所需组件","slug":"安装iredmail所需组件","link":"#安装iredmail所需组件","children":[]},{"level":2,"title":"下载iRedMail","slug":"下载iredmail","link":"#下载iredmail","children":[]}],"git":{"createdTime":1705477578000,"updatedTime":1705678412000,"contributors":[{"name":"cheny","email":"cheny@iciwh.com","commits":4},{"name":"Cheny","email":"junzh666@gmail.com","commits":2}]},"readingTime":{"minutes":1.39,"words":416},"filePathRelative":"book/oasystem/02-iredmail/pre-install.md","localizedDate":"2024年1月17日","excerpt":"<div class=\\"hint-container note\\">\\n<p class=\\"hint-container-title\\">注</p>\\n<p>大多数ISP会限制25端口（smtp），请与ISP沟通解除25端口限制，否则iRedmail将无法正常发送邮件。</p>\\n</div>\\n<h2> 设置FQDN</h2>\\n<p>编辑<code>/etc/hosts</code>文件，内容如下：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token number\\">127.0</span>.0.1 mail.mydomain.com sz-demo localhost localhost.localdomain\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};