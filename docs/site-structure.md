# Site Structure

## Routes

First-version routes:

```text
/
/support
/history-lib
/history-lib/get
/history-lib/support
/history-lib/privacy
/folders-guard
/folders-guard/get
/folders-guard/support
/folders-guard/privacy
```

Routes are language-neutral. The same route renders `en-US` or `zh-Hans` content based on browser language.

Optional future route:

```text
/history-lib/faq
```

Deferred global route:

```text
/privacy
```

Global support exists as an app support index. Global privacy may exist later, but App Store metadata should prefer app-specific privacy URLs.

## Page Metadata

Every route defines its own title, meta description, canonical URL, Open Graph and Twitter Card metadata. App product pages additionally embed `SoftwareApplication` structured data. Titles, descriptions, and structured-data rules are specified in `docs/seo.md`.

Routes are prerendered to static HTML so each page is fully titled and crawlable without executing JavaScript. The home and product pages are the primary indexable targets.

## Home Page

The home page is an app index.

It should show:

- Site identity: `SJasonP Apps`, with `SJasonP` visually muted and `Apps` emphasized
- A short description of the app hub
- A list of apps
- For each app: icon, name, one-line description, platform, availability, and primary action
- Links to support and privacy areas

The first screen should expose app content quickly instead of acting as a generic landing page.

## App Product Page

Each app page should follow a shared structure:

- App icon
- App name
- One-line positioning statement
- Primary `Get Now` action linking to the app-specific get page
- Screenshots or product imagery
- Core features
- Platform and system requirements
- Support link
- Privacy link
- FAQ summary when useful

## Get Page

Each app get page should choose the best available acquisition path from browser-provided information.

It should:

- Infer device platform from browser platform and user agent information.
- Determine whether the user appears to be in mainland China or the EU27 only from IP-derived country information provided by the server.
- Disable App Store links for mainland China and EU27, because current apps are not supplied there.
- Select the matching GitHub release asset for macOS, Windows, Linux, iOS, or Android when available.
- Use `gh-proxy.org` for GitHub release downloads when the user appears to be in mainland China.
- Show a clear unavailable message when no direct asset exists for the detected device.

The frontend must not use browser language, locale, or time zone as a legal availability signal. Production deployments must provide IP-derived country information to `/api/region`, for example through Cloudflare `CF-IPCountry`, CloudFront `CloudFront-Viewer-Country`, Vercel `X-Vercel-IP-Country`, an equivalent reverse-proxy header, or a server-side GeoIP database integration.

Country and region names shown to users should be localized with `Intl.DisplayNames` from the IP-derived country code. User-visible country/region names must not add special labels for internal availability groups.

## Support Page

Each support page should include:

- App name
- Contact or support method
- Common questions
- Troubleshooting guidance where applicable
- Links back to the app page and privacy page

## Privacy Page

Each privacy page should be specific to one app.

It should explain:

- What data the app collects
- What data stays on device
- Whether network access is used
- Whether third-party services or SDKs are used
- How users can request support or deletion if applicable

## Decisions

- Add `/support` in the first version as an app support index.
- Do not add a global `/privacy` page in the first version.
- Keep FAQ content inside each app support page until an app has enough FAQ content to justify a separate route.
- Show version information on app pages. Changelog content can be added later when the release history is ready.
