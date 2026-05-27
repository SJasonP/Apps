import {ArticlePage} from '../components'
import type {UiText} from '../i18n'

export function NotFoundPage({text}: { text: UiText }) {
    return (
        <ArticlePage title={text.notFoundTitle} intro={text.notFoundIntro}>
            <p>
                {text.returnTo} <a href="/">{text.siteBrand}</a>.
            </p>
        </ArticlePage>
    )
}
