import {AppIcon, MetaList} from '../components'
import type {AppRecord} from '../content'
import type {UiText} from '../i18n'

export function HomePage({
                             apps,
                             text,
                             labels,
                         }: {
    apps: AppRecord[]
    text: UiText
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
    text: UiText
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
                    {app.sourceUrl ? (
                        <a className="button secondary" href={app.sourceUrl} rel="noreferrer" target="_blank">
                            GitHub
                        </a>
                    ) : null}
                </div>
            </div>
        </article>
    )
}
