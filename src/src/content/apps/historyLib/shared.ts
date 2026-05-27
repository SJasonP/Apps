import type {AppSharedRecord} from '../../types'

export const historyLibShared: AppSharedRecord = {
    slug: 'history-lib',
    name: 'History Lib',
    platforms: ['macOS', 'iOS'],
    status: 'available',
    version: '1.0',
    icon: '/apps/history-lib/icon.png',
    iconDark: '/apps/history-lib/icon-dark.png',
    sourceUrl: 'https://github.com/SJasonP/HistoryLib',
    downloadLinks: [
        {
            kind: 'app-store',
            url: 'https://apps.apple.com/app/history-lib/id6761198319',
            restrictedRegions: ['CN', 'EU27'],
        },
        {
            kind: 'github-release',
            url: 'https://github.com/SJasonP/HistoryLib/releases/download/v1.0/HistoryLib-v1.0-macOS.zip',
            platform: 'macos',
            fileName: 'HistoryLib-v1.0-macOS.zip',
        },
        {
            kind: 'github-release',
            url: 'https://github.com/SJasonP/HistoryLib/releases/download/v1.0/HistoryLib-v1.0-iOS.ipa',
            platform: 'ios',
            fileName: 'HistoryLib-v1.0-iOS.ipa',
        },
    ],
    supportEmail: 'SJasonP@iCloud.com',
}
