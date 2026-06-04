import type {Locale} from '../i18n'

export type AppStatus = 'available' | 'beta' | 'coming-soon' | 'archived'

export type AcquisitionPlatform = 'android' | 'ios' | 'linux' | 'macos' | 'windows'

export type RegionRestriction = 'CN' | 'EU27'

export type AppStoreDownloadLink = {
    kind: 'app-store'
    url: string
    restrictedRegions?: RegionRestriction[]
}

export type GithubReleaseDownloadLink = {
    kind: 'github-release'
    url: string
    platform: AcquisitionPlatform
    fileName: string
}

export type WebsiteDownloadLink = {
    kind: 'website'
    url: string
    platform?: AcquisitionPlatform
}

export type DownloadLink = AppStoreDownloadLink | GithubReleaseDownloadLink | WebsiteDownloadLink

export type Feature = {
    title: string
    description: string
}

export type PrivacyItem = {
    title: string
    description?: string
    paragraphs?: string[]
    items?: string[]
}

export type PreviewItem = {
    label: string
    value: string
}

export type FaqItem = {
    question: string
    answer: string
}

export type StorySection = {
    title: string
    paragraphs?: string[]
    items?: string[]
}

export type AppRecord = {
    slug: string
    name: string
    shortDescription: string
    longDescription: string
    platforms: string[]
    status: AppStatus
    version: string
    systemRequirements: string[]
    icon: string
    iconSmall?: string
    iconDark?: string
    iconDarkSmall?: string
    sourceUrl?: string
    downloadLinks: DownloadLink[]
    featuresIntro: string
    features: Feature[]
    previewTitle: string
    previewSubtitle: string
    previewItems: PreviewItem[]
    supportFaq: FaqItem[]
    supportEmail: string
    privacyIntro?: string
    privacyMeta?: string[]
    privacy: PrivacyItem[]
    privacyFooter?: string
    storySections?: StorySection[]
}

export type AppSharedRecord = Pick<
    AppRecord,
    | 'downloadLinks'
    | 'icon'
    | 'iconSmall'
    | 'iconDark'
    | 'iconDarkSmall'
    | 'name'
    | 'platforms'
    | 'slug'
    | 'sourceUrl'
    | 'status'
    | 'supportEmail'
    | 'version'
>

export type AppLocalizedContent = Omit<AppRecord, keyof AppSharedRecord>

export type LocalizedAppRecord = Record<Locale, AppRecord>
