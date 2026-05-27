# Deployment

## Production Domain

Public production URL:

```text
https://apps.sjasonp.net
```

The public site should be served through HTTPS on the standard port.

## Local Service Port

The app service port is:

```text
6202
```

This port should not normally appear in public user-facing URLs.

## SSL Certificates

Configured certificate files:

```text
/Library/WebServer/SSL/sjasonp.net.pem
/Library/WebServer/SSL/sjasonp.net.key
```

## Routing Requirements

The production server must support direct access to frontend routes.

These URLs should load correctly after refresh:

```text
https://apps.sjasonp.net/history-lib
https://apps.sjasonp.net/history-lib/support
https://apps.sjasonp.net/history-lib/privacy
```

Trailing-slash public page routes should redirect to canonical no-trailing-slash routes.

Public page routes whose path contains uppercase letters should permanently redirect to the all-lowercase canonical path.

Examples:

```text
https://apps.sjasonp.net/History-Lib -> https://apps.sjasonp.net/history-lib
https://apps.sjasonp.net/history-Lib/support -> https://apps.sjasonp.net/history-lib/support
https://apps.sjasonp.net/History-Lib/Privacy/ -> https://apps.sjasonp.net/history-lib/privacy
```

The canonical URL rules apply only to user-facing pages.

Internal paths should not be canonicalized by the page URL policy:

```text
https://apps.sjasonp.net/assets/index-ABC123.js
https://apps.sjasonp.net/api/StatusCheck
```

## IP Region Detection

The get page uses `/api/region` for legal availability and GitHub acceleration decisions.

The region decision must be based on IP-derived country information only. Browser language, locale, and time zone must not be used for region availability.

The server accepts these country-code sources, in priority order:

```text
CF-IPCountry
CloudFront-Viewer-Country
X-Vercel-IP-Country
X-Appengine-Country
X-Country-Code
X-GeoIP-Country
APP_GEOIP_COUNTRY
```

For local testing:

```text
APP_SERVER_USE_HTTP=1 APP_GEOIP_COUNTRY=CN npm run start
```

For production, configure the edge/CDN/reverse proxy to provide one of the supported IP-derived country headers. If no country code is provided, `/api/region` returns an unknown region and restricted App Store links remain unavailable.

## Build

The frontend project uses Vite and lives in:

```text
src
```

Frontend build command:

```text
npm run build
```

Expected output directory:

```text
src/dist
```

The server project lives in:

```text
server
```

Server build command:

```text
npm run build
```

Server start command:

```text
npm run start
```

For local HTTP-only verification:

```text
APP_SERVER_USE_HTTP=1 npm run start
```

## Open Questions

- Which server will serve production: nginx, Apache, Caddy, or a Node static server
- Whether canonical redirects should be handled by the server, the app, or both
- Whether deployment will run directly on macOS or another host
