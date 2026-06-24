import {useEffect, useState} from 'react'
import './App.css'
import type {ReactNode} from 'react'
import {Footer, Header} from './components'
import {appContent, statusLabels} from './content'
import {getPreferredLocale, uiText} from './i18n'
import type {Locale} from './i18n'
import {AppPage, GetPage, GlobalSupportPage, HomePage, NotFoundPage, PrivacyPage, SupportPage} from './pages'
import {resolveRoute} from './router'
import {applyPageMeta, resolvePageMeta} from './seo/metadata'

function getPathname(): string {
    return window.location.pathname.replace(/\/+$/, '') || '/'
}

// The prerendered baseline is en-US. The first client render must also be en-US so
// hydration matches the static markup; the preferred locale is applied afterwards.
export function App({pathname = getPathname()}: {pathname?: string} = {}) {
    const [locale, setLocale] = useState<Locale>('en-US')
    const text = uiText[locale]
    const apps = appContent[locale]
    const labels = statusLabels[locale]
    const route = resolveRoute(pathname, apps)

    useEffect(() => {
        const preferred = getPreferredLocale()

        if (preferred !== locale) {
            setLocale(preferred)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        applyPageMeta(resolvePageMeta(pathname, locale), locale)
    }, [locale, pathname])

    let page: ReactNode

    if (route.kind === 'home') {
        page = <HomePage apps={apps} text={text} labels={labels}/>
    } else if (route.kind === 'global-support') {
        page = <GlobalSupportPage apps={apps} text={text}/>
    } else if (route.kind === 'app' && route.section === 'product') {
        page = <AppPage app={route.app} text={text} statusLabel={labels[route.app.status]}/>
    } else if (route.kind === 'app' && route.section === 'get') {
        page = <GetPage app={route.app} text={text} locale={locale}/>
    } else if (route.kind === 'app' && route.section === 'support') {
        page = <SupportPage app={route.app} text={text}/>
    } else if (route.kind === 'app' && route.section === 'privacy') {
        page = <PrivacyPage app={route.app} text={text}/>
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

export default App
