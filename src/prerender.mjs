import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createServer} from 'vite'

const projectDir = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(projectDir, 'dist')
const templatePath = join(distDir, 'index.html')

const NOT_FOUND_PATH = '/__not-found__'

function escapeHtml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function buildHtml(template, {appHtml, headTags, title}) {
    return template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
        .replace('<!--app-head-->', headTags)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

function outputPathForRoute(route) {
    if (route === '/') {
        return templatePath
    }

    return join(distDir, route.replace(/^\//, ''), 'index.html')
}

async function writeOutput(filePath, contents) {
    await mkdir(dirname(filePath), {recursive: true})
    await writeFile(filePath, contents, 'utf8')
}

function buildSitemap(origin, routes) {
    const urls = routes
        .map((route) => `  <url>\n    <loc>${origin}${route}</loc>\n  </url>`)
        .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function buildRobots(origin) {
    return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`
}

async function run() {
    const template = await readFile(templatePath, 'utf8')

    const vite = await createServer({
        root: projectDir,
        appType: 'custom',
        logLevel: 'warn',
        server: {middlewareMode: true},
    })

    try {
        const {render, prerenderRoutes, SITE_ORIGIN} = await vite.ssrLoadModule('/src/entry-server.tsx')
        const routes = prerenderRoutes()

        for (const route of routes) {
            const html = buildHtml(template, render(route))
            await writeOutput(outputPathForRoute(route), html)
            console.log(`prerendered ${route}`)
        }

        const notFoundHtml = buildHtml(template, render(NOT_FOUND_PATH))
        await writeOutput(join(distDir, '404.html'), notFoundHtml)
        console.log('prerendered 404')

        await writeOutput(join(distDir, 'sitemap.xml'), buildSitemap(SITE_ORIGIN, routes))
        await writeOutput(join(distDir, 'robots.txt'), buildRobots(SITE_ORIGIN))
        console.log('wrote sitemap.xml and robots.txt')
    } finally {
        await vite.close()
    }
}

run().catch((error) => {
    console.error(error)
    process.exit(1)
})
