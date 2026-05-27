import type {Locale} from '../i18n'

export type AppStatus = 'available' | 'beta' | 'coming-soon' | 'archived'

export type DownloadLink = {
    label: string
    url?: string
    kind: 'app-store' | 'website'
}

export type Feature = {
    title: string
    description: string
}

export type PrivacyItem = {
    title: string
    description: string
}

export type PreviewItem = {
    label: string
    value: string
}

export type FaqItem = {
    question: string
    answer: string
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
    iconDark?: string
    downloadLinks: DownloadLink[]
    featuresIntro: string
    features: Feature[]
    previewTitle: string
    previewSubtitle: string
    previewItems: PreviewItem[]
    supportFaq: FaqItem[]
    supportEmail: string
    privacy: PrivacyItem[]
}

export type AppSharedRecord = Pick<
    AppRecord,
    'slug' | 'name' | 'platforms' | 'status' | 'version' | 'icon' | 'iconDark' | 'supportEmail'
>

export type AppLocalizedContent = Omit<AppRecord, keyof AppSharedRecord>

export type LocalizedAppRecord = Record<Locale, AppRecord>
