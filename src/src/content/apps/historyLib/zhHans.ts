import type {AppLocalizedContent} from '../../types'

export const historyLibZhHans: AppLocalizedContent = {
    shortDescription: '收集、浏览、搜索、去重并重新导出浏览器历史记录。',
    longDescription:
        'History Lib 是一个用于保留 Safari 浏览器历史记录的 SwiftUI App，支持导入、HistoryLib 归档、搜索、摘要、去重、导出以及可选的 iCloud 同步。',
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
            title: '导入 Safari 历史记录',
            description: '导入 Safari 浏览器历史记录导出数据，让较长的历史记录也能保存在 Safari 之外。',
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
        {
            title: '跨 Apple 设备同步',
            description:
                '通过可选的 iCloud 同步，让修改在支持的 Apple 设备之间同步，减少重复手动导入导出。',
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
            question: '为什么会有 History Lib？',
            answer:
                'Safari 的历史记录导入在不同 Apple 平台上可能并不完整，尤其是迁移较长历史记录时。History Lib 用来直接保留、查看和检索这些记录。',
        },
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
    privacyIntro:
        '欢迎您使用 History Lib。您的隐私对我们至关重要。本政策旨在清晰、透明地说明本应用如何处理您的信息。',
    privacyMeta: ['生效日期：2026年4月18日', '开发者：Jason Pan (@SJasonP)'],
    privacy: [
        {
            title: '1. 核心原则',
            paragraphs: [
                'History Lib 是一个完全以隐私为核心设计的本地工具应用。我们谨此声明：',
                '无账号与注册：本应用无需您创建任何账号，也无需使用手机、邮箱或任何第三方服务登录。',
                '无数据收集：本应用不会以任何形式收集、上传、存储或分享您的任何个人信息或使用数据。这包括但不限于：',
            ],
            items: [
                '您的身份信息',
                '您在应用内创建、输入或处理的任何数据内容',
                '您的设备信息（如型号、IP地址）',
                '您的使用行为分析数据',
                '完全离线工作：应用的所有核心功能均可离线使用，无需连接互联网。',
            ],
        },
        {
            title: '2. 数据存储与同步',
            paragraphs: [
                '本地存储：您的所有数据（包括计算记录、导入的文件、设置等）仅保存在您的 iOS 或 macOS 设备本地。我们没有任何服务器来接收或存储这些数据。',
                'iCloud 同步（可选功能）：为方便您在不同苹果设备间同步数据，本应用集成了 Apple 官方提供的 iCloud 同步功能。此功能由 Apple 直接提供和控制。',
                '当您在两台或多台登录了同一 Apple ID 的设备上开启本应用的 iCloud 同步功能后，您的数据将通过 Apple 的 iCloud 服务在您的设备间进行加密同步。',
                '此过程完全由您的设备和 Apple 的 iCloud 服务自动处理。我们无法访问、查看或获取您通过 iCloud 同步的任何数据。',
                '关于 iCloud 如何处理您的数据，请参阅 Apple 的官方隐私政策。',
            ],
        },
        {
            title: '3. 数据访问与导出',
            paragraphs: [
                '导入与导出：您可以通过应用内提供的功能，随时、自由地将您的数据以标准格式导出到您设备的本地存储，或从本地文件导入。此过程无需任何网络权限。',
                '文件访问：应用仅在您明确操作时（如导入导出文件），通过系统标准的文件选择器请求访问您指定的单个文件，无法也无权随意扫描或访问您设备上的其他文件。',
            ],
        },
        {
            title: '4. 第三方服务',
            description:
                '除了上述由您主动开启、由 Apple 直接提供的 iCloud 同步服务外，History Lib 没有集成任何第三方数据分析、广告、社交或云服务 SDK。',
        },
        {
            title: '5. 政策更新',
            description:
                '我们可能会偶尔更新本隐私政策。更新后的政策将在本页面发布，并在 App Store 的本应用更新说明中予以提示。请您定期查阅以了解我们如何保护您的信息。',
        },
        {
            title: '6. 联系我们',
            description:
                '如果您对本隐私政策或 History Lib 应用有任何疑问，请通过以下方式联系我们：开发者：Jason Pan (@SJasonP)，联系方式：SJasonP@iCloud.com。',
        },
        {
            title: '7. 适用范围',
            description:
                '请注意，由于运营策略，History Lib 目前未在欧盟（EU）地区上架。本政策及其相关实践不针对欧盟用户，也不旨在符合《通用数据保护条例》（GDPR）的规定。',
        },
    ],
    privacyFooter: '最后更新于2026年4月18日。',
    storySections: [
        {
            title: '为什么开发此 App',
            paragraphs: [
                'History Lib 起源于一个实际的 Safari 历史记录问题：导出并清理 Safari 数据后，再把历史记录导回 Safari，并不能可靠恢复全部记录。',
                '对于把浏览器历史当作个人参考资料的用户来说，丢失旧记录或只导入最近一小段记录是不可接受的。History Lib 让这些记录可以在浏览器之外继续浏览、搜索和转移。',
            ],
        },
        {
            title: '适合的使用情景',
            items: [
                '已经导出 Safari 历史记录，需要专门工具查看，而不是导回浏览器。',
                '想长期保留较长的浏览器历史记录，并在设备之间使用。',
                '想搜索或回顾旧访问记录，而不依赖 Safari 自身的历史导入行为。',
            ],
        },
    ],
}
