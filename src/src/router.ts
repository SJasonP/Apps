import type {AppRecord} from './content'

export type AppSection = 'product' | 'get' | 'support' | 'privacy'

export type RouteMatch =
    | {kind: 'home'}
    | {kind: 'global-support'}
    | {kind: 'app'; app: AppRecord; section: AppSection}
    | {kind: 'not-found'}

export function normalizePathname(pathname: string): string {
    return pathname.replace(/\/+$/, '') || '/'
}

export function resolveRoute(pathname: string, apps: AppRecord[]): RouteMatch {
    const path = normalizePathname(pathname)

    if (path === '/') {
        return {kind: 'home'}
    }

    if (path === '/support') {
        return {kind: 'global-support'}
    }

    const [firstSegment, secondSegment, ...rest] = path.split('/').filter(Boolean)
    const app = apps.find((candidate) => candidate.slug === firstSegment)

    if (!app || rest.length > 0) {
        return {kind: 'not-found'}
    }

    if (!secondSegment) {
        return {kind: 'app', app, section: 'product'}
    }

    if (secondSegment === 'get' || secondSegment === 'support' || secondSegment === 'privacy') {
        return {kind: 'app', app, section: secondSegment}
    }

    return {kind: 'not-found'}
}
