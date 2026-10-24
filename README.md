# 鸣鹤 MingHe 项目介绍网站

中文响应式静态网站，包含项目特性、可复制的 Docker 部署命令、Bria Mobile iOS / Android 下载入口、SIP 配置提示、Tantuns H5 推荐终端和常见问题。无需运行时依赖或环境变量。

## 本地开发

需要 Node.js 20 或更高版本：

```sh
npm run dev
```

访问 http://localhost:3000 。

## 部署到 Vercel

将此仓库推送到 GitHub，在 Vercel 中选择 **Add New → Project**，导入本仓库并部署。仓库自带 `vercel.json`：

- Framework Preset：Other
- Build Command：`npm run build`
- Output Directory：`dist`
- 环境变量：无需设置

也可在项目目录执行 `npx vercel`（需登录 Vercel）。

```sh
npm run build
```

产物在 `dist/`，可部署至任意静态托管平台。

**Vercel 仅托管本介绍网站。MingHe SIP 服务需要支持固定 TCP/UDP 端口的 VPS，不能由本静态站运行。**

## 内容与素材

- 项目资料：https://github.com/619dev/minghe
- Bria Mobile 官方下载来源：https://support.counterpath.com/hc/download-bria
- H5 资料及产品图：https://tantuns.com/ip-phones/wi-fi-ip-handsets/h5/
- H5 图片保存在 `public/tantuns-h5.png`，版权归原权利人所有。
- H5 支持 SIP；其 TLS / SDES-SRTP 及证书信任能力需向厂商确认并实机验证。
- 字体通过 Google Fonts 加载；不可用时自动回退到系统字体。

网站没有账号、追踪脚本或虚构通话功能。图中的分机连接为架构示意。
