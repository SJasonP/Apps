import {historyLibEnUS} from './enUS'
import {historyLibShared} from './shared'
import {historyLibZhHans} from './zhHans'
import type {LocalizedAppRecord} from '../../types'

export const historyLib: LocalizedAppRecord = {
    'en-US': {
        ...historyLibShared,
        ...historyLibEnUS,
    },
    'zh-Hans': {
        ...historyLibShared,
        ...historyLibZhHans,
    },
}
