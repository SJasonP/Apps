import {renderToString} from 'react-dom/server'
import {App} from './App'
import {appContent} from './content'
import {renderHeadTags, resolvePageMeta, SITE_ORIGIN} from './seo/metadata'

export {SITE_ORIGIN}

export type PrerenderResult = {
    appHtml: string
    headTags: string
    title: string
}

// Renders one route to its en-US baseline markup plus the head tags for that route.
export function render(pathname: string): PrerenderResult {
    const appHtml = renderToString(<App pathname={pathname}/>)
    const meta = resolvePageMeta(pathname, 'en-US')

    return {appHtml, headTags: renderHeadTags(meta), title: meta.title}
}

// Enumerates every public page route from the app content, so prerendering never
// drifts from the apps that exist.
export function prerenderRoutes(): string[] {
    const routes = ['/', '/support']

    for (const app of appContent['en-US']) {
        routes.push(`/${app.slug}`, `/${app.slug}/get`, `/${app.slug}/support`, `/${app.slug}/privacy`)
    }

    return routes
}
