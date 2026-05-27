import type {Locale} from '../i18n'
import {appRecords} from './apps'
import {statusLabels} from './statusLabels'
import type {AppRecord} from './types'

export const appContent: Record<Locale, AppRecord[]> = {
    'en-US': appRecords.map((app) => app['en-US']),
    'zh-Hans': appRecords.map((app) => app['zh-Hans']),
}

export {statusLabels}
export type {
    AcquisitionPlatform,
    AppRecord,
    AppStatus,
    DownloadLink,
    FaqItem,
    GithubReleaseDownloadLink,
    RegionRestriction,
} from './types'
