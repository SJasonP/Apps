import type {ReactNode} from 'react'

export function ArticlePage({
                                title,
                                intro,
                                children,
                            }: {
    title: string
    intro: string
    children: ReactNode
}) {
    return (
        <article className="article-page">
            <header>
                <h1>{title}</h1>
                <p>{intro}</p>
            </header>
            <div className="article-content">{children}</div>
        </article>
    )
}
