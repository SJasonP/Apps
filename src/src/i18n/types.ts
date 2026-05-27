export const locales = ['en-US', 'zh-Hans'] as const

export type Locale = (typeof locales)[number]

export type LocalizedString = Record<Locale, string>

export type UiText = {
    appStoreAlt: string
    appStore: string
    appStoreUnavailableRegion: string
    availableApps: string
    commonQuestions: string
    contact: string
    contactTextAfter: string
    contactTextBefore: string
    coreFeatures: string
    footerLabel: string
    getAppTitle: string
    getNow: string
    getSupport: string
    getPageIntro: string
    globalContactIntro: string
    gpgFingerprint: string
    githubProxyNotice: string
    homeDescription: string
    homeTitleMain: string
    homeTitleMuted: string
    navApps: string
    navSupport: string
    notFoundIntro: string
    notFoundTitle: string
    officialResources: string
    orReadThe: string
    privacyPathLabel: string
    privacyPolicy: string
    privacyPageIntro: string
    privacyQuestions: string
    privacyTitle: string
    productPreview: string
    productStory: string
    productSpecificSupport: string
    publishedApps: string
    regionLabel: string
    regionVerificationRequired: string
    selectedForDevice: string
    githubReleases: string
    siteSummary: string
    footerNavigation: string
    resources: string
    returnTo: string
    primaryNavigation: string
    siteBrand: string
    siteTitle: string
    support: string
    supportPathLabel: string
    supportPageIntro: string
    systemRequirements: string
    unavailableForDevice: string
    unavailableInRegion: string
    versionLabel: string
    viewApp: string
    yourDevice: string
}
