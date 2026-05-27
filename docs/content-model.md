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
  iconDark?: string
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

Implementation stores one directory per App. Shared App metadata lives outside locale files, while user-facing App content is split into one file per supported locale. Each App directory assembles those files into a `LocalizedAppRecord`, and the content index aggregates all Apps into locale-specific lists for rendering.

If an App provides separate light and dark icons, store the default light icon in `icon` and the dark-mode icon in `iconDark`. Rendering should follow `prefers-color-scheme` so App icons adapt independently from localized content.

## Source Layout

App content is split by ownership:

```text
src/src/content/types.ts
src/src/content/statusLabels.ts
src/src/content/apps/historyLib/shared.ts
src/src/content/apps/historyLib/enUS.ts
src/src/content/apps/historyLib/zhHans.ts
src/src/content/apps/historyLib/index.ts
src/src/content/apps/foldersGuard/shared.ts
src/src/content/apps/foldersGuard/enUS.ts
src/src/content/apps/foldersGuard/zhHans.ts
src/src/content/apps/foldersGuard/index.ts
src/src/content/apps/index.ts
src/src/content/index.ts
```

To add an App:

1. Add a new `src/src/content/apps/{appName}/` directory.
2. Put shared slug, name, platform, status, version, icon, and support email fields in `shared.ts`.
3. Put each locale's user-facing App content in `enUS.ts` and `zhHans.ts`.
4. Assemble the shared and localized records in that App directory's `index.ts`.
5. Add that assembled record to `src/src/content/apps/index.ts`.

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
support email: SJasonP@iCloud.com
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
support email: SJasonP@iCloud.com
download page: https://github.com/SJasonP/FoldersGuard/releases
```

The first implementation uses the real FoldersGuard app icon from the FoldersGuard project.
