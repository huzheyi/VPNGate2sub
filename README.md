# VPNGate 节点浏览器 · OpenVPN → Mihomo 配置转换

一个单文件 Cloudflare Worker:抓取 [VPNGate](https://www.vpngate.net) 公开的 OpenVPN 节点列表,
在网页上浏览/筛选/排序,并能一键把任意节点的 OpenVPN 配置转换成 [Mihomo](https://wiki.metacubex.one/config/proxies/openvpn/)
(Clash Meta 内核) 的 `type: openvpn` 代理配置段。全部逻辑(抓取解析在 Worker 端,配置转换在浏览器端)都在这一个文件里,不需要数据库、不需要 KV。

![img](./01.png)

![img](./02.png)

## 功能

- 服务端拉取 `https://www.vpngate.net/api/iphone/` 的 CSV 数据并解析为 JSON(`GET /api/servers`),带 5 分钟边缘缓存,页面右上角"刷新"按钮可强制绕过缓存重新抓取。
- 网页列出所有节点全部字段:国家(旗帜)、主机名/IP、评分、Ping(延迟色点)、速度(0-1000Mbps 条形图)、在线会话(同样按延迟规则着色的徽章)、运行时间、累积用户数、累积流量、运营者、说明(CSV 原始 Message 字段)、协议(TCP/UDP 徽章)。表格铺满整个视口宽度,列宽按"最小宽度 + 权重"自适应:宽屏时按权重把多余空间分给主机/IP、速度、运营者、说明等列,窄屏时各列停在最小宽度、整表左右滚动,不会挤压变形。工具栏和表头固定在顶部,始终可见,表头随内容左右滚动同步移动。
- 每个节点在操作列有两个按钮(旁边的"协议"列会显示自动解析出的 TCP/UDP 徽章):
  - **OpenVPN**:直接打开详情弹窗的"OpenVPN 配置"标签页,展示解码后的原始 `.ovpn` 文本,一键复制到剪贴板 / 下载 `.ovpn` 文件。
  - **Mihomo**:直接打开详情弹窗的"Mihomo 配置段"标签页,自动解析 `.ovpn` 中的 `remote / proto / cipher / auth / ca / cert / key / tls-crypt / comp-lzo` 等字段,生成整体带 2 格缩进、可直接粘贴进 Mihomo `proxies:` 列表的配置段,同样支持编辑后复制 / 下载。转换时如遇到 mihomo 未明确支持的取值(如 tap 模式、非常见 cipher、使用 tls-auth 而非 tls-crypt 等)会在界面上给出提示。
- 支持勾选多个节点,"批量导出 Mihomo"一次性生成完整的 `proxies:` 列表。

## 部署方法

### 方式一:Cloudflare 控制台直接粘贴(最简单)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → 创建 Worker。
2. 打开在线编辑器,把本项目的 `worker.js` 全部内容粘贴进去,保存并部署即可。
3. 访问分配到的 `*.workers.dev` 域名。

### 方式二:使用 Wrangler CLI

```bash
npm install -g wrangler   # 如已安装可跳过
wrangler login
cd 该项目目录
wrangler deploy
```

`wrangler.toml` 已配置好 `name` 和 `main`,直接 `wrangler deploy` 即可。如需绑定自己的域名,把 `wrangler.toml` 里注释的 `routes` 部分取消注释并改成你的域名。

> 部署后无需任何额外环境变量或 KV/D1 绑定,开箱即用。

## 目录结构

```
worker.js       ← 唯一需要部署的文件(由 page.html + worker-logic.js 构建而成)
wrangler.toml   ← Wrangler 部署配置
page.html       ← 前端页面源码(便于你后续修改样式/交互)
worker-logic.js ← Worker 端路由与 CSV 解析源码
build.js        ← 构建脚本:node build.js 会读取 page.html + worker-logic.js 重新生成 worker.js
```

如果你只是想部署,**只需要 `worker.js`**(以及可选的 `wrangler.toml`)。其余文件是给你后续二次开发用的源码;修改 `page.html` 或 `worker-logic.js` 后,运行 `node build.js` 重新生成 `worker.js` 即可(纯 Node 脚本,无第三方依赖)。

## 技术说明 / 已知限制

- **CSV 解析**:VPNGate 返回的是逗号分隔文本,`Operator`/`Message` 是自由文本,偶尔可能包含逗号。解析时按"前 13 个固定字段 + 最后一个字段固定是 Base64 配置 + 中间剩余部分合并还原为 Message"的策略处理,已用真实数据和含逗号的边界场景测试通过。
- **Mihomo 字段映射**:严格按照 [wiki.metacubex.one 的 openvpn 代理文档](https://wiki.metacubex.one/config/proxies/openvpn/) 实现,支持的 `cipher` 为 `AES-128-GCM/AES-256-GCM/AES-128-CBC/AES-256-CBC/CHACHA20-POLY1305`,`auth` 为 `MD5/SHA1/SHA256/SHA384/SHA512`。如果某节点用的是列表之外的算法(比如老旧的 `BF-CBC`),仍会原样写入配置,但界面会给出黄色警告提示你注意兼容性。
- **tls-auth vs tls-crypt**:mihomo 文档目前只暴露 `tls-crypt` 字段。如果原始配置用的是 `tls-auth`(单独的 HMAC 签名密钥,还可能带 `key-direction`),转换时会尽力把内容映射到 `tls-crypt` 字段并给出提示,请连接异常时手动核实。
- **dev tap**:mihomo 目前只支持 `tun` 模式;如果原配置是 `dev tap`(二层桥接),会提示该节点大概率无法通过 mihomo 使用。
- **边缘缓存**:`/api/servers` 结果按 Cloudflare Cache API 缓存 5 分钟,减少对 vpngate.net 的重复请求压力;不同边缘节点的缓存彼此独立,属于正常现象。

## 免责声明

- 节点数据来自 [VPNGate](https://www.vpngate.net)(日本筑波大学的 VPN 中继学术实验项目),请遵守你所在地区的法律法规使用。
- 本工具是第三方浏览 / 格式转换界面,与 VPNGate 项目、Mihomo / Clash Meta 项目均无官方关联。
