import {ArticlePage, FaqList} from '../components'
import type {AppRecord} from '../content'
import type {UiText} from '../i18n'

export function SupportPage({app, text}: { app: AppRecord; text: UiText }) {
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

export function GlobalSupportPage({apps, text}: { apps: AppRecord[]; text: UiText }) {
    return (
        <ArticlePage title={text.support} intro={text.productSpecificSupport}>
            <section>
                <h2>{text.contact}</h2>
                <p>{text.globalContactIntro}</p>
                <div className="contact-list">
                    <a href="mailto:SJasonP@iCloud.com">SJasonP@iCloud.com</a>
                    <code>{text.gpgFingerprint}: 4346 5709 BADE 18AD D1D4 9CF3 9441 0395 F49A E2E0</code>
                </div>
            </section>
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
