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

## 介绍视频

首屏「观看短片」入口跳转至 `#film` 播放区域，八种语言页面均提供原生播放器、封面与下载入口。视频由用户点击播放，页面初次加载不预取 MP4；画面为中文，各语言页面均有说明。

- 成片：`public/media/minghe-intro.mp4`，24 秒、1920×1080、30 fps，H.264 / AAC，约 2.2 MB，已优化渐进式网页播放。
- 封面：`public/media/minghe-intro.jpg`；视频首帧也已使用此封面。
- 部署后可通过 `/media/minghe-intro.mp4` 与 `/media/minghe-intro.jpg` 引用，构建时自动复制到 `dist/media/`。
- 内容为电话插画与虚构对话的情景演绎，非实机通话录屏。
- Music: Sascha Ende, ende.app (CC BY 4.0)，曲目 “Happy Beats / Business Moves Vol.12”，许可：https://ende.app/en/standard-license 。音效来自 Kenney（CC0），回铃音本地合成；音乐署名同时保留在片尾。
- `brag-output/` 和 `brag-output-*/` 是本地视频工程与中间产物，已通过 `.gitignore` 排除；仅成片和封面纳入网站仓库。

## 语言与主题

- 支持简体中文、英语、日语、韩语、西班牙语、俄语、法语和德语，页首语言选择器随时切换。
- 独立入口为 `/zh.html`、`/en.html`、`/ja.html`、`/ko.html`、`/es.html`、`/ru.html`、`/fr.html`、`/de.html`，可直接分享访问。
- 根路径 `/` 首次访问时参考浏览器语言列表，不支持的语言回退到英语；手动选择保存在本地。切换保留当前章节和查询参数。
- 明亮 / 暗色主题默认跟随系统；手动选择后保存，并在语言页面间保持一致。
- `index.html` 为中文源文件；`translations.json` 维护英语，`locales/{语言}.json` 维护另外六种语言，`locales/config.json` 维护语言名称、无障碍标签、元信息及交互提示。
- `scripts/localize.mjs` 在开发启动和构建时生成八种语言的 HTML 和 `locale-config.js`。新增中文正文没有对应翻译时构建会报错。页面正文不依赖运行时翻译服务。
- `preferences.js` 在样式加载前应用主题，减少主题闪烁。本地存储不可用时仍可切换语言与主题，偏好不跨页面保存。

## 源码架构网页

页首导航和页脚的「源码架构」入口打开 `/architecture.html`；八种语言入口均可访问，图内说明为中文。

- 基于 MingHe 提交 `8d00f52dd6234bc5b2a736d77a925b68b07ade92`，分析 TLS 接入、Digest 注册、呼叫路由、JWE 消息和内存离线队列。
- 明确区分默认 DTLS-SRTP 端到端路径、可选 ZRTP 透明中继和 SDES 解密后重加密兼容中继；源码链接固定到分析版本。
- 使用 [Archify](https://github.com/tt-a1i/archify) 3.2.0 生成，工具提交 `25cf37080fc8b1dbe758a4efc3935b55f3327083`；项目本地安装位于 `.tools/archify`，不纳入网站仓库。
- `public/architecture.html` 为无需运行时依赖的生成产物；构建自动复制至 `dist/architecture.html`。
- 候选源文件、许可和自动验证记录保存在 `docs/architecture/`。验证记录中的绝对路径代表生成时位置；公开网页是验证产物的逐字节副本。

重新生成（需要 Node.js、Chrome 以及对应版本 MingHe 源码）：

```sh
git clone https://github.com/tt-a1i/archify.git .tools/archify
git -C .tools/archify checkout 25cf37080fc8b1dbe758a4efc3935b55f3327083
mkdir -p .archify/architecture-minghe-20261024-180000
cp docs/architecture/candidate.json .archify/architecture-minghe-20261024-180000/candidate.json
node .tools/archify/archify/bin/archify.mjs finalize architecture .archify/architecture-minghe-20261024-180000/candidate.json .archify/architecture-minghe-20261024-180000/minghe.html --repo-root ../minghe --quality showcase --json
cp .archify/architecture-minghe-20261024-180000/minghe.html public/architecture.html
npm run build
```
