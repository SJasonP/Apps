import {ArticlePage, InfoPanel} from '../components'
import type {AppRecord} from '../content'
import type {UiText} from '../i18n'

export function PrivacyPage({app, text}: { app: AppRecord; text: UiText }) {
    return (
        <ArticlePage
            title={`${app.name} ${text.privacyTitle}`}
            intro={app.privacyIntro ?? text.privacyPageIntro}
        >
            {app.privacyMeta?.length ? <InfoPanel title={text.resources} items={app.privacyMeta}/> : null}
            {app.privacy.map((item) => (
                <section key={item.title}>
                    <h2>{item.title}</h2>
                    {item.description ? <p>{item.description}</p> : null}
                    {item.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.items?.length ? (
                        <ul className="article-list">
                            {item.items.map((listItem) => (
                                <li key={listItem}>{listItem}</li>
                            ))}
                        </ul>
                    ) : null}
                </section>
            ))}
            <section>
                <h2>{text.support}</h2>
                <p>
                    {text.privacyQuestions} <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>.
                </p>
            </section>
            {app.privacyFooter ? <p className="article-note">{app.privacyFooter}</p> : null}
        </ArticlePage>
    )
}
