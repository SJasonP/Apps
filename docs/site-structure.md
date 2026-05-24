# Site Structure

## Routes

First-version routes:

```text
/
/support
/history-lib
/history-lib/support
/history-lib/privacy
/folders-guard
/folders-guard/support
/folders-guard/privacy
```

Optional future route:

```text
/history-lib/faq
```

Deferred global route:

```text
/privacy
```

Global support exists as an app support index. Global privacy may exist later, but App Store metadata should prefer app-specific privacy URLs.

## Home Page

The home page is an app index.

It should show:

- Site identity: SJasonP Apps
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
- Primary download action
- Screenshots or product imagery
- Core features
- Platform and system requirements
- Support link
- Privacy link
- FAQ summary when useful

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
