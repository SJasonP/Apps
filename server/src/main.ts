import {createReadStream, existsSync, readFileSync, statSync} from 'node:fs'
import {createServer as createHttpServer} from 'node:http'
import {createServer as createHttpsServer} from 'node:https'
import {extname, join, normalize, relative, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'
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

const textMimeTypes = new Set(['application/json', 'image/svg+xml', 'text/css', 'text/html', 'text/javascript', 'text/plain'])

function getContentType(filePath: string): string {
    const contentType = mime.getType(filePath) ?? 'application/octet-stream'

    if (textMimeTypes.has(contentType)) {
        return `${contentType}; charset=utf-8`
    }

    return contentType
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

function getRequestUrl(request: IncomingMessage): URL | null {
    if (!request.url) {
        return null
    }

    const host = request.headers.host ?? `localhost:${PORT}`

    return new URL(request.url, `http://${host}`)
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

function serveFile(response: ServerResponse, filePath: string): void {
    const fileStat = statSync(filePath)

    response.writeHead(200, {
        'Content-Type': getContentType(filePath),
        'Content-Length': fileStat.size,
        'Cache-Control': cacheControlForPath(filePath),
    })

    createReadStream(filePath).pipe(response)
}

function serveIndex(response: ServerResponse): void {
    if (!existsSync(indexHtmlPath)) {
        response.writeHead(500, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        })
        response.end('Frontend build output was not found. Run npm run build in apps/src.')
        return
    }

    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
    })

    createReadStream(indexHtmlPath).pipe(response)
}

function isLikelyFileRequest(pathname: string): boolean {
    return extname(pathname) !== ''
}

function handleRequest(request: IncomingMessage, response: ServerResponse): void {
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

    const staticPath = resolveStaticPath(requestUrl.pathname)

    if (!staticPath) {
        sendNotFound(response)
        return
    }

    if (existsSync(staticPath) && statSync(staticPath).isFile()) {
        if (request.method === 'HEAD') {
            const fileStat = statSync(staticPath)
            response.writeHead(200, {
                'Content-Type': getContentType(staticPath),
                'Content-Length': fileStat.size,
                'Cache-Control': cacheControlForPath(staticPath),
            })
            response.end()
            return
        }

        serveFile(response, staticPath)
        return
    }

    if (isApiRequest(requestUrl.pathname)) {
        sendNotFound(response)
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

    if (request.method === 'HEAD') {
        if (!existsSync(indexHtmlPath)) {
            response.writeHead(500, {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-store',
            })
            response.end()
            return
        }

        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
        })
        response.end()
        return
    }

    serveIndex(response)
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
