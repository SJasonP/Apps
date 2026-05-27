import type {UiText} from '../i18n'

export function Header({text}: { text: UiText }) {
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

export function Footer({text}: { text: UiText }) {
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
