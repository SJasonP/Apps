import {githubReleaseAsset} from '../../releaseAsset'
import type {AppSharedRecord} from '../../types'

const version = '1.1.0'
const sourceUrl = 'https://github.com/SJasonP/FoldersGuard'

export const foldersGuardShared: AppSharedRecord = {
    slug: 'folders-guard',
    name: 'Folders Guard',
    platforms: ['macOS', 'Windows', 'Linux'],
    status: 'available',
    version,
    icon: '/apps/folders-guard/icon-light.png',
    iconSmall: '/apps/folders-guard/icon-light-256.png',
    iconDark: '/apps/folders-guard/icon-dark.png',
    iconDarkSmall: '/apps/folders-guard/icon-dark-256.png',
    sourceUrl,
    downloadLinks: [
        githubReleaseAsset(sourceUrl, 'FoldersGuard', version, {platform: 'macos', label: 'macOS', ext: 'zip'}),
        githubReleaseAsset(sourceUrl, 'FoldersGuard', version, {platform: 'windows', label: 'Windows', ext: 'zip'}),
    ],
    supportEmail: 'SJasonP@iCloud.com',
}
