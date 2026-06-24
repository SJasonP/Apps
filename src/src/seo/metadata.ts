import {appContent} from '../content'
import {uiText} from '../i18n'
import type {Locale} from '../i18n'
import {normalizePathname, resolveRoute} from '../router'

export const SITE_ORIGIN = 'https://apps.sjasonp.net'
const SITE_MARK = '/brand/apps-icon-light-256.png'

export type PageMeta = {
    title: string
    description: string
    canonical: string
    ogImage: string
    isProduct: boolean
    jsonLd?: Record<string, unknown>
}

function absoluteUrl(path: string): string {
    if (/^https?:\/\//.test(path)) {
        return path
    }

    return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

function canonicalUrl(pathname: string): string {
    return absoluteUrl(normalizePathname(pathname).toLowerCase())
}

export function resolvePageMeta(pathname: string, locale: Locale): PageMeta {
    const text = uiText[locale]
    const apps = appContent[locale]
    const route = resolveRoute(pathname, apps)
    const canonical = canonicalUrl(pathname)
    const siteMark = absoluteUrl(SITE_MARK)

    if (route.kind === 'home') {
        return {title: text.siteTitle, description: text.homeDescription, canonical, ogImage: siteMark, isProduct: false}
    }

    if (route.kind === 'global-support') {
        return {
            title: `${text.support} — ${text.siteTitle}`,
            description: text.supportPageIntro,
            canonical,
            ogImage: siteMark,
            isProduct: false,
        }
    }

    if (route.kind === 'app') {
        const {app, section} = route
        const appImage = absoluteUrl(app.iconSmall ?? app.icon)

        if (section === 'product') {
            return {
                title: `${app.name} — ${text.siteTitle}`,
                description: app.shortDescription,
                canonical,
                ogImage: appImage,
                isProduct: true,
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@type': 'SoftwareApplication',
                    name: app.name,
                    description: app.shortDescription,
                    operatingSystem: app.platforms.join(', '),
                    applicationCategory: 'UtilitiesApplication',
                    softwareVersion: app.version,
                    image: appImage,
                    downloadUrl: absoluteUrl(`/${app.slug}/get`),
                    offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
                },
            }
        }

        if (section === 'get') {
            return {
                title: `${text.getAppTitle} ${app.name} — ${text.siteTitle}`,
                description: text.getPageIntro,
                canonical,
                ogImage: appImage,
                isProduct: false,
            }
        }

        if (section === 'support') {
            return {
                title: `${app.name} ${text.support} — ${text.siteTitle}`,
                description: app.shortDescription,
                canonical,
                ogImage: appImage,
                isProduct: false,
            }
        }

        return {
            title: `${app.name} ${text.privacyTitle} — ${text.siteTitle}`,
            description: app.shortDescription,
            canonical,
            ogImage: appImage,
            isProduct: false,
        }
    }

    return {
        title: `${text.notFoundTitle} — ${text.siteTitle}`,
        description: text.notFoundIntro,
        canonical,
        ogImage: siteMark,
        isProduct: false,
    }
}

function escapeAttribute(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

// Builds the per-route head tags, excluding <title>, for prerendered HTML.
export function renderHeadTags(meta: PageMeta): string {
    const tags = [
        `<meta name="description" content="${escapeAttribute(meta.description)}" />`,
        `<link rel="canonical" href="${escapeAttribute(meta.canonical)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="SJasonP Apps" />`,
        `<meta property="og:title" content="${escapeAttribute(meta.title)}" />`,
        `<meta property="og:description" content="${escapeAttribute(meta.description)}" />`,
        `<meta property="og:url" content="${escapeAttribute(meta.canonical)}" />`,
        `<meta property="og:image" content="${escapeAttribute(meta.ogImage)}" />`,
        `<meta name="twitter:card" content="summary" />`,
        `<meta name="twitter:title" content="${escapeAttribute(meta.title)}" />`,
        `<meta name="twitter:description" content="${escapeAttribute(meta.description)}" />`,
        `<meta name="twitter:image" content="${escapeAttribute(meta.ogImage)}" />`,
    ]

    if (meta.jsonLd) {
        const json = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')
        tags.push(`<script type="application/ld+json" id="ld-app">${json}</script>`)
    }

    return tags.join('\n    ')
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
    }

    element.setAttribute('content', content)
}

// Applies the resolved metadata to the live document on the client, including the
// locale swap after hydration.
export function applyPageMeta(meta: PageMeta, locale: Locale): void {
    document.documentElement.lang = locale
    document.title = meta.title

    upsertMeta('name', 'description', meta.description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'SJasonP Apps')
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', meta.canonical)
    upsertMeta('property', 'og:image', meta.ogImage)
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', meta.ogImage)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

    if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
    }

    canonical.setAttribute('href', meta.canonical)

    let jsonLd = document.getElementById('ld-app') as HTMLScriptElement | null

    if (meta.jsonLd) {
        if (!jsonLd) {
            jsonLd = document.createElement('script')
            jsonLd.type = 'application/ld+json'
            jsonLd.id = 'ld-app'
            document.head.appendChild(jsonLd)
        }

        jsonLd.textContent = JSON.stringify(meta.jsonLd)
    } else if (jsonLd) {
        jsonLd.remove()
    }
}
