import {foldersGuardEnUS} from './enUS'
import {foldersGuardShared} from './shared'
import {foldersGuardZhHans} from './zhHans'
import type {LocalizedAppRecord} from '../../types'

export const foldersGuard: LocalizedAppRecord = {
    'en-US': {
        ...foldersGuardShared,
        ...foldersGuardEnUS,
    },
    'zh-Hans': {
        ...foldersGuardShared,
        ...foldersGuardZhHans,
    },
}
