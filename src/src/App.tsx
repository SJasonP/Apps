import {useEffect} from 'react'
import './App.css'
import type {ReactNode} from 'react'
import {appContent, statusLabels} from './content'
import type {AppRecord, DownloadLink, FaqItem} from './content'
import {getPreferredLocale, uiText} from './i18n'

function getPathname(): string {
    return window.location.pathname.replace(/\/+$/, '') || '/'
}

function getAppBySlug(apps: AppRecord[], slug: string): AppRecord | undefined {
    return apps.find((app) => app.slug === slug)
}

function App() {
    const locale = getPreferredLocale()
    const text = uiText[locale]
    const apps = appContent[locale]
    const labels = statusLabels[locale]
    const pathname = getPathname()
    const [firstSegment, secondSegment] = pathname.split('/').filter(Boolean)
    const selectedApp = firstSegment ? getAppBySlug(apps, firstSegment) : undefined

    useEffect(() => {
        document.documentElement.lang = locale
        document.title = text.siteTitle
    }, [locale, text.siteTitle])

    let page: ReactNode

    if (pathname === '/') {
        page = <HomePage apps={apps} text={text} labels={labels}/>
    } else if (pathname === '/support') {
        page = <GlobalSupportPage apps={apps} text={text}/>
    } else if (selectedApp && !secondSegment) {
        page = <AppPage app={selectedApp} text={text} statusLabel={labels[selectedApp.status]}/>
    } else if (selectedApp && secondSegment === 'support') {
        page = <SupportPage app={selectedApp} text={text}/>
    } else if (selectedApp && secondSegment === 'privacy') {
        page = <PrivacyPage app={selectedApp} text={text}/>
    } else {
        page = <NotFoundPage text={text}/>
    }

    return (
        <div className="app-shell">
            <Header text={text}/>
            <main>{page}</main>
            <Footer text={text}/>
        </div>
    )
}

function Header({text}: { text: typeof uiText['en-US'] }) {
    return (
        <header className="site-header">
            <a className="brand-link" href="/" aria-label={text.siteBrand}>
                <picture className="brand-mark">
                    <source
                        srcSet="/brand/apps-icon-dark-256.png"
                        media="(prefers-color-scheme: dark)"
                    />
                    <img src="/brand/apps-icon-light-256.png" alt="" width="36" height="36"/>
                </picture>
                <span>{text.siteBrand}</span>
            </a>
            <nav aria-label={text.primaryNavigation}>
                <a href="/">{text.navApps}</a>
                <a href="/support">{text.navSupport}</a>
            </nav>
        </header>
    )
}

function HomePage({
                      apps,
                      text,
                      labels,
                  }: {
    apps: AppRecord[]
    text: typeof uiText['en-US']
    labels: Record<AppRecord['status'], string>
}) {
    return (
        <>
            <section className="home-hero">
                <div className="home-copy">
                    <h1 className="home-title">
                        <span className="home-title-muted">{text.homeTitleMuted}</span>
                        <span>{text.homeTitleMain}</span>
                    </h1>
                    <p>{text.homeDescription}</p>
                </div>
                <div className="home-summary" aria-label={text.siteSummary}>
                    <span>{apps.length}</span>
                    <p>{text.publishedApps}</p>
                </div>
            </section>

            <section className="app-index" aria-labelledby="apps-heading">
                <div className="section-heading">
                    <h2 id="apps-heading">{text.availableApps}</h2>
                    <p>{text.officialResources}</p>
                </div>
                <div className="app-list">
                    {apps.map((app) => (
                        <AppCard key={app.slug} app={app} text={text} statusLabel={labels[app.status]}/>
                    ))}
                </div>
            </section>
        </>
    )
}

function AppCard({
                     app,
                     text,
                     statusLabel,
                 }: {
    app: AppRecord
    text: typeof uiText['en-US']
    statusLabel: string
}) {
    return (
        <article className="app-card">
            <AppIcon app={app} className="app-icon" size={88}/>
            <div className="app-card-body">
                <div className="app-card-title-row">
                    <h3>{app.name}</h3>
                    <span>{statusLabel}</span>
                </div>
                <p>{app.shortDescription}</p>
                <MetaList items={[app.platforms.join(' / '), `${text.versionLabel} ${app.version}`]}/>
                <div className="action-row">
                    <a className="button primary" href={`/${app.slug}`}>
                        {text.viewApp}
                    </a>
                    <a className="button secondary" href={`/${app.slug}/support`}>
                        {text.support}
                    </a>
                </div>
            </div>
        </article>
    )
}

function AppPage({
                     app,
                     text,
                     statusLabel,
                 }: {
    app: AppRecord
    text: typeof uiText['en-US']
    statusLabel: string
}) {
    return (
        <>
            <section className="product-hero">
                <div className="product-copy">
                    <AppIcon app={app} className="product-icon" size={112}/>
                    <h1>{app.name}</h1>
                    <p>{app.longDescription}</p>
                    <MetaList
                        items={[app.platforms.join(' / '), statusLabel, `${text.versionLabel} ${app.version}`]}
                    />
                    <div className="action-row">
                        <DownloadButton link={app.downloadLinks[0]} fallbackLabel={text.appStoreAlt}/>
                        <a className="button secondary" href={`/${app.slug}/support`}>
                            {text.getSupport}
                        </a>
                    </div>
                </div>
                <ProductPreview app={app} text={text}/>
            </section>

            <section className="content-section" aria-labelledby="features-heading">
                <div className="section-heading">
                    <h2 id="features-heading">{text.coreFeatures}</h2>
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
                <InfoPanel title={text.systemRequirements} items={app.systemRequirements}/>
                <InfoPanel
                    title={text.resources}
                    items={[
                        `${text.supportPathLabel}: /${app.slug}/support`,
                        `${text.privacyPathLabel}: /${app.slug}/privacy`,
                    ]}
                />
            </section>
        </>
    )
}

function AppIcon({app, className, size}: { app: AppRecord; className: string; size: number }) {
    return (
        <picture>
            {app.iconDark ? <source srcSet={app.iconDark} media="(prefers-color-scheme: dark)"/> : null}
            <img src={app.icon} alt="" className={className} width={size} height={size}/>
        </picture>
    )
}

function ProductPreview({app, text}: { app: AppRecord; text: typeof uiText['en-US'] }) {
    return (
        <aside className="product-preview" aria-label={`${app.name} ${text.productPreview}`}>
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

function SupportPage({app, text}: { app: AppRecord; text: typeof uiText['en-US'] }) {
    return (
        <ArticlePage title={`${app.name} ${text.support}`} intro={text.supportPageIntro}>
            <section>
                <h2>{text.contact}</h2>
                <p>
                    {text.contactTextBefore} <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>{' '}
                    {text.contactTextAfter}
                </p>
            </section>
            <section>
                <h2>{text.commonQuestions}</h2>
                <FaqList items={app.supportFaq}/>
            </section>
            <section>
                <h2>{text.resources}</h2>
                <p>
                    {text.returnTo} <a href={`/${app.slug}`}>{app.name}</a> {text.orReadThe}{' '}
                    <a href={`/${app.slug}/privacy`}>{text.privacyPolicy}</a>.
                </p>
            </section>
        </ArticlePage>
    )
}

function PrivacyPage({app, text}: { app: AppRecord; text: typeof uiText['en-US'] }) {
    return (
        <ArticlePage
            title={`${app.name} ${text.privacyTitle}`}
            intro={text.privacyPageIntro}
        >
            {app.privacy.map((item) => (
                <section key={item.title}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                </section>
            ))}
            <section>
                <h2>{text.support}</h2>
                <p>
                    {text.privacyQuestions} <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>.
                </p>
            </section>
        </ArticlePage>
    )
}

function GlobalSupportPage({apps, text}: { apps: AppRecord[]; text: typeof uiText['en-US'] }) {
    return (
        <ArticlePage title={text.support} intro={text.productSpecificSupport}>
            <div className="resource-list">
                {apps.map((app) => (
                    <a key={app.slug} href={`/${app.slug}/support`}>
                        <img src={app.icon} alt="" width="44" height="44"/>
                        <span>{app.name}</span>
                    </a>
                ))}
            </div>
        </ArticlePage>
    )
}

function NotFoundPage({text}: { text: typeof uiText['en-US'] }) {
    return (
        <ArticlePage title={text.notFoundTitle} intro={text.notFoundIntro}>
            <p>
                {text.returnTo} <a href="/">{text.siteBrand}</a>.
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

function DownloadButton({
                            link,
                            fallbackLabel,
                        }: {
    link?: DownloadLink
    fallbackLabel: string
}) {
    if (!link?.url) {
        return (
            <span className="button disabled" aria-disabled="true">
        {link?.label ?? fallbackLabel}
      </span>
        )
    }

    return (
        <a className="button primary" href={link.url} rel="noreferrer" target="_blank">
            {link.label}
        </a>
    )
}

function MetaList({items}: { items: string[] }) {
    return (
        <ul className="meta-list">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}

function InfoPanel({title, items}: { title: string; items: string[] }) {
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

function FaqList({items}: { items: FaqItem[] }) {
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

function Footer({text}: { text: typeof uiText['en-US'] }) {
    return (
        <footer className="site-footer">
            <span>{text.footerLabel}</span>
            <nav aria-label={text.footerNavigation}>
                <a href="/">{text.navApps}</a>
                <a href="/support">{text.navSupport}</a>
            </nav>
        </footer>
    )
}

export default App
