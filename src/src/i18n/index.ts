import {enUS} from './enUS'
import {zhHans} from './zhHans'
import type {Locale, UiText} from './types'

export {locales} from './types'
export type {Locale, LocalizedString, UiText} from './types'

export const uiText: Record<Locale, UiText> = {
    'en-US': enUS,
    'zh-Hans': zhHans,
}

export function getPreferredLocale(languages = navigator.languages): Locale {
    for (const language of languages) {
        const normalizedLanguage = language.toLowerCase()

        if (normalizedLanguage === 'zh' || normalizedLanguage.startsWith('zh-')) {
            return 'zh-Hans'
        }
    }

    return 'en-US'
}
