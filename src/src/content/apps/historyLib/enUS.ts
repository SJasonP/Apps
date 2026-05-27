import type {AppLocalizedContent} from '../../types'

export const historyLibEnUS: AppLocalizedContent = {
    shortDescription: 'Collect, browse, search, deduplicate, and export browser history records.',
    longDescription:
        'History Lib is a SwiftUI App for working with browser history records, with support for Safari exports, HistoryLib archives, search, summaries, deduplication, and optional iCloud sync.',
    systemRequirements: ['macOS 26 or later', 'iOS 26 or later'],
    downloadLinks: [
        {
            label: 'View on the App Store',
            url: 'https://apps.apple.com/app/history-lib/id6761198319',
            kind: 'app-store',
        },
    ],
    featuresIntro: 'Built for careful handling of browser history data.',
    features: [
        {
            title: 'Import history archives',
            description:
                'Import Safari history JSON files, folders, ZIP archives, and native HistoryLib .hlz archives.',
        },
        {
            title: 'Browse and search',
            description:
                'Browse records by year, month, and day, then search by URL or page title when you need a specific visit.',
        },
        {
            title: 'Summarize and deduplicate',
            description:
                'Generate summary snapshots, identify repeated records, and clean up imported or synced datasets.',
        },
        {
            title: 'Export portable data',
            description:
                'Export Safari-compatible ZIP files or optimized HistoryLib .hlz archives for backup and transfer.',
        },
    ],
    previewTitle: 'History Records',
    previewSubtitle: 'Year / Month / Day',
    previewItems: [
        {
            label: 'Import',
            value: 'Safari JSON, ZIP, .hlz',
        },
        {
            label: 'Search',
            value: 'URL and title',
        },
        {
            label: 'Export',
            value: 'Portable archives',
        },
    ],
    supportFaq: [
        {
            question: 'Where is my imported history stored?',
            answer:
                'History Lib stores imported records in SwiftData. Depending on your iCloud setting, records may stay local or sync through your iCloud account.',
        },
        {
            question: 'Are exported archives encrypted?',
            answer:
                'No. Safari ZIP exports and HistoryLib .hlz archives can contain private browser history records and should be handled carefully.',
        },
        {
            question: 'Why can favicon fetching make network requests?',
            answer:
                'When site icons are enabled, the App may request favicon resources for hosts found in imported history records.',
        },
    ],
    privacy: [
        {
            title: 'Browser history is sensitive',
            description:
                'Imported records can include URLs, titles, visit timestamps, source browser names, redirect metadata, and import timestamps.',
        },
        {
            title: 'Local and iCloud storage',
            description:
                "When iCloud sync is disabled, data stays in the local SwiftData store. When iCloud sync is enabled, records can sync through the user's iCloud account.",
        },
        {
            title: 'Favicon requests',
            description:
                'When site icons are enabled, History Lib may request favicon resources for hosts found in imported history records.',
        },
        {
            title: 'Exports are not encrypted',
            description:
                'Exported Safari ZIP files and HistoryLib .hlz archives contain browser history records and should be treated as private data.',
        },
    ],
}
