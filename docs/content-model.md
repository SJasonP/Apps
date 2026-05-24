# Content Model

## App Record

Each app should be represented by structured content.

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
  systemRequirements?: string[]
  features: Feature[]
}
```

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

## Initial History Lib Record

History Lib should be the first app record.

Known fields:

```text
slug: history-lib
name: History Lib
status: available
canonical page: /history-lib
support page: /history-lib/support
privacy page: /history-lib/privacy
```

Unknown fields to fill later:

- Final short description
- App Store URL
- App icon asset
- Screenshots
- Minimum macOS version
- Privacy policy details
- Support contact method

