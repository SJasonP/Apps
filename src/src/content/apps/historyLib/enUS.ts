import type {AppLocalizedContent} from '../../types'

export const historyLibEnUS: AppLocalizedContent = {
    shortDescription: 'Collect, browse, search, deduplicate, and export browser history records.',
    longDescription:
        'History Lib is a SwiftUI App for preserving Safari browser history records, with support for imports, HistoryLib archives, search, summaries, deduplication, export, and optional iCloud sync.',
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
            title: 'Import Safari history',
            description:
                'Import Safari browser history exports and keep long history collections available outside Safari.',
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
        {
            title: 'Sync across Apple devices',
            description:
                'Use optional iCloud sync so changes can be available across supported Apple devices without repeated manual imports and exports.',
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
            question: 'Why does History Lib exist?',
            answer:
                'Safari history import can be incomplete across Apple platforms, especially when moving long history collections. History Lib is built to preserve and inspect those records directly.',
        },
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
    privacyIntro:
        'Welcome to use History Lib. Your privacy is of utmost importance to us. This policy is designed to clearly and transparently explain how this application handles your information.',
    privacyMeta: ['Effective Date: April 18, 2026', 'Developer: Jason Pan (@SJasonP)'],
    privacy: [
        {
            title: '1. Core Principles',
            paragraphs: [
                'History Lib is a local application designed entirely with privacy at its core. We hereby declare:',
                'No Account and Registration: This application does not require you to create any account, nor does it require you to log in using your mobile phone, email, or any third-party services.',
                'No Data Collection: This application will not collect, upload, store or share any of your personal information or usage data in any form. This includes but is not limited to:',
            ],
            items: [
                'Your identity information',
                'Any data content you create, input or process within the application',
                'Your device information, such as model or IP address',
                'Your usage behavior analysis data',
                'Fully Offline Functionality: All core functions of the application can be used offline without the need to connect to the internet.',
            ],
        },
        {
            title: '2. Data Storage and Synchronization',
            paragraphs: [
                'Local Storage: All your data, including calculation records, imported files, settings, and related app data, is only saved locally on your iOS or macOS device. We do not have any servers to receive or store these data.',
                "iCloud Sync (Optional Feature): To facilitate the synchronization of data between different Apple devices, this application integrates the iCloud synchronization feature provided by Apple. This feature is directly provided and controlled by Apple.",
                "After you enable the iCloud synchronization feature of this application on two or more devices that are logged in with the same Apple ID, your data will be encrypted and synchronized between your devices via Apple's iCloud service.",
                "This process is entirely handled automatically by your device and Apple's iCloud service. We cannot access, view, or obtain any data that you synchronize through iCloud.",
                "For how iCloud handles your data, please refer to Apple's official privacy policy.",
            ],
        },
        {
            title: '3. Data Access and Export',
            paragraphs: [
                'Import and Export: You can easily and freely export your data in a standard format to the local storage of your device at any time, or import it from local files. This process does not require any network permissions.',
                'File Access: The application only requests access to the single file you specify through the system standard file selector when you explicitly operate, such as importing or exporting files. It cannot and has no right to randomly scan or access other files on your device.',
            ],
        },
        {
            title: '4. Third-party Services',
            description:
                'Apart from the iCloud synchronization service that you initiated and which is directly provided by Apple, History Lib does not integrate any third-party data analysis, advertising, social or cloud service SDKs.',
        },
        {
            title: '5. Policy Updates',
            description:
                'We may occasionally update this privacy policy. The updated policy will be published on this page and will be indicated in the update instructions for this app in the App Store. Please regularly check to understand how we protect your information.',
        },
        {
            title: '6. Contact Us',
            description:
                'If you have any questions regarding this privacy policy or the History Lib application, please contact Developer: Jason Pan (@SJasonP), Email: SJasonP@iCloud.com.',
        },
        {
            title: '7. Scope of Application',
            description:
                'Please note that due to operational strategies, History Lib is currently not available in the EU region. This policy and its related practices do not apply to EU users and are not intended to comply with the General Data Protection Regulation (GDPR).',
        },
    ],
    privacyFooter: 'Last Updated on April 18, 2026.',
    storySections: [
        {
            title: 'Why this App exists',
            paragraphs: [
                'History Lib began as a practical answer to a Safari history problem: after exporting and clearing Safari data, importing the history back into Safari did not reliably restore every record.',
                'For users who rely on browser history as a personal reference, losing older records or importing only a small recent window is not acceptable. History Lib keeps those records browseable, searchable, and portable outside the browser itself.',
            ],
        },
        {
            title: 'Useful when',
            items: [
                'You have exported Safari history and need a dedicated viewer instead of importing it back into a browser.',
                'You want to preserve long browser history records across devices.',
                'You want to search or review old visits without depending on Safari history import behavior.',
            ],
        },
    ],
}
