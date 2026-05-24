export const locales = ['en-US', 'zh-Hans'] as const

export type Locale = (typeof locales)[number]

export type LocalizedString = Record<Locale, string>

export type UiText = {
  appStoreAlt: string
  availableApps: string
  commonQuestions: string
  contact: string
  contactTextAfter: string
  contactTextBefore: string
  coreFeatures: string
  footerLabel: string
  getSupport: string
  homeDescription: string
  homeTitle: string
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
  productSpecificSupport: string
  publishedApps: string
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
  versionLabel: string
  viewApp: string
}

export const uiText: Record<Locale, UiText> = {
  'en-US': {
    appStoreAlt: 'Download link pending',
    availableApps: 'Available Apps',
    commonQuestions: 'Common Questions',
    contact: 'Contact',
    contactTextAfter:
      'and include the app name, platform, app version, system version, and a short description of the issue.',
    contactTextBefore: 'For support, email',
    coreFeatures: 'Core Features',
    footerLabel: 'SJasonP Apps',
    getSupport: 'Get support',
    homeDescription:
      'A focused home for app introductions, download links, support information, and privacy policies.',
    homeTitle: 'Apps by SJasonP',
    navApps: 'Apps',
    navSupport: 'Support',
    notFoundIntro: 'The requested page does not exist.',
    notFoundTitle: 'Page Not Found',
    officialResources: 'Official product pages and support resources.',
    orReadThe: 'or read the',
    privacyPathLabel: 'Privacy Policy',
    privacyPolicy: 'privacy policy',
    privacyPageIntro: 'This page summarizes how the app handles app data and related metadata.',
    privacyQuestions: 'For privacy questions, email',
    privacyTitle: 'Privacy Policy',
    productPreview: 'product preview',
    productSpecificSupport: 'Choose an app to view product-specific support information.',
    publishedApps: 'Published apps',
    siteSummary: 'Site summary',
    footerNavigation: 'Footer navigation',
    resources: 'Resources',
    returnTo: 'Return to',
    primaryNavigation: 'Primary navigation',
    siteBrand: 'SJasonP Apps',
    siteTitle: 'SJasonP Apps',
    support: 'Support',
    supportPathLabel: 'Support',
    supportPageIntro: 'Find support information, common troubleshooting notes, and product resources.',
    systemRequirements: 'System Requirements',
    versionLabel: 'Version',
    viewApp: 'View app',
  },
  'zh-Hans': {
    appStoreAlt: '下载链接待确认',
    availableApps: '可用应用',
    commonQuestions: '常见问题',
    contact: '联系支持',
    contactTextAfter: '并说明应用名称、平台、应用版本、系统版本和问题简述。',
    contactTextBefore: '如需支持，请发送邮件至',
    coreFeatures: '核心功能',
    footerLabel: 'SJasonP Apps',
    getSupport: '获取支持',
    homeDescription: '这里集中展示应用介绍、下载链接、技术支持信息和隐私政策。',
    homeTitle: 'SJasonP 开发的应用',
    navApps: '应用',
    navSupport: '支持',
    notFoundIntro: '请求的页面不存在。',
    notFoundTitle: '页面不存在',
    officialResources: '官方产品页面与支持资源。',
    orReadThe: '或阅读',
    privacyPathLabel: '隐私政策',
    privacyPolicy: '隐私政策',
    privacyPageIntro: '本页概述该应用如何处理应用数据和相关元数据。',
    privacyQuestions: '如有隐私相关问题，请发送邮件至',
    privacyTitle: '隐私政策',
    productPreview: '产品预览',
    productSpecificSupport: '选择一个应用以查看对应的支持信息。',
    publishedApps: '已发布应用',
    siteSummary: '站点摘要',
    footerNavigation: '页脚导航',
    resources: '资源',
    returnTo: '返回',
    primaryNavigation: '主导航',
    siteBrand: 'SJasonP Apps',
    siteTitle: 'SJasonP Apps',
    support: '支持',
    supportPathLabel: '支持',
    supportPageIntro: '查看支持方式、常见问题和产品资源。',
    systemRequirements: '系统要求',
    versionLabel: '版本',
    viewApp: '查看应用',
  },
}

export function getPreferredLocale(languages = navigator.languages): Locale {
  for (const language of languages) {
    const normalizedLanguage = language.toLowerCase()

    if (normalizedLanguage === 'zh' || normalizedLanguage.startsWith('zh-')) {
      return 'zh-Hans'
    }
  }

  return 'en-US'
}
