import type {AppRecord} from '../content'

export function AppIcon({app, className, size}: { app: AppRecord; className: string; size: number }) {
    return (
        <picture>
            {app.iconDark ? <source srcSet={app.iconDark} media="(prefers-color-scheme: dark)"/> : null}
            <img src={app.icon} alt="" className={className} width={size} height={size}/>
        </picture>
    )
}
