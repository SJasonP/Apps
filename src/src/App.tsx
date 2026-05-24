import './App.css'
import type { ReactNode } from 'react'

type AppStatus = 'available' | 'beta' | 'coming-soon' | 'archived'

type DownloadLink = {
  label: string
  url?: string
  kind: 'app-store' | 'website'
}

type Feature = {
  title: string
  description: string
}

type PrivacyItem = {
  title: string
  description: string
}

type PreviewItem = {
  label: string
  value: string
}

type FaqItem = {
  question: string
  answer: string
}

type AppRecord = {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  platforms: string[]
  status: AppStatus
  version: string
  systemRequirements: string[]
  icon: string
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

const apps: AppRecord[] = [
  {
    slug: 'history-lib',
    name: 'History Lib',
    shortDescription: 'Collect, browse, search, deduplicate, and export browser history records.',
    longDescription:
      'History Lib is a SwiftUI app for working with browser history records, with support for Safari exports, HistoryLib archives, search, summaries, deduplication, and optional iCloud sync.',
    platforms: ['macOS', 'iOS'],
    status: 'available',
    version: '1.0',
    systemRequirements: ['macOS 26 or later', 'iOS 26 or later'],
    icon: '/apps/history-lib/icon.png',
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
          'When site icons are enabled, the app may request favicon resources for hosts found in imported history records.',
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
]

const statusLabels: Record<AppStatus, string> = {
  available: 'Available',
  beta: 'Beta',
  'coming-soon': 'Coming soon',
  archived: 'Archived',
}

function getPathname(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function getAppBySlug(slug: string): AppRecord | undefined {
  return apps.find((app) => app.slug === slug)
}

function App() {
  const pathname = getPathname()
  const [firstSegment, secondSegment] = pathname.split('/').filter(Boolean)
  const selectedApp = firstSegment ? getAppBySlug(firstSegment) : undefined

  let page: ReactNode

  if (pathname === '/') {
    page = <HomePage />
  } else if (pathname === '/support') {
    page = <GlobalSupportPage />
  } else if (selectedApp && !secondSegment) {
    page = <AppPage app={selectedApp} />
  } else if (selectedApp && secondSegment === 'support') {
    page = <SupportPage app={selectedApp} />
  } else if (selectedApp && secondSegment === 'privacy') {
    page = <PrivacyPage app={selectedApp} />
  } else {
    page = <NotFoundPage />
  }

  return (
    <div className="app-shell">
      <Header />
      <main>{page}</main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-link" href="/" aria-label="SJasonP Apps home">
        <span className="brand-mark">S</span>
        <span>SJasonP Apps</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/">Apps</a>
        <a href="/support">Support</a>
      </nav>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-copy">
          <h1>Apps by SJasonP</h1>
          <p>
            A focused home for app introductions, download links, support information, and privacy
            policies.
          </p>
        </div>
        <div className="home-summary" aria-label="Site summary">
          <span>{apps.length}</span>
          <p>Published apps</p>
        </div>
      </section>

      <section className="app-index" aria-labelledby="apps-heading">
        <div className="section-heading">
          <h2 id="apps-heading">Available Apps</h2>
          <p>Official product pages and support resources.</p>
        </div>
        <div className="app-list">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </>
  )
}

function AppCard({ app }: { app: AppRecord }) {
  return (
    <article className="app-card">
      <img src={app.icon} alt="" className="app-icon" width="88" height="88" />
      <div className="app-card-body">
        <div className="app-card-title-row">
          <h3>{app.name}</h3>
          <span>{statusLabels[app.status]}</span>
        </div>
        <p>{app.shortDescription}</p>
        <MetaList items={[app.platforms.join(' / '), `Version ${app.version}`]} />
        <div className="action-row">
          <a className="button primary" href={`/${app.slug}`}>
            View app
          </a>
          <a className="button secondary" href={`/${app.slug}/support`}>
            Support
          </a>
        </div>
      </div>
    </article>
  )
}

function AppPage({ app }: { app: AppRecord }) {
  return (
    <>
      <section className="product-hero">
        <div className="product-copy">
          <img src={app.icon} alt="" className="product-icon" width="112" height="112" />
          <h1>{app.name}</h1>
          <p>{app.longDescription}</p>
          <MetaList items={[app.platforms.join(' / '), statusLabels[app.status], `Version ${app.version}`]} />
          <div className="action-row">
            <DownloadButton link={app.downloadLinks[0]} />
            <a className="button secondary" href={`/${app.slug}/support`}>
              Get support
            </a>
          </div>
        </div>
        <ProductPreview app={app} />
      </section>

      <section className="content-section" aria-labelledby="features-heading">
        <div className="section-heading">
          <h2 id="features-heading">Core Features</h2>
          <p>{app.featuresIntro}</p>
        </div>
        <div className="feature-grid">
          {app.features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <InfoPanel title="System Requirements" items={app.systemRequirements} />
        <InfoPanel
          title="Resources"
          items={[
            `Support: /${app.slug}/support`,
            `Privacy Policy: /${app.slug}/privacy`,
          ]}
        />
      </section>
    </>
  )
}

function ProductPreview({ app }: { app: AppRecord }) {
  return (
    <aside className="product-preview" aria-label={`${app.name} product preview`}>
      <div className="preview-toolbar">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="preview-body">
        <div>
          <strong>{app.previewTitle}</strong>
          <span>{app.previewSubtitle}</span>
        </div>
        <ul>
          {app.previewItems.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function SupportPage({ app }: { app: AppRecord }) {
  return (
    <ArticlePage
      title={`${app.name} Support`}
      intro="Find support information, common troubleshooting notes, and product resources."
    >
      <section>
        <h2>Contact</h2>
        <p>
          For support, email <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a> and
          include the app name, platform, app version, system version, and a short description of the
          issue.
        </p>
      </section>
      <section>
        <h2>Common Questions</h2>
        <FaqList items={app.supportFaq} />
      </section>
      <section>
        <h2>Related Links</h2>
        <p>
          Return to <a href={`/${app.slug}`}>{app.name}</a> or read the{' '}
          <a href={`/${app.slug}/privacy`}>privacy policy</a>.
        </p>
      </section>
    </ArticlePage>
  )
}

function PrivacyPage({ app }: { app: AppRecord }) {
  return (
    <ArticlePage
      title={`${app.name} Privacy Policy`}
      intro={`This page summarizes how ${app.name} handles app data and related metadata.`}
    >
      {app.privacy.map((item) => (
        <section key={item.title}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </section>
      ))}
      <section>
        <h2>Support</h2>
        <p>
          For privacy questions, email <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>.
        </p>
      </section>
    </ArticlePage>
  )
}

function GlobalSupportPage() {
  return (
    <ArticlePage
      title="Support"
      intro="Choose an app to view product-specific support information."
    >
      <div className="resource-list">
        {apps.map((app) => (
          <a key={app.slug} href={`/${app.slug}/support`}>
            <img src={app.icon} alt="" width="44" height="44" />
            <span>{app.name}</span>
          </a>
        ))}
      </div>
    </ArticlePage>
  )
}

function NotFoundPage() {
  return (
    <ArticlePage title="Page Not Found" intro="The requested page does not exist.">
      <p>
        Go back to <a href="/">SJasonP Apps</a>.
      </p>
    </ArticlePage>
  )
}

function ArticlePage({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <article className="article-page">
      <header>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="article-content">{children}</div>
    </article>
  )
}

function DownloadButton({ link }: { link?: DownloadLink }) {
  if (!link?.url) {
    return (
      <span className="button disabled" aria-disabled="true">
        {link?.label ?? 'Download link pending'}
      </span>
    )
  }

  return (
    <a className="button primary" href={link.url} rel="noreferrer" target="_blank">
      {link.label}
    </a>
  )
}

function MetaList({ items }: { items: string[] }) {
  return (
    <ul className="meta-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="info-panel">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>SJasonP Apps</span>
      <nav aria-label="Footer navigation">
        <a href="/">Apps</a>
        <a href="/support">Support</a>
      </nav>
    </footer>
  )
}

export default App
