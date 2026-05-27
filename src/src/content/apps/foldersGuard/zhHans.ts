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
}
