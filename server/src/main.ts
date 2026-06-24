import {createReadStream, existsSync, readFileSync, statSync} from 'node:fs'
import {createServer as createHttpServer} from 'node:http'
import {createServer as createHttpsServer} from 'node:https'
import {extname, join, normalize, relative, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createBrotliCompress, createGzip} from 'node:zlib'
import mime from 'mime'
import type {IncomingMessage, ServerResponse} from 'node:http'

const PORT = Number(process.env.PORT ?? '6202')
const HOST = process.env.HOST ?? '0.0.0.0'
const USE_HTTP = process.env.APP_SERVER_USE_HTTP === '1'
const CERT_PATH =
    process.env.APP_SERVER_CERT_PATH ?? '/Library/WebServer/SSL/sjasonp.net.pem'
const KEY_PATH =
    process.env.APP_SERVER_KEY_PATH ?? '/Library/WebServer/SSL/sjasonp.net.key'

const serverDir = resolve(fileURLToPath(new URL('..', import.meta.url)))
const projectDir = resolve(serverDir, '..')
const distDir = resolve(process.env.APP_STATIC_DIR ?? join(projectDir, 'src', 'dist'))
const indexHtmlPath = join(distDir, 'index.html')
const notFoundHtmlPath = join(distDir, '404.html')

const contentSecurityPolicy = [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ')

type CompressionEncoding = 'br' | 'gzip'

const textMimeTypes = new Set(['application/json', 'image/svg+xml', 'text/css', 'text/html', 'text/javascript', 'text/plain'])
const eu27CountryCodes = new Set([
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
])

type RegionRestriction = 'CN' | 'EU27'

type RegionResponse = {
    countryCode: string | null
    region: RegionRestriction | null
    source: string
}

function getContentType(filePath: string): string {
    const contentType = mime.getType(filePath) ?? 'application/octet-stream'

    if (textMimeTypes.has(contentType)) {
        return `${contentType}; charset=utf-8`
    }

    return contentType
}

function setSecurityHeaders(response: ServerResponse): void {
    response.setHeader('X-Content-Type-Options', 'nosniff')
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.setHeader('Content-Security-Policy', contentSecurityPolicy)

    if (!USE_HTTP) {
        response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }
}

function isCompressibleContentType(contentType: string): boolean {
    return textMimeTypes.has(contentType.split(';')[0].trim())
}

function negotiateEncoding(acceptEncoding: string | string[] | undefined): CompressionEncoding | null {
    const header = (Array.isArray(acceptEncoding) ? acceptEncoding.join(',') : acceptEncoding ?? '').toLowerCase()

    if (header.includes('br')) {
        return 'br'
    }

    if (header.includes('gzip')) {
        return 'gzip'
    }

    return null
}

function getCanonicalPath(pathname: string): string {
    let canonicalPath = pathname.toLowerCase()

    if (canonicalPath.length > 1 && canonicalPath.endsWith('/')) {
        canonicalPath = canonicalPath.replace(/\/+$/, '')
    }

    return canonicalPath || '/'
}

function shouldCanonicalizePath(pathname: string): boolean {
    if (isLikelyFileRequest(pathname)) {
        return false
    }

    return !pathname.startsWith('/api/')
}

function isApiRequest(pathname: string): boolean {
    return pathname === '/api' || pathname.startsWith('/api/')
}

function normalizeCountryCode(value: string | string[] | undefined): string | null {
    const rawValue = Array.isArray(value) ? value[0] : value

    if (!rawValue) {
        return null
    }

    const countryCode = rawValue.trim().toUpperCase()

    if (/^[A-Z]{2}$/.test(countryCode) && countryCode !== 'XX') {
        return countryCode
    }

    return null
}

function getCountryCodeFromRequest(request: IncomingMessage): { countryCode: string | null; source: string } {
    const headerCandidates: Array<[string, string | string[] | undefined]> = [
        ['cf-ipcountry', request.headers['cf-ipcountry']],
        ['cloudfront-viewer-country', request.headers['cloudfront-viewer-country']],
        ['x-vercel-ip-country', request.headers['x-vercel-ip-country']],
        ['x-appengine-country', request.headers['x-appengine-country']],
        ['x-country-code', request.headers['x-country-code']],
        ['x-geoip-country', request.headers['x-geoip-country']],
    ]

    for (const [source, headerValue] of headerCandidates) {
        const countryCode = normalizeCountryCode(headerValue)

        if (countryCode) {
            return {countryCode, source}
        }
    }

    const envCountryCode = normalizeCountryCode(process.env.APP_GEOIP_COUNTRY)

    if (envCountryCode) {
        return {countryCode: envCountryCode, source: 'env'}
    }

    return {countryCode: null, source: 'unknown'}
}

function regionFromCountryCode(countryCode: string | null): RegionRestriction | null {
    if (countryCode === 'CN') {
        return 'CN'
    }

    if (countryCode && eu27CountryCodes.has(countryCode)) {
        return 'EU27'
    }

    return null
}

function sendJson(response: ServerResponse, statusCode: number, body: unknown): void {
    const payload = JSON.stringify(body)

    response.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'Cache-Control': 'no-store',
    })
    response.end(payload)
}

function handleApiRequest(request: IncomingMessage, response: ServerResponse, pathname: string): void {
    if (pathname !== '/api/region') {
        sendNotFound(response)
        return
    }

    if (request.method === 'HEAD') {
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
        })
        response.end()
        return
    }

    const {countryCode, source} = getCountryCodeFromRequest(request)
    const body: RegionResponse = {
        countryCode,
        region: regionFromCountryCode(countryCode),
        source,
    }

    sendJson(response, 200, body)
}

function getRequestUrl(request: IncomingMessage): URL | null {
    if (!request.url) {
        return null
    }

    const host = request.headers.host ?? `localhost:${PORT}`

    return new URL(request.url, `https://${host}`)
}

function redirect(response: ServerResponse, location: string): void {
    response.writeHead(301, {
        Location: location,
        'Cache-Control': 'public, max-age=3600',
    })
    response.end()
}

function sendNotFound(response: ServerResponse): void {
    response.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
    })
    response.end('Not found')
}

function isPathInside(parent: string, child: string): boolean {
    const childRelativePath = relative(parent, child)

    return (
        childRelativePath === '' ||
        (!childRelativePath.startsWith('..') && !childRelativePath.includes(`..${sep}`))
    )
}

function resolveStaticPath(pathname: string): string | null {
    let decodedPathname: string

    try {
        decodedPathname = decodeURIComponent(pathname)
    } catch {
        return null
    }

    const normalizedPathname = normalize(decodedPathname).replace(/^(\.\.(\/|\\|$))+/, '')
    const resolvedPath = resolve(distDir, `.${normalizedPathname}`)

    if (!isPathInside(distDir, resolvedPath)) {
        return null
    }

    return resolvedPath
}

function cacheControlForPath(filePath: string): string {
    if (filePath.includes(`${sep}assets${sep}`)) {
        return 'public, max-age=31536000, immutable'
    }

    return 'public, max-age=300'
}

function sendFile(
    request: IncomingMessage,
    response: ServerResponse,
    filePath: string,
    options: {statusCode?: number; cacheControl: string},
): void {
    const contentType = getContentType(filePath)
    const isHead = request.method === 'HEAD'
    const encoding = isCompressibleContentType(contentType)
        ? negotiateEncoding(request.headers['accept-encoding'])
        : null

    const headers: Record<string, string | number> = {
        'Content-Type': contentType,
        'Cache-Control': options.cacheControl,
    }

    if (encoding) {
        headers['Content-Encoding'] = encoding
        headers['Vary'] = 'Accept-Encoding'
    } else {
        headers['Content-Length'] = statSync(filePath).size
    }

    response.writeHead(options.statusCode ?? 200, headers)

    if (isHead) {
        response.end()
        return
    }

    const source = createReadStream(filePath)

    if (encoding === 'br') {
        source.pipe(createBrotliCompress()).pipe(response)
    } else if (encoding === 'gzip') {
        source.pipe(createGzip()).pipe(response)
    } else {
        source.pipe(response)
    }
}

function resolvePageFile(pathname: string): string | null {
    const canonicalPath = getCanonicalPath(pathname)
    const relativePath = canonicalPath === '/' ? '/index.html' : `${canonicalPath}/index.html`

    return resolveStaticPath(relativePath)
}

function servePage(request: IncomingMessage, response: ServerResponse, pathname: string): void {
    const pageFile = resolvePageFile(pathname)

    if (pageFile && existsSync(pageFile) && statSync(pageFile).isFile()) {
        sendFile(request, response, pageFile, {cacheControl: 'no-store'})
        return
    }

    if (existsSync(notFoundHtmlPath)) {
        sendFile(request, response, notFoundHtmlPath, {statusCode: 404, cacheControl: 'no-store'})
        return
    }

    if (!existsSync(indexHtmlPath)) {
        response.writeHead(500, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        })
        response.end('Frontend build output was not found. Run npm run build in apps/src.')
        return
    }

    sendFile(request, response, indexHtmlPath, {cacheControl: 'no-store'})
}

function isLikelyFileRequest(pathname: string): boolean {
    return extname(pathname) !== ''
}

function handleRequest(request: IncomingMessage, response: ServerResponse): void {
    setSecurityHeaders(response)

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405, {
            Allow: 'GET, HEAD',
            'Cache-Control': 'no-store',
        })
        response.end()
        return
    }

    const requestUrl = getRequestUrl(request)

    if (!requestUrl) {
        sendNotFound(response)
        return
    }

    if (isApiRequest(requestUrl.pathname)) {
        handleApiRequest(request, response, requestUrl.pathname)
        return
    }

    const staticPath = resolveStaticPath(requestUrl.pathname)

    if (!staticPath) {
        sendNotFound(response)
        return
    }

    if (existsSync(staticPath) && statSync(staticPath).isFile()) {
        sendFile(request, response, staticPath, {cacheControl: cacheControlForPath(staticPath)})
        return
    }

    if (shouldCanonicalizePath(requestUrl.pathname)) {
        const canonicalPath = getCanonicalPath(requestUrl.pathname)

        if (canonicalPath !== requestUrl.pathname) {
            requestUrl.pathname = canonicalPath
            redirect(response, `${requestUrl.pathname}${requestUrl.search}`)
            return
        }
    }

    if (isLikelyFileRequest(requestUrl.pathname)) {
        sendNotFound(response)
        return
    }

    servePage(request, response, requestUrl.pathname)
}

if (!existsSync(distDir)) {
    console.warn(`Static directory does not exist yet: ${distDir}`)
}

const server = USE_HTTP
    ? createHttpServer(handleRequest)
    : createHttpsServer(
        {
            cert: readFileSync(CERT_PATH),
            key: readFileSync(KEY_PATH),
        },
        handleRequest,
    )

server.listen(PORT, HOST, () => {
    const protocol = USE_HTTP ? 'http' : 'https'
    console.log(`apps server listening at ${protocol}://${HOST}:${PORT}`)
    console.log(`serving static files from ${distDir}`)
})
