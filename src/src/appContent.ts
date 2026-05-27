import type {Locale} from './i18n'

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

export const statusLabels: Record<Locale, Record<AppStatus, string>> = {
    'en-US': {
        available: 'Available',
        beta: 'Beta',
        'coming-soon': 'Coming soon',
        archived: 'Archived',
    },
    'zh-Hans': {
        available: '可用',
        beta: '测试版',
        'coming-soon': '即将推出',
        archived: '已归档',
    },
}

export const appContent: Record<Locale, AppRecord[]> = {
    'en-US': [
        {
            slug: 'history-lib',
            name: 'History Lib',
            shortDescription: 'Collect, browse, search, deduplicate, and export browser history records.',
            longDescription:
                'History Lib is a SwiftUI App for working with browser history records, with support for Safari exports, HistoryLib archives, search, summaries, deduplication, and optional iCloud sync.',
            platforms: ['macOS', 'iOS'],
            status: 'available',
            version: '1.0',
            systemRequirements: ['macOS 26 or later', 'iOS 26 or later'],
            icon: '/apps/history-lib/icon.png',
            iconDark: '/apps/history-lib/icon-dark.png',
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
            supportEmail: 'support@sjasonp.net',
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
        },
        {
            slug: 'folders-guard',
            name: 'Folders Guard',
            shortDescription:
                'Protect folders while keeping encrypted content practical to move, verify, and share.',
            longDescription:
                'Folders Guard is an experimental desktop and CLI tool for folder protection. It keeps encrypted content as a normal folder tree with UUID names, while real names, metadata, and restore keys live separately in encrypted FoldersGuard databases.',
            platforms: ['macOS', 'Windows', 'Linux', 'CLI'],
            status: 'available',
            version: '1.0.0',
            systemRequirements: [
                'macOS, Windows, or Linux release build',
                'SQLCipher-capable build for real encrypted database support',
                'Independent backups and test data strongly recommended',
            ],
            icon: '/apps/folders-guard/icon.png',
            downloadLinks: [
                {
                    label: 'GitHub Releases',
                    url: 'https://github.com/SJasonP/FoldersGuard/releases',
                    kind: 'website',
                },
            ],
            featuresIntro: 'Built for manual encrypted-content workflows.',
            features: [
                {
                    title: 'Portable encrypted trees',
                    description:
                        'Encrypted output remains a normal folder tree that can be copied, uploaded, downloaded, backed up, or shared with ordinary tools.',
                },
                {
                    title: 'Share scoped access',
                    description:
                        '.fgs share databases include only the metadata and keys required for the selected files and folders.',
                },
                {
                    title: 'Verify before restore',
                    description:
                        'Check encrypted content integrity without decrypting it, and detect missing or tampered encrypted objects before restore or sharing.',
                },
                {
                    title: 'Desktop and CLI workflows',
                    description:
                        'Use the Wails desktop WebUI for interactive workflows or the fg CLI for automation and repeatable operations.',
                },
            ],
            previewTitle: 'Protected Content',
            previewSubtitle: '.fg / .fgs workflow',
            previewItems: [
                {
                    label: 'Encrypt',
                    value: 'UUID folder tree',
                },
                {
                    label: 'Verify',
                    value: 'Missing or tampered objects',
                },
                {
                    label: 'Share',
                    value: 'Scoped restore database',
                },
            ],
            supportFaq: [
                {
                    question: 'Is Folders Guard audited security software?',
                    answer:
                        'No. It is experimental AI-written software and should not be treated as audited cryptographic software.',
                },
                {
                    question: 'Can I move the encrypted content with ordinary tools?',
                    answer:
                        'Yes. The encrypted output is designed to remain a normal folder tree that can be copied, uploaded, downloaded, backed up, or shared.',
                },
                {
                    question: 'What is a share database?',
                    answer:
                        'A .fgs share database contains only the metadata and keys needed to restore the selected files or folders.',
                },
            ],
            supportEmail: 'support@sjasonp.net',
            privacy: [
                {
                    title: 'Experimental security software',
                    description:
                        'Folders Guard is AI-written experimental software. It makes no guarantee of security, cryptographic correctness, data durability, production fitness, or protection against data loss.',
                },
                {
                    title: 'Encrypted metadata databases',
                    description:
                        'Project and share metadata are stored in SQLCipher-backed .fg and .fgs databases. These databases hold real names, metadata, and keys needed to restore protected content.',
                },
                {
                    title: 'Visible encrypted content',
                    description:
                        'Encrypted content remains visible as a folder tree with UUID names. The existence of Folders Guard data, directory hierarchy, item counts, approximate sizes, and modification patterns are not hidden.',
                },
                {
                    title: 'Use backups and test copies',
                    description:
                        'Do not use Folders Guard as the only protection for valuable, sensitive, or irreplaceable data. Test release artifacts with copies and keep independent backups.',
                },
            ],
        },
    ],
    'zh-Hans': [
        {
            slug: 'history-lib',
            name: 'History Lib',
            shortDescription: '收集、浏览、搜索、去重并重新导出浏览器历史记录。',
            longDescription:
                'History Lib 是一个用于处理浏览器历史记录的 SwiftUI App，支持 Safari 导出文件、HistoryLib 归档、搜索、摘要、去重以及可选的 iCloud 同步。',
            platforms: ['macOS', 'iOS'],
            status: 'available',
            version: '1.0',
            systemRequirements: ['macOS 26 或更高版本', 'iOS 26 或更高版本'],
            icon: '/apps/history-lib/icon.png',
            iconDark: '/apps/history-lib/icon-dark.png',
            downloadLinks: [
                {
                    label: '在 App Store 查看',
                    url: 'https://apps.apple.com/app/history-lib/id6761198319',
                    kind: 'app-store',
                },
            ],
            featuresIntro: '为谨慎处理浏览器历史数据而设计。',
            features: [
                {
                    title: '导入历史归档',
                    description: '导入 Safari 历史 JSON 文件、文件夹、ZIP 归档以及 HistoryLib 原生 .hlz 归档。',
                },
                {
                    title: '浏览和搜索',
                    description: '按年、月、日浏览记录，并按 URL 或页面标题搜索特定访问记录。',
                },
                {
                    title: '摘要和去重',
                    description: '生成摘要快照，识别重复记录，并清理导入或同步后的数据集。',
                },
                {
                    title: '导出便携数据',
                    description: '导出 Safari 兼容的 ZIP 文件，或导出优化后的 HistoryLib .hlz 归档。',
                },
            ],
            previewTitle: '历史记录',
            previewSubtitle: '年 / 月 / 日',
            previewItems: [
                {
                    label: '导入',
                    value: 'Safari JSON、ZIP、.hlz',
                },
                {
                    label: '搜索',
                    value: 'URL 和标题',
                },
                {
                    label: '导出',
                    value: '便携归档',
                },
            ],
            supportFaq: [
                {
                    question: '导入的历史记录存在哪里？',
                    answer:
                        'History Lib 使用 SwiftData 存储导入记录。根据你的 iCloud 设置，记录可能只保留在本机，也可能通过你的 iCloud 账户同步。',
                },
                {
                    question: '导出的归档是否加密？',
                    answer:
                        '不加密。Safari ZIP 导出和 HistoryLib .hlz 归档可能包含私密浏览器历史记录，应谨慎处理。',
                },
                {
                    question: '为什么 favicon 功能会发起网络请求？',
                    answer:
                        '启用站点图标后，App 可能会为导入历史记录中出现的主机请求 favicon 资源。',
                },
            ],
            supportEmail: 'support@sjasonp.net',
            privacy: [
                {
                    title: '浏览器历史记录属于敏感数据',
                    description:
                        '导入记录可能包含 URL、标题、访问时间、来源浏览器、重定向元数据和导入时间。',
                },
                {
                    title: '本地与 iCloud 存储',
                    description:
                        '关闭 iCloud 同步时，数据保存在本地 SwiftData 存储中。启用 iCloud 同步时，记录可能通过你的 iCloud 账户同步。',
                },
                {
                    title: 'Favicon 请求',
                    description:
                        '启用站点图标后，History Lib 可能会为导入历史记录中出现的主机请求 favicon 资源。',
                },
                {
                    title: '导出文件未加密',
                    description:
                        '导出的 Safari ZIP 文件和 HistoryLib .hlz 归档包含浏览器历史记录，应作为私密数据处理。',
                },
            ],
        },
        {
            slug: 'folders-guard',
            name: 'Folders Guard',
            shortDescription: '保护文件夹，同时让加密内容仍然便于移动、验证和分享。',
            longDescription:
                'Folders Guard 是一个实验性的桌面端和命令行文件夹保护工具。它把加密内容保留为使用 UUID 名称的普通文件夹树，而真实名称、元数据和恢复所需的 key 则单独存放在加密的 FoldersGuard 数据库中。',
            platforms: ['macOS', 'Windows', 'Linux', 'CLI'],
            status: 'available',
            version: '1.0.0',
            systemRequirements: [
                'macOS、Windows 或 Linux 发布构建',
                '真正可用的加密数据库支持需要包含 SQLCipher 的构建',
                '强烈建议保留独立备份并先使用测试数据',
            ],
            icon: '/apps/folders-guard/icon.png',
            downloadLinks: [
                {
                    label: 'GitHub Releases',
                    url: 'https://github.com/SJasonP/FoldersGuard/releases',
                    kind: 'website',
                },
            ],
            featuresIntro: '为手动处理加密内容的工作流而设计。',
            features: [
                {
                    title: '便携的加密文件夹树',
                    description:
                        '加密输出仍然是普通文件夹树，可以用常规工具复制、上传、下载、备份或分享。',
                },
                {
                    title: '范围受限的分享',
                    description: '.fgs 分享数据库只包含选中文件和文件夹所需的元数据和 key。',
                },
                {
                    title: '恢复前验证',
                    description:
                        '无需解密即可验证加密内容完整性，并在恢复或分享前发现缺失或被篡改的加密对象。',
                },
                {
                    title: '桌面端与 CLI 工作流',
                    description: '使用 Wails 桌面 WebUI 完成交互流程，或使用 fg CLI 进行自动化和可重复操作。',
                },
            ],
            previewTitle: '受保护内容',
            previewSubtitle: '.fg / .fgs 工作流',
            previewItems: [
                {
                    label: '加密',
                    value: 'UUID 文件夹树',
                },
                {
                    label: '验证',
                    value: '缺失或被篡改对象',
                },
                {
                    label: '分享',
                    value: '范围受限恢复数据库',
                },
            ],
            supportFaq: [
                {
                    question: 'Folders Guard 是经过审计的安全软件吗？',
                    answer: '不是。它是实验性的 AI 撰写软件，不应被视为经过审计的密码学软件。',
                },
                {
                    question: '我可以用普通工具移动加密内容吗？',
                    answer: '可以。加密输出设计为普通文件夹树，可以复制、上传、下载、备份或分享。',
                },
                {
                    question: '什么是分享数据库？',
                    answer: '.fgs 分享数据库只包含恢复所选文件或文件夹所需的元数据和 key。',
                },
            ],
            supportEmail: 'support@sjasonp.net',
            privacy: [
                {
                    title: '实验性安全软件',
                    description:
                        'Folders Guard 是 AI 撰写的实验性软件，不对安全性、密码学正确性、数据可靠性、生产环境适用性或防止数据丢失作出任何保证。',
                },
                {
                    title: '加密元数据数据库',
                    description:
                        '项目和分享元数据存储在基于 SQLCipher 的 .fg 和 .fgs 数据库中。这些数据库保存恢复受保护内容所需的真实名称、元数据和 key。',
                },
                {
                    title: '可见的加密内容',
                    description:
                        '加密内容仍然以 UUID 名称的文件夹树形式可见。Folders Guard 数据存在这一事实、目录层级、条目数量、大致大小和修改模式并不会被隐藏。',
                },
                {
                    title: '使用备份和测试副本',
                    description:
                        '不要把 Folders Guard 作为保护重要、敏感或不可替代数据的唯一手段。请先用副本测试发布产物，并保留独立备份。',
                },
            ],
        },
    ],
}
