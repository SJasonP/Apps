import type {AppLocalizedContent} from '../../types'

export const historyLibZhHans: AppLocalizedContent = {
    shortDescription: '收集、浏览、搜索、去重并重新导出浏览器历史记录。',
    longDescription:
        'History Lib 是一个用于处理浏览器历史记录的 SwiftUI App，支持 Safari 导出文件、HistoryLib 归档、搜索、摘要、去重以及可选的 iCloud 同步。',
    systemRequirements: ['macOS 26 或更高版本', 'iOS 26 或更高版本'],
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
}
