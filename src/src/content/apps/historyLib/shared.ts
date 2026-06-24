import {githubReleaseAsset} from '../../releaseAsset'
import type {AppSharedRecord} from '../../types'

const version = '1.0'
const sourceUrl = 'https://github.com/SJasonP/HistoryLib'

export const historyLibShared: AppSharedRecord = {
    slug: 'history-lib',
    name: 'History Lib',
    platforms: ['macOS', 'iOS'],
    status: 'available',
    version,
    icon: '/apps/history-lib/icon-light.png',
    iconSmall: '/apps/history-lib/icon-light-256.png',
    iconDark: '/apps/history-lib/icon-dark.png',
    iconDarkSmall: '/apps/history-lib/icon-dark-256.png',
    sourceUrl,
    downloadLinks: [
        {
            kind: 'app-store',
            url: 'https://apps.apple.com/app/history-lib/id6761198319',
            restrictedRegions: ['CN', 'EU27'],
        },
        githubReleaseAsset(sourceUrl, 'HistoryLib', version, {platform: 'macos', label: 'macOS', ext: 'zip'}),
        githubReleaseAsset(sourceUrl, 'HistoryLib', version, {platform: 'ios', label: 'iOS', ext: 'ipa'}),
    ],
    supportEmail: 'SJasonP@iCloud.com',
}
