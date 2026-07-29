# VPNGate 节点浏览器 · OpenVPN → Mihomo 配置转换

一个单文件 Cloudflare Worker:抓取 [VPNGate](https://www.vpngate.net) 公开的 OpenVPN 节点列表,
在网页上浏览/筛选/排序,并能一键把任意节点的 OpenVPN 配置转换成 [Mihomo](https://wiki.metacubex.one/config/proxies/openvpn/)
(Clash Meta 内核) 的 `type: openvpn` 代理配置段。收藏夹数据保存在 Cloudflare KV,页面与 API 仍全部由同一个 Worker 提供。

![img](./01.png)

![img](./02.png)

## 功能

- 服务端拉取 `https://www.vpngate.net/api/iphone/` 的 CSV 数据并解析为 JSON(`GET /api/servers`),带 5 分钟边缘缓存,页面右上角"刷新"按钮可强制绕过缓存重新抓取。
- 网页列出所有节点全部字段:国家(旗帜)、主机名/IP、评分、Ping(延迟色点)、速度(0-1000Mbps 条形图)、在线会话(同样按延迟规则着色的徽章)、运行时间、累积用户数、累积流量、运营者、说明(CSV 原始 Message 字段)、协议(TCP/UDP 徽章)。表格铺满整个视口宽度,列宽按"最小宽度 + 权重"自适应:宽屏时按权重把多余空间分给主机/IP、速度、运营者、说明等列,窄屏时各列停在最小宽度、整表左右滚动,不会挤压变形。工具栏和表头固定在顶部,始终可见,表头随内容左右滚动同步移动。
- 每个节点在操作列有两个按钮(旁边的"协议"列会显示自动解析出的 TCP/UDP 徽章):
  - **OpenVPN**:直接打开详情弹窗的"OpenVPN 配置"标签页,展示解码后的原始 `.ovpn` 文本,一键复制到剪贴板 / 下载 `.ovpn` 文件。
  - **Mihomo**:直接打开详情弹窗的"Mihomo 配置段"标签页,自动解析 `.ovpn` 中的 `remote / proto / cipher / auth / ca / cert / key / tls-crypt / comp-lzo` 等字段,生成整体带 2 格缩进、可直接粘贴进 Mihomo `proxies:` 列表的配置段,同样支持编辑后复制 / 下载。转换时如遇到 mihomo 未明确支持的取值(如 tap 模式、非常见 cipher、使用 tls-auth 而非 tls-crypt 等)会在界面上给出提示。
- 支持勾选多个节点,"批量导出 Mihomo"一次性生成完整的 `proxies:` 列表。
- 支持建立多个**订阅收藏夹**,每个收藏夹可自定义名称和订阅地址后缀:
  - 单节点点击"收藏",或勾选多个节点后点击"加入收藏夹",即可加入指定收藏夹。
  - 页面右侧提供可展开/收起的收藏夹抽屉,可直接切换收藏夹、查看节点、全选或批量移除节点、一键清空。
  - 抽屉内通过紧凑图标直接新建、编辑、删除收藏夹和复制订阅地址；新建与编辑表单也在抽屉内展开,不再打开额外的管理窗口。
  - 每个收藏夹提供独立的 `https://你的域名/ADMIN_TOKEN/sub/自定义后缀` YAML 地址,内容是该收藏夹内节点对应的 Mihomo `proxies:` 配置,可直接用作 Mihomo `proxy-providers` 的 URL。
  - 加入收藏夹时会在 KV 中保存该节点的 OpenVPN 配置快照,节点从 VPNGate 实时列表中暂时消失时不会立即影响已有收藏。
- 部署时设置 `ADMIN_TOKEN` Worker Secret 后,打开页面需要先输入访问密码；节点和收藏夹 API 都会受到保护,订阅地址也必须在 `/sub/` 前包含这个密码。

## 部署方法

### 方式一:Cloudflare 控制台直接粘贴(最简单)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Storage & Databases → KV,手动创建一个 KV namespace。
2. 进入 Workers & Pages,创建 Worker,打开在线编辑器,把本项目的 `worker.js` 全部内容粘贴进去并部署。
3. 在 Worker 的 **Settings → Bindings** 中添加刚才创建的 KV Namespace,变量名必须填写 `SUBSCRIPTIONS`。
4. 在 **Settings → Variables and Secrets** 中添加加密 Secret `ADMIN_TOKEN`（推荐使用随机 UUID）,用于保护页面、API 和订阅地址。
5. 访问分配到的 `*.workers.dev` 域名。

### 方式二:使用 Wrangler CLI

```bash
npx wrangler login
npx wrangler kv namespace create SUBSCRIPTIONS
```

把命令返回的 KV namespace ID 手动填写到 `wrangler.toml` 中已注释的 `kv_namespaces` 配置,再执行 `npx wrangler deploy`。本项目不会自动创建或自动选择 Cloudflare 资源。如需绑定自己的域名,把 `wrangler.toml` 里注释的 `routes` 部分取消注释并改成你的域名。

设置页面和订阅访问密码:

```bash
npx wrangler secret put ADMIN_TOKEN
```

按提示输入密钥。浏览器只会把输入的访问密码保存在当前标签页的 `sessionStorage` 中。

## 本地预览和交互测试

本地开发服务器只依赖 Node.js 20+,不需要安装 Wrangler,也不会访问 Cloudflare 账号:

```bash
node dev-server.mjs
```

启动后访问 <http://127.0.0.1:8787>。开发服务器会自动运行 `node build.js`,使用实时 VPNGate API 获取节点,并把收藏夹保存在本地 `.local-data/subscriptions-kv.json` 中。

如果本机暂时无法访问 VPNGate,可以用两个本地模拟节点测试全部页面交互:

```bash
VPNGATE_MOCK=1 node dev-server.mjs
```

如需在本地测试访问密码和带密码的订阅路径:

```bash
ADMIN_TOKEN=your-local-token node dev-server.mjs
```

修改 `page.html` 或 `worker-logic.js` 后需要重启开发服务器。运行接口自动化测试:

```bash
node --test tests/worker.test.mjs
```

Mihomo `proxy-providers` 示例:

```yaml
proxy-providers:
  vpngate-favorites:
    type: http
    url: "https://你的域名/你的ADMIN_TOKEN/sub/japan-fast"
    path: ./providers/vpngate-favorites.yaml
    interval: 3600
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 600
```

## 目录结构

```
worker.js       ← Worker 入口文件(由 page.html + worker-logic.js 构建而成)
wrangler.toml   ← Wrangler 部署配置
dev-server.mjs  ← 无需 Wrangler 的 Node.js 本地开发服务器
page.html       ← 前端页面源码(便于你后续修改样式/交互)
worker-logic.js ← Worker 端路由与 CSV 解析源码
build.js        ← 构建脚本:node build.js 会读取 page.html + worker-logic.js 重新生成 worker.js
```

如果你通过 Cloudflare 控制台部署,可以只复制 `worker.js`,但仍须手动创建并绑定 `SUBSCRIPTIONS` KV。通过 Wrangler 部署时请保留 `wrangler.toml`,并手动填写 KV namespace ID。其余文件是给你后续二次开发用的源码;修改 `page.html` 或 `worker-logic.js` 后,运行 `node build.js` 重新生成 `worker.js` 即可(纯 Node 脚本,无第三方依赖)。

## 技术说明 / 已知限制

- **CSV 解析**:VPNGate 返回的是逗号分隔文本,`Operator`/`Message` 是自由文本,偶尔可能包含逗号。解析时按"前 13 个固定字段 + 最后一个字段固定是 Base64 配置 + 中间剩余部分合并还原为 Message"的策略处理,已用真实数据和含逗号的边界场景测试通过。
- **Mihomo 字段映射**:严格按照 [wiki.metacubex.one 的 openvpn 代理文档](https://wiki.metacubex.one/config/proxies/openvpn/) 实现,支持的 `cipher` 为 `AES-128-GCM/AES-256-GCM/AES-128-CBC/AES-256-CBC/CHACHA20-POLY1305`,`auth` 为 `MD5/SHA1/SHA256/SHA384/SHA512`。如果某节点用的是列表之外的算法(比如老旧的 `BF-CBC`),仍会原样写入配置,但界面会给出黄色警告提示你注意兼容性。
- **tls-auth vs tls-crypt**:mihomo 文档目前只暴露 `tls-crypt` 字段。如果原始配置用的是 `tls-auth`(单独的 HMAC 签名密钥,还可能带 `key-direction`),转换时会尽力把内容映射到 `tls-crypt` 字段并给出提示,请连接异常时手动核实。
- **dev tap**:mihomo 目前只支持 `tun` 模式;如果原配置是 `dev tap`(二层桥接),会提示该节点大概率无法通过 mihomo 使用。
- **边缘缓存**:`/api/servers` 结果按 Cloudflare Cache API 缓存 5 分钟,减少对 vpngate.net 的重复请求压力;不同边缘节点的缓存彼此独立,属于正常现象。
- **收藏夹容量**:单个收藏夹最多保存 500 个节点。收藏夹 API 和订阅地址均设置为 `no-store`;Cloudflare KV 本身采用最终一致性,修改后极少数边缘位置可能需要短暂时间才能看到新内容。
- **访问权限**:未设置 `ADMIN_TOKEN` 时页面和 API 会保持未保护状态,旧式 `/sub/后缀` 地址也仍可读取。公网部署必须设置该 Secret。`ADMIN_TOKEN` 会出现在 Mihomo 订阅 URL 中,请把整条订阅地址视作管理凭据,不要分享给不受信任的人。

## 免责声明

- 节点数据来自 [VPNGate](https://www.vpngate.net)(日本筑波大学的 VPN 中继学术实验项目),请遵守你所在地区的法律法规使用。
- 本工具是第三方浏览 / 格式转换界面,与 VPNGate 项目、Mihomo / Clash Meta 项目均无官方关联。
