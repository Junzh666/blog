import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as e}from"./app-j4kN759Y.js";const t={},l=e(`<h2 id="安装kvm" tabindex="-1"><a class="header-anchor" href="#安装kvm" aria-hidden="true">#</a> 安装kvm</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> qemu-kvm libvirt-daemon-system virtinst libvirt-clients bridge-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置kvm用户和组</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> kvm <span class="token environment constant">$USER</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> libvirt <span class="token environment constant">$USER</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>编辑配置文件： sudo vim /etc/libvirt/qemu.conf添加内容：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>user <span class="token operator">=</span> <span class="token string">&quot;libvirt-qemu&quot;</span>
group <span class="token operator">=</span> <span class="token string">&quot;kvm&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置kvm启动服务</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> libvirtd
<span class="token function">sudo</span> systemctl start libvirtd
<span class="token function">sudo</span> systemctl status libvirtd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置kvm桥接网络" tabindex="-1"><a class="header-anchor" href="#配置kvm桥接网络" aria-hidden="true">#</a> 配置kvm桥接网络</h2><ul><li>编辑配置文件 sudo vim /etc/netplan/01-network-manager-all.yaml 内容为：</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">network</span><span class="token punctuation">:</span>
  <span class="token key atrule">ethernets</span><span class="token punctuation">:</span>
    <span class="token key atrule">enp3s0</span><span class="token punctuation">:</span>
      <span class="token key atrule">dhcp4</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">dhcp6</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">bridges</span><span class="token punctuation">:</span>
    <span class="token key atrule">br0</span><span class="token punctuation">:</span>
      <span class="token key atrule">interfaces</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> enp3s0 <span class="token punctuation">]</span>
      <span class="token key atrule">addresses</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>10.10.2.181/16<span class="token punctuation">]</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">to</span><span class="token punctuation">:</span> default
          <span class="token key atrule">via</span><span class="token punctuation">:</span> 10.10.2.254
          <span class="token key atrule">metric</span><span class="token punctuation">:</span> <span class="token number">100</span>
          <span class="token key atrule">on-link</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">mtu</span><span class="token punctuation">:</span> <span class="token number">1500</span>
      <span class="token key atrule">nameservers</span><span class="token punctuation">:</span>
        <span class="token key atrule">addresses</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>10.10.2.254<span class="token punctuation">,</span>255.5.5.5<span class="token punctuation">]</span>
      <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
        <span class="token key atrule">stp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">forward-delay</span><span class="token punctuation">:</span> <span class="token number">4</span>
      <span class="token key atrule">dhcp4</span><span class="token punctuation">:</span> no
      <span class="token key atrule">dhcp6</span><span class="token punctuation">:</span> no
  <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果network由NetworkManager管理，先停用NetworkManager服务。</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl stop NetworkManager
<span class="token function">sudo</span> systemctl disable NetworkManager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动新的network配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> netplay apply
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样物理网卡enp3s0就不再拥有IP地址，取而代之的是br0拥有了原先物理网卡拥有的IP地址，相当于是现在本机的IP，enp3s0和kvm虚拟机的虚拟机网卡都将通过br0直接连接到物理交换机上通过dhcp获取到自己的真实IP地址。</p><h2 id="创建虚拟机" tabindex="-1"><a class="header-anchor" href="#创建虚拟机" aria-hidden="true">#</a> 创建虚拟机</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>virt-install <span class="token parameter variable">--name</span> vm01 <span class="token punctuation">\\</span>
 --os-variant ubuntu22.04 <span class="token punctuation">\\</span>
 <span class="token parameter variable">--vcpus</span> <span class="token number">4</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">--memory</span> <span class="token number">8192</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">--location</span> /data/ubuntu-22.04.2-live-server-amd64.iso,kernel<span class="token operator">=</span>casper/vmlinuz,initrd<span class="token operator">=</span>casper/initrd <span class="token punctuation">\\</span>
 <span class="token parameter variable">--network</span> <span class="token assign-left variable">bridge</span><span class="token operator">=</span>br0,model<span class="token operator">=</span>virtio <span class="token punctuation">\\</span>
 <span class="token parameter variable">--disk</span> <span class="token assign-left variable">path</span><span class="token operator">=</span>/data/kvm_images/vm01.qcow2,size<span class="token operator">=</span><span class="token number">20</span>,bus<span class="token operator">=</span>virtio <span class="token punctuation">\\</span>
 <span class="token parameter variable">--graphics</span> none <span class="token punctuation">\\</span>
 --extra-args<span class="token operator">=</span><span class="token string">&#39;console=ttyS0,115200n8 --- console=ttyS0,115200n8&#39;</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">--debug</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="virsh操作虚拟机" tabindex="-1"><a class="header-anchor" href="#virsh操作虚拟机" aria-hidden="true">#</a> virsh操作虚拟机</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动</span>
<span class="token function">virsh</span> start <span class="token operator">&lt;</span>vm<span class="token operator">&gt;</span>

<span class="token comment"># 停止</span>
<span class="token function">virsh</span> destroy <span class="token operator">&lt;</span>vm<span class="token operator">&gt;</span>

<span class="token comment"># 软重启</span>
<span class="token function">virsh</span> <span class="token function">reboot</span> <span class="token operator">&lt;</span>vm<span class="token operator">&gt;</span>

<span class="token comment"># 硬重启</span>
<span class="token function">virsh</span> reset <span class="token operator">&lt;</span>vm<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),i=[l];function p(o,c){return s(),a("div",null,i)}const d=n(t,[["render",p],["__file","kvm.html.vue"]]);export{d as default};
