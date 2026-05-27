import {AppIcon, InfoPanel, MetaList, ProductPreview} from '../components'
import type {AppRecord} from '../content'
import type {UiText} from '../i18n'

export function AppPage({
                            app,
                            text,
                            statusLabel,
                        }: {
    app: AppRecord
    text: UiText
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
                        <a className="button primary" href={`/${app.slug}/get`}>
                            {text.getNow}
                        </a>
                        <a className="button secondary" href={`/${app.slug}/support`}>
                            {text.getSupport}
                        </a>
                        {app.sourceUrl ? (
                            <a className="button secondary" href={app.sourceUrl} rel="noreferrer" target="_blank">
                                GitHub
                            </a>
                        ) : null}
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

            {app.storySections?.length ? (
                <section className="content-section" aria-labelledby="story-heading">
                    <div className="section-heading">
                        <h2 id="story-heading">{text.productStory}</h2>
                    </div>
                    <div className="story-list">
                        {app.storySections.map((section) => (
                            <article className="story-section" key={section.title}>
                                <h3>{section.title}</h3>
                                {section.paragraphs?.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                                {section.items?.length ? (
                                    <ul>
                                        {section.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

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
