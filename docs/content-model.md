# Content Model

## App Record

Each app should be represented by structured content.

Every user-facing content field must be localized for `en-US` and `zh-Hans`.

Suggested fields:

```ts
type AppRecord = {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  platforms: AppPlatform[]
  status: AppStatus
  icon: string
  screenshots: Screenshot[]
  downloadLinks: DownloadLink[]
  supportPath: string
  privacyPath: string
  faqPath?: string
  supportEmail: string
  systemRequirements?: string[]
  features: Feature[]
  previewTitle: string
  previewSubtitle: string
  previewItems: PreviewItem[]
  supportFaq: FaqItem[]
  privacy: PrivacyItem[]
}
```

Implementation may either store localized app records directly by locale or store localized fields inside each record. The current implementation stores complete records by locale.

## Platform

Suggested platform values:

```ts
type AppPlatform = 'macOS' | 'iOS' | 'iPadOS' | 'watchOS' | 'visionOS' | 'Web'
```

## Status

Suggested status values:

```ts
type AppStatus =
  | 'available'
  | 'beta'
  | 'coming-soon'
  | 'archived'
```

## Download Link

Suggested download link fields:

```ts
type DownloadLink = {
  label: string
  url: string
  kind: 'app-store' | 'github-release' | 'direct-download' | 'website'
}
```

## Screenshot

Suggested screenshot fields:

```ts
type Screenshot = {
  src: string
  alt: string
  caption?: string
}
```

## Feature

Suggested feature fields:

```ts
type Feature = {
  title: string
  description: string
}
```

## Preview Item

Suggested preview item fields:

```ts
type PreviewItem = {
  label: string
  value: string
}
```

## FAQ Item

Suggested FAQ item fields:

```ts
type FaqItem = {
  question: string
  answer: string
}
```

## Privacy Item

Suggested privacy item fields:

```ts
type PrivacyItem = {
  title: string
  description: string
}
```

## Initial History Lib Record

History Lib should be the first app record.

Known fields:

```text
slug: history-lib
name: History Lib
status: available
version: 1.0
platforms: macOS, iOS
system requirements: macOS 26 or later, iOS 26 or later
canonical page: /history-lib
support page: /history-lib/support
privacy page: /history-lib/privacy
support email: support@sjasonp.net
```

Unknown fields to fill later:

- App Store URL
- Screenshots

The first implementation uses the real History Lib app icon from the HistoryLib project.

The App Store URL is:

```text
https://apps.apple.com/app/history-lib/id6761198319
```

## Initial Folders Guard Record

Folders Guard should be represented as a first-version app record.

Known fields:

```text
slug: folders-guard
name: Folders Guard
status: available
version: 1.0.0
platforms: macOS, Windows, Linux, CLI
canonical page: /folders-guard
support page: /folders-guard/support
privacy page: /folders-guard/privacy
support email: support@sjasonp.net
download page: https://github.com/SJasonP/FoldersGuard/releases
```

The first implementation uses the real FoldersGuard app icon from the FoldersGuard project.
