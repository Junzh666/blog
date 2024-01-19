---
title: Ubuntu下安装并使用KVM虚拟机
date: 2024-01-19
isOriginal: true
category:
    - Linux
    - 运维
tag: 
    - kvm
    - 虚拟化
---

## 安装kvm

```shell
sudo update
sudo apt install -y qemu-kvm libvirt-daemon-system virtinst libvirt-clients bridge-utils
```

- 配置kvm用户和组

```shell
sudo usermod -aG kvm $USER
sudo usermod -aG libvirt $USER
```

- 编辑配置文件： sudo vim /etc/libvirt/qemu.conf添加内容：

```shell
user = "libvirt-qemu"
group = "kvm"
```

- 配置kvm启动服务

```shell
sudo systemctl enable libvirtd
sudo systemctl start libvirtd
sudo systemctl status libvirtd
```

## 配置kvm桥接网络

- 编辑配置文件 sudo vim /etc/netplan/01-network-manager-all.yaml 内容为：

```yaml
network:
  ethernets:
    enp3s0:
      dhcp4: false
      dhcp6: false
  bridges:
    br0:
      interfaces: [ enp3s0 ]
      addresses: [10.10.2.181/16]
      routes:
        - to: default
          via: 10.10.2.254
          metric: 100
          on-link: true
      mtu: 1500
      nameservers:
        addresses: [10.10.2.254,255.5.5.5]
      parameters:
        stp: true
        forward-delay: 4
      dhcp4: no
      dhcp6: no
  version: 2
```

::: tip
如果network由NetworkManager管理，先停用NetworkManager服务。
:::

```shell
sudo systemctl stop NetworkManager
sudo systemctl disable NetworkManager
```

启动新的network配置：

```shell
sudo netplay apply
```

这样物理网卡enp3s0就不再拥有IP地址，取而代之的是br0拥有了原先物理网卡拥有的IP地址，相当于是现在本机的IP，enp3s0和kvm虚拟机的虚拟机网卡都将通过br0直接连接到物理交换机上通过dhcp获取到自己的真实IP地址。

## 创建虚拟机

```shell
virt-install --name vm01 \
 --os-variant ubuntu22.04 \
 --vcpus 4 \
 --memory 8192 \
 --location /data/ubuntu-22.04.2-live-server-amd64.iso,kernel=casper/vmlinuz,initrd=casper/initrd \
 --network bridge=br0,model=virtio \
 --disk path=/data/kvm_images/vm01.qcow2,size=20,bus=virtio \
 --graphics none \
 --extra-args='console=ttyS0,115200n8 --- console=ttyS0,115200n8' \
 --debug
```

### virsh操作虚拟机

```shell
# 启动
virsh start <vm>

# 停止
virsh destroy <vm>

# 软重启
virsh reboot <vm>

# 硬重启
virsh reset <vm>
```
