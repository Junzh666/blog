---
title: Gitlab优化指南
date: 2024-01-19
isOriginal: true
category:
    - Linux
    - 运维
tag: 
    - gitlab
    - 优化
---

## 在内存受限的环境中运行

在启用所有功能的情况下运行时，GitLab 需要大量内存。有一些用例，例如在不需要所有功能的较小安装上运行GitLab。例子包括：

- 运行GitLab 供个人使用或非常小的团队使用。
- 使用云提供商上的小实例来节省成本。
- 使用资源受限的设备，如 Raspberry PI。

通过一些调整，GitLab 可以在比[最低要求](https://docs.gitlab.cn/jh/install/requirements.html)中描述的规格低得多的规格下舒适地运行。

以下部分包含允许在不满足最低要求的环境中运行的建议。虽然大多数部件在这些设置到位后应该可以正常工作，但您可能会遇到产品功能和性能的意外降级。您应该能够与最多 5 个开发人员一起运行 GitLab，并且单个 Git 项目不超过 100MB。

## 受限环境的最低要求

可以运行 GitLab 的最低预期规格是：

- 基于 Linux 的系统（最好基于 Debian 或基于 RedHat）
- 4 个 ARM7/ARM64 CPU 内核或 1 个 AMD64 架构 CPU 内核
- 最低 2GB RAM + 1GB SWAP，最佳为 2.5GB RAM + 1GB SWAP
- 20GB 可用存储空间

以上列表中，CPU 的单核性能和存储的随机 I/O 性能影响最大。存储尤其重要，因为在受限环境中，我们预计会发生一定量的内存交换，这会给使用过的磁盘带来更大的压力。小平台性能有限的一个常见问题是磁盘存储速度非常慢，这会导致系统范围的瓶颈。

使用这些最小设置，系统应该在常规操作期间使用 swap。由于并非所有组件都同时使用，因此它应该提供可接受的性能。

## 验证系统的性能

有许多工具可以让您验证基于 Linux 的系统的性能。可以帮助检查系统性能的项目之一是 [sbc-bench](https://github.com/ThomasKaiser/sbc-bench)。它描述了系统测试的所有注意事项以及不同行为对系统性能的影响，这在嵌入式系统中运行 GitLab 时尤其重要。它可以用作一种验证系统性能是否足以在受限环境中运行GitLab 的方法。

这些系统提供足够的性能来运行GitLab 的小型安装：

- [Raspberry PI 4 2GB](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/).
- [DigitalOcean Basic 2GB with SSD](https://www.digitalocean.com/pricing).
- [Scaleway DEV1-S 2GB/20GB](https://www.scaleway.com/en/pricing/).
- [GCS e2-small](https://cloud.google.com/compute/docs/machine-types).

## 配置 Swap

在安装 GitLab 之前，您需要配置 swap。Swap 是磁盘上的专用空间，在物理 RAM 已满时使用。当 Linux 系统耗尽 RAM 时，非活动页面将从 RAM 移动到交换空间。

交换使用通常被认为是一个问题，因为它会增加延迟。但是，由于 GitLab 的运作方式，分配的大部分内存不会被频繁访问。使用 swap 允许应用程序正常运行和运行，并且只偶尔使用 swap。

一般准则是将交换配置为可用内存的 50% 左右。对于内存受限的环境，建议为系统配置至少 1GB 的交换空间。有许多关于如何做到这一点的指南：

- [如何在 Ubuntu 20.04 配置 swap 空间](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-20-04/)
- [如何在 CentOS 7 配置 swap 空间](https://linuxize.com/post/how-to-add-swap-space-on-centos-7/)

配置后，您应该验证交换是否已正确启用：

```bash
free -h
              total        used        free      shared  buff/cache   available
Mem:          1.9Gi       115Mi       1.4Gi       0.0Ki       475Mi       1.6Gi
Swap:         1.0Gi          0B       1.0Gi
```

您还可以通过调整 `/proc/sys/vm/swappiness` 来配置系统使用 swap 空间的频率。 Swappiness 范围在 `0` 和 `100` 之间。 默认值为 `60`。较低的值降低了 Linux 对释放匿名内存页面并将它们写入交换的偏好，但它增加了对文件支持页面执行相同操作的偏好：

1. 在当前会话中配置它：

```bash
sudo sysctl vm.swappiness=10
```

编辑 `/etc/sysctl.conf` 使其永久化：

```bash
vm.swappiness=10
```

## 优化 Puma

这是一项实验性 Alpha 功能，如有更改，恕不另行通知。该功能尚未准备好用于生产用途。如果您想使用此功能，我们建议您先使用非生产数据进行测试。

默认情况下，GitLab 使用旨在处理许多并发连接的配置运行。

对于不需要高吞吐量的小型安装，考虑禁用 Puma [集群模式](https://github.com/puma/puma#clustered-mode)。 结果，只有一个 Puma 进程可以为应用程序提供服务。

在 `/etc/gitlab/gitlab.rb` 中：

```bash
puma['worker_processes'] = 0
```

我们观察到以这种方式配置 Puma 内存使用量减少了 100-400MB。

## 优化 Sidekiq

Sidekiq 是一个后台处理守护进程。 默认情况下使用 GitLab 配置时，它以 `50` 的高并发模式运行。这确实会影响它在给定时间可以分配多少内存。建议将其配置为使用显着较小的 `5` 或 `10`（首选）值。

在 `/etc/gitlab/gitlab.rb` 中：

```bash
sidekiq['max_concurrency'] = 10
```

## 优化 Gitaly

Gitaly 是一种存储服务，允许高效访问基于 Git 的存储库。建议配置 Gitaly 强制执行的最大并发和内存限制。

在 `/etc/gitlab/gitlab.rb` 中：

```bash
gitaly['ruby_max_rss'] = 200_000_000
gitaly['concurrency'] = [
  {
    'rpc' => "/gitaly.SmartHTTPService/PostReceivePack",
    'max_per_repo' => 3
  }, {
    'rpc' => "/gitaly.SSHService/SSHUploadPack",
    'max_per_repo' => 3
  }
]

gitaly['cgroups_repositories_count'] = 2
gitaly['cgroups_mountpoint'] = '/sys/fs/cgroup'
gitaly['cgroups_hierarchy_root'] = 'gitaly'
gitaly['cgroups_memory_bytes'] = 500000
gitaly['cgroups_cpu_shares'] = 512

gitaly['env'] = {
  'GITALY_COMMAND_SPAWN_MAX_PARALLEL' => '2'
}
```

## 禁用监控

GitLab 默认启用所有服务，无需任何额外配置即可提供完整的 DevOps 解决方案。 一些默认服务，如监控，对于 GitLab 的运行来说不是必不可少的，可以禁用以节省内存。

在 `/etc/gitlab/gitlab.rb` 中：

```bash
prometheus_monitoring['enable'] = false
```

我们观察到以这种方式配置 GitLab 减少了 200MB 的内存使用量。

## 配置 GitLab 如何处理内存

GitLab 由许多组件（用 Ruby 和 Go 编写）组成，其中 GitLab Rails 是最大的一个，占用的内存最多。

GitLab Rails 使用 [jemalloc](https://github.com/jemalloc/jemalloc) 作为内存分配器。[jemalloc](https://github.com/jemalloc/jemalloc) 以更大的块预分配内存，这些块也被保留更长的时间以提高性能。以牺牲一些性能为代价，您可以将 GitLab 配置为在不再需要内存后立即释放内存，而不是将其保留更长的时间。

在 `/etc/gitlab/gitlab.rb` 中：

```bash
gitlab_rails['env'] = {
  'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000'
}

gitaly['env'] = {
  'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000'
}
```

我们在应用程序执行期间观察到更稳定的内存使用情况。

## 禁用额外的应用程序内监控

GitLab 使用内部数据结构来衡量自身的不同方面。如果禁用监控，则不再需要这些功能。

要禁用这些功能，您需要转到 GitLab 的管理中心并禁用 Prometheus Metrics 功能：

1. 进入 GitLab 网页界面。
1. 在顶部栏上，选择 **主菜单 > 管理员**。
1. 在左侧边栏上，选择 **设置 > 指标与分析**。
1. 展开 **指标 - Prometheus**。
1. 禁用 **启用 Prometheus 指标**。
1. 选择 **保存更改**。

## 包含所有更改的配置

1. 如果您应用到目前为止描述的所有内容，您的 `/etc/gitlab/gitlab.rb` 文件应该包含以下配置：

```bash
puma['worker_processes'] = 0

sidekiq['max_concurrency'] = 10

prometheus_monitoring['enable'] = false

gitlab_rails['env'] = {
    'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000'
}

gitaly['cgroups_repositories_count'] = 2
gitaly['cgroups_mountpoint'] = '/sys/fs/cgroup'
gitaly['cgroups_hierarchy_root'] = 'gitaly'
gitaly['cgroups_memory_bytes'] = 500000
gitaly['cgroups_cpu_shares'] = 512

gitaly['concurrency'] = [
    {
    'rpc' => "/gitaly.SmartHTTPService/PostReceivePack",
    'max_per_repo' => 3
    }, {
    'rpc' => "/gitaly.SSHService/SSHUploadPack",
    'max_per_repo' => 3
    }
]
gitaly['env'] = {
    'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000',
    'GITALY_COMMAND_SPAWN_MAX_PARALLEL' => '2'
}
```

进行所有这些更改后，重新配置GitLab 以使用新设置：

```bash
sudo gitlab-ctl reconfigure
```

此操作可能需要一段时间，因为到目前为止，GitLab 无法使用内存保守设置。
