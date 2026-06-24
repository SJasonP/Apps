import type {AcquisitionPlatform, GithubReleaseDownloadLink} from './types'

export type ReleaseAssetSpec = {
    platform: AcquisitionPlatform
    label: string
    ext: string
}

// Derives a GitHub release link from the version so a release bump only changes
// `version`. fileName follows {assetName}-v{version}-{label}.{ext}, matching the
// naming rule in docs/content-model.md.
export function githubReleaseAsset(
    sourceUrl: string,
    assetName: string,
    version: string,
    spec: ReleaseAssetSpec,
): GithubReleaseDownloadLink {
    const fileName = `${assetName}-v${version}-${spec.label}.${spec.ext}`

    return {
        kind: 'github-release',
        url: `${sourceUrl}/releases/download/v${version}/${fileName}`,
        platform: spec.platform,
        fileName,
    }
}
