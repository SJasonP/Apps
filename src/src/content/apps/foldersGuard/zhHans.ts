import type {AppLocalizedContent} from '../../types'

export const foldersGuardZhHans: AppLocalizedContent = {
    shortDescription: '保护文件夹，同时让加密内容仍然便于移动、验证和分享。',
    longDescription:
        'Folders Guard 是一个实验性的桌面端和命令行文件夹保护工具。它把加密内容保留为使用 UUID 名称的普通文件夹树，而真实名称、元数据和恢复所需的 key 则单独存放在加密的 FoldersGuard 数据库中。',
    systemRequirements: [
        'macOS、Windows 或 Linux 发布构建',
        '真正可用的加密数据库支持需要包含 SQLCipher 的构建',
        '强烈建议保留独立备份并先使用测试数据',
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
            question: 'Folders Guard 会上传我的文件吗？',
            answer:
                '不会。加密、解密、验证和恢复操作都在你的设备本地完成。App 不会把文件上传到服务器。',
        },
        {
            question: 'Folders Guard 会收集分析数据或崩溃报告吗？',
            answer:
                '不会。App 不收集姓名、邮箱、账户信息、设备标识符、使用统计、分析数据、崩溃报告、文件内容、文件名或加密 key。',
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
    privacyIntro:
        'Folders Guard（以下简称“本应用”）是一款适用于 macOS 和 Windows 的桌面应用，用于本地文件加密和管理。我们高度重视用户隐私。本隐私政策说明本应用如何处理数据及权限。',
    privacyMeta: ['生效日期：2026年5月12日', '开发者：Jason Pan (@SJasonP)'],
    privacy: [
        {
            title: '1. 概述',
            description:
                'Folders Guard（以下简称“本应用”）是一款适用于 macOS 和 Windows 的桌面应用，用于本地文件加密和管理。我们高度重视用户隐私。本隐私政策说明本应用如何处理数据及权限。',
        },
        {
            title: '2. 不收集个人数据',
            paragraphs: ['本应用不收集、不存储、不传输、不共享任何个人信息或文件数据，包括但不限于：'],
            items: [
                '用户姓名、邮箱或账号信息',
                'IP 地址或设备标识',
                '使用统计或分析数据',
                '崩溃日志',
                '文件名、文件夹名或文件内容',
                '加密密钥',
                '所有操作均在用户设备本地完成。',
            ],
        },
        {
            title: '3. 本地加密处理',
            description:
                '所有加密和解密操作均在用户设备本地完成。用户的文件不会上传至服务器、云端或任何第三方系统。用户可以完全控制要处理的文件或文件夹。',
        },
        {
            title: '4. 网络访问',
            paragraphs: ['本应用可能仅用于检查软件更新。更新检查：'],
            items: [
                '自动且静默进行',
                '不传输任何个人信息或文件数据',
                '不包含分析或追踪功能',
                '本应用不会自动下载或安装更新，用户需手动进行下载。',
            ],
        },
        {
            title: '5. 本地数据存储',
            paragraphs: ['Folders Guard 可能在用户设备本地保存以下信息，仅用于应用功能：'],
            items: [
                '应用设置和偏好',
                '最近打开的位置',
                '加密目录元数据（功能必需）',
                '这些数据不会外传。',
            ],
        },
        {
            title: '6. 文件访问权限',
            description:
                '应用可能会请求访问用户选择的文件或文件夹。该权限仅用于加密和解密操作，不会访问其他文件。',
        },
        {
            title: '7. 第三方服务',
            description:
                'Folders Guard 不使用任何第三方分析、广告、追踪、遥测或云服务。不包含任何外部 SDK 用于数据收集。',
        },
        {
            title: '8. 隐私政策变更',
            description:
                '本隐私政策可能会更新，任何更新将通过修改“最后更新日期”体现。建议用户定期查看。',
        },
        {
            title: '9. 联系方式',
            description:
                '如果您对本隐私政策或 Folders Guard 应用有任何疑问，请通过以下方式联系我们：开发者：Jason Pan (@SJasonP)，邮箱：SJasonP@iCloud.com。',
        },
    ],
    privacyFooter: '最后更新于2026年5月12日。',
}
