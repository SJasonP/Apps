import type {AcquisitionPlatform, DownloadLink, RegionRestriction} from '../content'
import type {Locale} from '../i18n'

export type IpRegionResult = {
    countryCode: string | null
    region: RegionRestriction | null
    source: string
}

export async function getIpRegion(): Promise<IpRegionResult> {
    try {
        const response = await fetch('/api/region', {
            cache: 'no-store',
            headers: {
                Accept: 'application/json',
            },
        })

        if (!response.ok) {
            return {countryCode: null, region: null, source: 'unavailable'}
        }

        return await response.json() as IpRegionResult
    } catch {
        return {countryCode: null, region: null, source: 'unavailable'}
    }
}

export function getDevicePlatform(): AcquisitionPlatform | 'unknown' {
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
    const platform = `${nav.userAgentData?.platform ?? navigator.platform}`.toLowerCase()
    const userAgent = navigator.userAgent.toLowerCase()
    const isTouchMac = platform.includes('mac') && navigator.maxTouchPoints > 1

    if (userAgent.includes('android') || platform.includes('android')) {
        return 'android'
    }

    if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod') || isTouchMac) {
        return 'ios'
    }

    if (platform.includes('mac') || userAgent.includes('macintosh')) {
        return 'macos'
    }

    if (platform.includes('win') || userAgent.includes('windows')) {
        return 'windows'
    }

    if (platform.includes('linux') || userAgent.includes('linux')) {
        return 'linux'
    }

    return 'unknown'
}

function countryDisplayName(countryCode: string, locale: Locale): string {
    try {
        return new Intl.DisplayNames([locale], {type: 'region'}).of(countryCode) ?? countryCode
    } catch {
        return countryCode
    }
}

export function regionLabel(countryCode: string | null, locale: Locale): string {
    if (countryCode) {
        return countryDisplayName(countryCode, locale)
    }

    return locale === 'zh-Hans' ? '未知地区' : 'Unknown region'
}

export function platformLabel(platform: AcquisitionPlatform | 'unknown', locale: Locale): string {
    const labels: Record<AcquisitionPlatform | 'unknown', string> = {
        android: 'Android',
        ios: 'iOS',
        linux: 'Linux',
        macos: 'macOS',
        unknown: locale === 'zh-Hans' ? '未知设备' : 'Unknown device',
        windows: 'Windows',
    }

    return labels[platform]
}

export function isApplePlatform(platform: AcquisitionPlatform | 'unknown'): boolean {
    return platform === 'ios' || platform === 'macos'
}

export function getDownloadUrl(link: DownloadLink, region: RegionRestriction | null | undefined): string | undefined {
    if (!link.url) {
        return undefined
    }

    if (link.kind === 'github-release' && region === 'CN') {
        return `https://gh-proxy.org/${link.url}`
    }

    return link.url
}
