import type {Locale} from '../i18n'
import type {AppStatus} from './types'

export const statusLabels: Record<Locale, Record<AppStatus, string>> = {
    'en-US': {
        available: 'Available',
        beta: 'Beta',
        'coming-soon': 'Coming soon',
        archived: 'Archived',
    },
    'zh-Hans': {
        available: '可用',
        beta: '测试版',
        'coming-soon': '即将推出',
        archived: '已归档',
    },
}
