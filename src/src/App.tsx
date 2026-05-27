import {useEffect} from 'react'
import './App.css'
import type {ReactNode} from 'react'
import {Footer, Header} from './components'
import {appContent, statusLabels} from './content'
import type {AppRecord} from './content'
import {getPreferredLocale, uiText} from './i18n'
import {AppPage, GetPage, GlobalSupportPage, HomePage, NotFoundPage, PrivacyPage, SupportPage} from './pages'

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
    } else if (selectedApp && secondSegment === 'get') {
        page = <GetPage app={selectedApp} text={text} locale={locale}/>
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

export default App
