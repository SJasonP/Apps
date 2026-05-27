import type {AppLocalizedContent} from '../../types'

export const foldersGuardEnUS: AppLocalizedContent = {
    shortDescription:
        'Protect folders while keeping encrypted content practical to move, verify, and share.',
    longDescription:
        'Folders Guard is an experimental desktop and CLI tool for folder protection. It keeps encrypted content as a normal folder tree with UUID names, while real names, metadata, and restore keys live separately in encrypted FoldersGuard databases.',
    systemRequirements: [
        'macOS, Windows, or Linux release build',
        'SQLCipher-capable build for real encrypted database support',
        'Independent backups and test data strongly recommended',
    ],
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
}
