---
title: ubuntu系统中增加lv容量
date: 2024-01-19
isOriginal: true
category:
    - linux
    - 运维
tag: 
    - ubuntu
    - LV
---

> [!important]
> Ubuntu系统在默认情况下会自动以lv（Logical Volume）作为系统盘的管理方式。如果你没有在安装系统时手动修改/目录空间大小，会默认分配 ==100GB== 给整个根目录。当然你也可以随时扩展。

## 扩展Ubuntu默认lv空间

```zsh
# 查看LVM空间
sudo lvdisplay

# 将所有剩余空间分配给LVM
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv

# 使调整后的LVM空间生效
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

当然能够扩展的前提是lv所分配的物理硬盘有足够的空间进行扩展，如果没有硬盘空间则需要增加一块硬盘。

## 添加硬盘，并将其扩展到lv

假使添加的这块硬盘在ubuntu中的name为`/dev/sdb`

### 创建分区

`sudo fdisk /dev/sdb` 通过如下按键创建新的分区`n -> 回车 -> 回车 -> 回车 -> w`
创建好的分区名为：`/dev/sdb` 

### 创建pv

```bash
sudo pvcreate /dev/sdb1
```

### 将pv添加到vg

```bash
sudo vgextend ubuntu-vg /dev/sdd1
```

### 扩展lv大小

有两种扩展方式，任选其一：

```bash
# 增加10G空间给lv
sudo lvextend -r -L +10G /dev/ubuntu-vg/ubuntu-lv

# 将所有空间分配给lv
lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
```

### 重新调整实际分区大小

```bash
resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

## 验证

使用`df -h`可以看到新的/目录是否是扩展后的大小，同理每一次新建硬盘都可以用这种方式对lv进行扩展。
