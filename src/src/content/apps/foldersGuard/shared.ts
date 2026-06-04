import type {AppSharedRecord} from '../../types'

export const foldersGuardShared: AppSharedRecord = {
    slug: 'folders-guard',
    name: 'Folders Guard',
    platforms: ['macOS', 'Windows', 'Linux'],
    status: 'available',
    version: '1.0.0',
    icon: '/apps/folders-guard/icon-light.png',
    iconSmall: '/apps/folders-guard/icon-light-256.png',
    iconDark: '/apps/folders-guard/icon-dark.png',
    iconDarkSmall: '/apps/folders-guard/icon-dark-256.png',
    sourceUrl: 'https://github.com/SJasonP/FoldersGuard',
    downloadLinks: [
        {
            kind: 'github-release',
            url: 'https://github.com/SJasonP/FoldersGuard/releases/download/v1.0.0/FoldersGuard-v1.0.0-macOS.zip',
            platform: 'macos',
            fileName: 'FoldersGuard-v1.0.0-macOS.zip',
        },
        {
            kind: 'github-release',
            url: 'https://github.com/SJasonP/FoldersGuard/releases/download/v1.0.0/FoldersGuard-v1.0.0-Windows.zip',
            platform: 'windows',
            fileName: 'FoldersGuard-v1.0.0-Windows.zip',
        },
    ],
    supportEmail: 'SJasonP@iCloud.com',
}
