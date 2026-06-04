# SJasonP Apps

[English](README.md) | 简体中文

`apps.sjasonp.net` 是 SJasonP Apps 的公开应用中心，用于展示 History Lib、Folders Guard 等 App 的产品页面、获取/下载页面、支持页面和隐私政策页面。

这个项目保持轻量：一个支持本地化的 React 前端，加上一个用于静态托管、规范化跳转和 IP 地区检测的 Node 服务。

## 功能

- App 索引页和产品页
- 每个 App 独立的获取页面，支持 App Store 和 GitHub Releases 链接
- 每个 App 独立的支持页面和隐私政策页面
- 美式英语和简体中文内容
- 基于浏览器语言的界面本地化
- 通过 `/api/region` 进行基于 IP 的地区检测
- 公开页面使用无尾斜杠、小写路径的规范 URL

## 技术栈

- React
- TypeScript
- Vite
- Node.js

## 项目结构

```text
src/        前端应用
server/     静态服务器和地区 API
docs/       项目内部说明和设计决策
```

## 开发

安装并运行前端：

```sh
cd src
npm install
npm run dev
```

构建前端：

```sh
cd src
npm run build
```

构建并运行服务端：

```sh
cd server
npm install
npm run build
APP_SERVER_USE_HTTP=1 npm run start
```

前端构建产物会输出到 `src/dist`。

## 地区检测

获取页面使用 `/api/region` 判断 App Store 可用性和 GitHub 下载加速。地区判断只依据服务端获得的 IP 国家/地区信息，不使用浏览器语言、locale 或时区。

支持的国家/地区代码来源包括 `CF-IPCountry`、`CloudFront-Viewer-Country`、`X-Vercel-IP-Country`、`X-Appengine-Country`、`X-Country-Code`、`X-GeoIP-Country`，以及用于本地测试的 `APP_GEOIP_COUNTRY`。

## 许可证

MIT
