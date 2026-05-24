# URL Policy

## Canonical Form

This policy applies to public, user-facing page routes.

It does not apply to internal implementation paths such as static assets, API routes, source maps, or framework-generated files.

Public page URLs use no trailing slash, except for the root path.

The path portion of every public page URL must always be lowercase.

Canonical examples:

```text
https://apps.sjasonp.net/
https://apps.sjasonp.net/history-lib
https://apps.sjasonp.net/history-lib/support
https://apps.sjasonp.net/history-lib/privacy
```

Non-canonical examples:

```text
https://apps.sjasonp.net/History-Lib
https://apps.sjasonp.net/history-Lib/support
https://apps.sjasonp.net/history-lib/
https://apps.sjasonp.net/history-lib/support/
https://apps.sjasonp.net/history-lib/privacy/
```

Internal paths are not canonicalized by this policy:

```text
/assets/index-ABC123.js
/api/StatusCheck
```

## Redirects

Trailing-slash variants of public page routes should redirect permanently to the canonical no-trailing-slash form.

```text
/history-lib/ -> /history-lib
/history-lib/support/ -> /history-lib/support
/history-lib/privacy/ -> /history-lib/privacy
```

Requests for public page routes whose path contains uppercase letters should redirect permanently to the all-lowercase path.

```text
/History-Lib -> /history-lib
/history-Lib/support -> /history-lib/support
/History-Lib/Privacy/ -> /history-lib/privacy
```

If a public page URL has both uppercase letters and a trailing slash, the final canonical URL should be lowercase and should not include a trailing slash.

Internal paths such as `/assets/...` and `/api/...` should not be redirected only because they contain uppercase letters or a trailing slash.

## Slug Rules

App slugs use lowercase kebab-case.

Examples:

```text
history-lib
folders-guard
gpg-toolkit
```

## Route Rules

The route pattern is:

```text
/
/{app-slug}
/{app-slug}/support
/{app-slug}/privacy
/{app-slug}/faq
```

The FAQ route is optional and should only exist when an app has enough FAQ content to justify a separate page.

## Search And Sharing

All public page links, canonical metadata, sitemap entries, and App Store URLs should use the canonical no-trailing-slash form.

The site must not rely on hash URLs for primary pages.

Do not use:

```text
/#/history-lib
```

Use:

```text
/history-lib
```
