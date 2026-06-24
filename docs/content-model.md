# Content Model

## App Record

Each app should be represented by structured content.

Every user-facing content field must be localized for `en-US` and `zh-Hans`. Distribution metadata, identifiers, URLs, and other locale-independent fields must stay shared so adding a locale does not duplicate product configuration.

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
  iconSmall?: string
  iconDark?: string
  iconDarkSmall?: string
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

Shared App metadata includes `slug`, `name`, `platforms`, `status`, `version`, `icon`, `iconSmall`, `iconDark`, `iconDarkSmall`, `sourceUrl`, `supportEmail`, and `downloadLinks`. Locale files should not define `downloadLinks`; get-page text is localized by the page UI, while concrete App Store and GitHub Releases targets belong to `shared.ts`.

If an App provides separate light and dark icons, store the default light icon in `icon` and the dark-mode icon in `iconDark`. App icons should also provide 256px compressed variants through `iconSmall` and `iconDarkSmall` for normal page rendering. Rendering should follow `prefers-color-scheme` so App icons adapt independently from localized content.

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
2. Put shared slug, name, platform, status, version, icon variants, source URL, support email, and download links in `shared.ts`.
3. Put each locale's user-facing App content in `enUS.ts` and `zhHans.ts`.
4. Assemble the shared and localized records in that App directory's `index.ts`.
5. Add that assembled record to `src/src/content/apps/index.ts`.

## Platform

Platform values:

```ts
type AppPlatform =
  | 'macOS'
  | 'iOS'
  | 'iPadOS'
  | 'watchOS'
  | 'visionOS'
  | 'Windows'
  | 'Linux'
  | 'CLI'
  | 'Web'
```

`AppPlatform` is the display and marketing platform list shown on product pages. It is distinct from `AcquisitionPlatform`, which keys concrete download assets. The set of `AppPlatform` values must include every platform any app actually lists, so the content type never lags behind shipped apps.

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
type AcquisitionPlatform = 'android' | 'ios' | 'linux' | 'macos' | 'windows'

type RegionRestriction = 'CN' | 'EU27'

type DownloadLink =
  | {
      kind: 'app-store'
      url: string
      restrictedRegions?: RegionRestriction[]
    }
  | {
      kind: 'github-release'
      url: string
      platform: AcquisitionPlatform
      fileName: string
    }
  | {
      kind: 'website'
      url: string
      platform?: AcquisitionPlatform
    }
```

App Store links should include `restrictedRegions: ['CN', 'EU27']` when the app is not supplied in mainland China or the EU27.

GitHub release links should point to concrete release assets, not only to the release list page, so the get page can select a platform-specific download automatically.

Download links do not include user-facing labels. The get page owns channel names such as `App Store` and `GitHub Releases`; release entries own only concrete distribution metadata such as `platform`, `url`, and `fileName`.

## Release Asset Naming

GitHub release `url` and `fileName` follow a deterministic template so a version change touches only the `version` field:

```text
fileName: {AppName}-v{version}-{PlatformLabel}.zip
url:      {sourceUrl}/releases/download/v{version}/{fileName}
```

`{PlatformLabel}` is the release asset's platform label, such as `macOS` or `Windows`. `shared.ts` derives each release link's `url` and `fileName` from `version`, `slug`/`name`, and the platform, rather than hardcoding them per release. Bumping an app to a new release changes only `version`, which removes the risk of a stale or mismatched download URL.

## Platform And Download Parity

Each platform listed in `platforms` that ships a downloadable binary must have a matching `github-release` asset or `app-store` link for that `AcquisitionPlatform`. A platform that is distributed only from source, such as a `CLI` or `Linux` build offered through the project repository, must be covered by `sourceUrl`, and the get page must direct that visitor to the source or releases page instead of showing a dead unavailable message.

`AppPlatform` and `AcquisitionPlatform` are reconciled per app: every shipped `AppPlatform` maps to an acquisition path, whether a store link, a release asset, or the source repository.

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
version: tracked in shared.ts
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
version: tracked in shared.ts
platforms: macOS, Windows, Linux
canonical page: /folders-guard
support page: /folders-guard/support
privacy page: /folders-guard/privacy
support email: SJasonP@iCloud.com
download page: https://github.com/SJasonP/FoldersGuard/releases
```

The first implementation uses the real FoldersGuard app icon from the FoldersGuard project.
