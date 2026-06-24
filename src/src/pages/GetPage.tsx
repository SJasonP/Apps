import {useEffect, useState} from 'react'
import {ArticlePage, InfoPanel} from '../components'
import type {AcquisitionPlatform, AppRecord, DownloadLink, GithubReleaseDownloadLink, RegionRestriction} from '../content'
import type {Locale, UiText} from '../i18n'
import {
    getDevicePlatform,
    getDownloadUrl,
    getIpRegion,
    isApplePlatform,
    platformLabel,
    regionLabel
} from '../utils/acquisition'
import type {IpRegionResult} from '../utils/acquisition'

function isGithubReleaseLink(link: DownloadLink): link is GithubReleaseDownloadLink {
    return link.kind === 'github-release'
}

export function GetPage({
                            app,
                            text,
                            locale,
                        }: {
    app: AppRecord
    text: UiText
    locale: Locale
}) {
    const [ipRegion, setIpRegion] = useState<IpRegionResult>({countryCode: null, region: null, source: 'loading'})
    const [platform, setPlatform] = useState<AcquisitionPlatform | 'unknown'>('unknown')
    const region = ipRegion.region
    const isAppleDevice = isApplePlatform(platform)
    const appStoreLink = app.downloadLinks.find((link) => link.kind === 'app-store')
    const appStoreRegionRestricted = Boolean(appStoreLink?.restrictedRegions?.length)
    const appStoreRegionConfirmed = ipRegion.source !== 'loading' && ipRegion.source !== 'unavailable' && ipRegion.source !== 'unknown'
    const appStoreBlocked = Boolean(appStoreLink?.restrictedRegions?.includes(region as RegionRestriction))
    const appStoreUnavailable = appStoreRegionRestricted && (!appStoreRegionConfirmed || appStoreBlocked)
    const appStoreUrl = isAppleDevice && !appStoreUnavailable ? appStoreLink?.url : undefined
    const releaseLink = app.downloadLinks.find(
        (link): link is GithubReleaseDownloadLink => isGithubReleaseLink(link) && link.platform === platform,
    )
    const releaseUrl = releaseLink ? getDownloadUrl(releaseLink, region) : undefined

    useEffect(() => {
        let active = true

        setPlatform(getDevicePlatform())

        getIpRegion().then((result) => {
            if (active) {
                setIpRegion(result)
            }
        })

        return () => {
            active = false
        }
    }, [])

    return (
        <ArticlePage title={`${text.getAppTitle} ${app.name}`} intro={text.getPageIntro}>
            <InfoPanel
                title={text.resources}
                items={[
                    `${text.yourDevice}: ${platformLabel(platform, locale)}`,
                    `${text.regionLabel}: ${regionLabel(ipRegion.countryCode, locale)}`,
                ]}
            />

            <section>
                <h2>{appStoreUrl ? text.appStore : text.githubReleases}</h2>
                {appStoreUrl ? (
                    <div className="download-choice">
                        <a className="button primary" href={appStoreUrl} rel="noreferrer" target="_blank">
                            {text.getNow}
                        </a>
                    </div>
                ) : releaseLink && releaseUrl ? (
                    <div className="download-choice">
                        <p>{text.selectedForDevice}: {releaseLink.fileName}</p>
                        <a className="button primary" href={releaseUrl} rel="noreferrer" target="_blank">
                            {text.getNow}
                        </a>
                        {region === 'CN' ? <p className="download-note">{text.githubProxyNotice}</p> : null}
                    </div>
                ) : app.sourceUrl ? (
                    <div className="download-choice">
                        <p>{text.sourceDownloadNotice}</p>
                        <a className="button primary" href={`${app.sourceUrl}/releases`} rel="noreferrer" target="_blank">
                            {text.viewReleases}
                        </a>
                    </div>
                ) : (
                    <p>{text.unavailableForDevice}</p>
                )}
            </section>

            {releaseLink && releaseUrl && appStoreUrl ? (
                <section>
                    <h2>{text.githubReleases}</h2>
                    <div className="download-choice">
                        <p>{text.selectedForDevice}: {releaseLink.fileName}</p>
                        <a className="button secondary" href={releaseUrl} rel="noreferrer" target="_blank">
                            {text.getNow}
                        </a>
                        {region === 'CN' ? <p className="download-note">{text.githubProxyNotice}</p> : null}
                    </div>
                </section>
            ) : null}

            {appStoreLink && isAppleDevice && appStoreUnavailable ? (
                <section>
                    <h2>{text.appStore}</h2>
                    <p>{appStoreRegionConfirmed ? text.appStoreUnavailableRegion : text.regionVerificationRequired}</p>
                </section>
            ) : null}
        </ArticlePage>
    )
}
