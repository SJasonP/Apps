import type {AppRecord} from '../content'

export function AppIcon({app, className, size}: { app: AppRecord; className: string; size: number }) {
    const icon = app.iconSmall ?? app.icon
    const iconDark = app.iconDarkSmall ?? app.iconDark

    return (
        <picture>
            {iconDark ? <source srcSet={iconDark} media="(prefers-color-scheme: dark)"/> : null}
            <img src={icon} alt="" className={className} width={size} height={size}/>
        </picture>
    )
}
