# SJasonP Apps

English | [简体中文](README.zh-CN.md)

`apps.sjasonp.net` is the public app hub for SJasonP apps. It provides product pages, get/download pages, support pages, and privacy policy pages for apps such as History Lib and Folders Guard.

The site is intentionally small: a localized React frontend plus a lightweight Node server for static hosting, canonical redirects, and IP-derived region detection.

## Features

- App index and product pages
- App-specific get pages with App Store and GitHub Releases links
- App-specific support and privacy pages
- English and Simplified Chinese content
- Browser-language based UI localization
- IP-derived region detection through `/api/region`
- Canonical no-trailing-slash, lowercase public routes

## Tech Stack

- React
- TypeScript
- Vite
- Node.js

## Project Layout

```text
src/        Frontend app
server/     Static server and region API
docs/       Internal project notes and design decisions
```

## Development

Install and run the frontend:

```sh
cd src
npm install
npm run dev
```

Build the frontend:

```sh
cd src
npm run build
```

Build and run the server:

```sh
cd server
npm install
npm run build
APP_SERVER_USE_HTTP=1 npm run start
```

The frontend build output is written to `src/dist`.

## Region Detection

The get pages use `/api/region` to decide App Store availability and GitHub download acceleration. Region decisions are based only on IP-derived country information from the server, not browser language, locale, or time zone.

Supported country-code sources include `CF-IPCountry`, `CloudFront-Viewer-Country`, `X-Vercel-IP-Country`, `X-Appengine-Country`, `X-Country-Code`, `X-GeoIP-Country`, and `APP_GEOIP_COUNTRY` for local testing.

## License

MIT
