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
            question: 'Does Folders Guard upload my files?',
            answer:
                'No. Encryption, decryption, verification, and restore operations are performed locally on your device. Files are not uploaded to a server by the App.',
        },
        {
            question: 'Does Folders Guard collect analytics or crash reports?',
            answer:
                'No. The App does not collect names, emails, account information, device identifiers, usage statistics, analytics, crash reports, file contents, file names, or encryption keys.',
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
    privacyIntro:
        'Folders Guard is a desktop application for macOS and Windows that allows users to encrypt and manage files locally. Your privacy is our top priority. This Privacy Policy explains how the App handles data and permissions.',
    privacyMeta: ['Effective Date: May 12, 2026', 'Developer: Jason Pan (@SJasonP)'],
    privacy: [
        {
            title: '1. Overview',
            description:
                'Folders Guard ("the App") is a desktop application for macOS and Windows that allows users to encrypt and manage files locally. Your privacy is our top priority. This Privacy Policy explains how the App handles data and permissions.',
        },
        {
            title: '2. No Personal Data Collection',
            paragraphs: [
                'Folders Guard does not collect, store, transmit, or share any personal information or files. This includes, but is not limited to:',
            ],
            items: [
                'Names, emails, or account information',
                'IP addresses or device identifiers',
                'Usage statistics or analytics',
                'Crash reports',
                'File names, folder names, or contents',
                'Encryption keys',
                'All operations happen locally on your device.',
            ],
        },
        {
            title: '3. Local-Only File Processing',
            description:
                'All encryption and decryption are performed entirely on your device. Files are never uploaded to any server, cloud service, or third-party system. Users retain full control over which files or folders are processed.',
        },
        {
            title: '4. Network Access',
            paragraphs: ['The App may access the internet only to check for software updates. These update checks:'],
            items: [
                'Are automatic and silent',
                'Do not transmit personal or file data',
                'Do not include analytics or tracking',
                'The App does not automatically download or install updates; users must manually initiate downloads.',
            ],
        },
        {
            title: '5. Local Data Storage',
            paragraphs: ['Folders Guard may store the following on your device only locally:'],
            items: [
                'Application settings and preferences',
                'Recently opened locations',
                'Encrypted directory metadata necessary for functionality',
                'No data is transmitted externally.',
            ],
        },
        {
            title: '6. File Access Permissions',
            description:
                'The App may request access to files or folders selected by the user. This access is strictly used for encryption and decryption operations and does not extend to other files.',
        },
        {
            title: '7. Third-Party Services',
            description:
                'Folders Guard does not use any third-party analytics, advertising, tracking, telemetry, or cloud services. No external SDKs are included for data collection.',
        },
        {
            title: '8. Changes to This Privacy Policy',
            description:
                'Any updates will be reflected by modifying the "Last updated" date. Users are encouraged to review this page periodically.',
        },
        {
            title: '9. Contact',
            description:
                'If you have any questions regarding this privacy policy or the Folders Guard application, please contact Developer: Jason Pan (@SJasonP), Email: SJasonP@iCloud.com.',
        },
    ],
    privacyFooter: 'Last Updated on May 12, 2026.',
}
