# SEO And Metadata

## Purpose

`apps.sjasonp.net` lists search engines and App Store review among its primary audiences. Each public page must be independently discoverable, correctly titled, and crawlable without executing client JavaScript.

This document defines indexable rendering, per-page metadata, social sharing metadata, structured data, and crawl assets.

## Indexable Rendering

Public pages are statically prerendered at build time. The build emits one HTML file per enumerable public route, with the page's metadata and main content already present in the markup.

- Prerendering covers every route listed in `docs/site-structure.md`, derived from the app content at build time.
- Prerendered HTML uses the `en-US` fallback locale as its indexable baseline, consistent with `docs/i18n.md`.
- On load, the client hydrates and, for `zh` browsers, swaps visible text, `document.title`, meta description, and `document.documentElement.lang` to `zh-Hans`.
- The site does not use server-side rendering. Content is static and routes are enumerable, so build-time prerendering is the chosen approach.

The get page is prerendered as a static shell carrying its baseline title and description. Its device- and region-specific download resolution still runs client-side, because that decision depends on IP-derived country information and browser platform information that are not available at build time.

## Locale And Crawlers

Public page URLs are language-neutral and carry no locale prefix, per `docs/i18n.md` and `docs/url-policy.md`. Because there is no per-locale URL, the site does not declare `hreflang` alternate URLs.

- The indexable baseline served to crawlers is `en-US`.
- Locale negotiation for human visitors is client-side, based on browser language.
- The `en-US` baseline content must be complete on every prerendered page so a crawler that does not execute JavaScript still receives full, accurate content.

## Per-Page Metadata

Every public route must define a localized title and meta description. Titles use the form `Page — SJasonP Apps`, except the home page, which is exactly `SJasonP Apps`.

| Route | Title | Description source |
| --- | --- | --- |
| `/` | `SJasonP Apps` | Site one-line description |
| `/support` | `Support — SJasonP Apps` | Global support intro |
| `/{slug}` | `{App Name} — SJasonP Apps` | App `shortDescription` |
| `/{slug}/get` | `Get {App Name} — SJasonP Apps` | Get-page intro |
| `/{slug}/support` | `{App Name} Support — SJasonP Apps` | App `shortDescription` |
| `/{slug}/privacy` | `{App Name} Privacy — SJasonP Apps` | App `shortDescription` |

Descriptions reuse existing localized content fields. No new user-facing copy is introduced solely for metadata. Both the prerendered baseline and the client locale swap must keep title and description in sync with the rendered page.

## Canonical Link

Every public page must include a single `<link rel="canonical">` pointing to its own canonical no-trailing-slash, lowercase URL, as defined in `docs/url-policy.md`. The canonical URL is absolute and uses the production origin `https://apps.sjasonp.net`.

## Social Sharing

Every public page must include Open Graph and Twitter Card metadata:

- `og:type` is `website`.
- `og:site_name` is `SJasonP Apps`.
- `og:title` and `og:description` match the page title and description.
- `og:url` matches the canonical URL.
- `og:image` is an absolute URL. Product pages use the app icon; other pages use the site mark. Provide a light-background image so previews render on both light and dark clients.
- `twitter:card` is `summary`.

## Structured Data

Each app product page (`/{slug}`) must embed one `application/ld+json` block describing the app as `schema.org/SoftwareApplication`:

- `name`, `description`, `operatingSystem`, `applicationCategory`
- `offers` with `price` and `priceCurrency` when the app is free or priced
- `downloadUrl` pointing to the app's get page
- `image` pointing to the app icon
- `softwareVersion` sourced from `shared.ts`

Structured data must not be added to non-product pages.

## robots.txt

The build emits `robots.txt` at the site root:

- Allow all user agents to crawl public pages.
- Disallow `/api/`.
- Reference the sitemap absolute URL.

## sitemap.xml

The build emits `sitemap.xml` at the site root from the app content:

- List every canonical public page URL in the no-trailing-slash, lowercase form.
- Use absolute URLs on the production origin.
- Exclude `/api/` routes and internal asset paths.
- Regenerate automatically whenever apps or routes change, so the sitemap never drifts from the content.
