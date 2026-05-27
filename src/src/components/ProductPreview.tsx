import type {AppRecord} from '../content'
import type {UiText} from '../i18n'

export function ProductPreview({app, text}: { app: AppRecord; text: UiText }) {
    return (
        <aside className="product-preview" aria-label={`${app.name} ${text.productPreview}`}>
            <div className="preview-toolbar">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="preview-body">
                <div>
                    <strong>{app.previewTitle}</strong>
                    <span>{app.previewSubtitle}</span>
                </div>
                <ul>
                    {app.previewItems.map((item) => (
                        <li key={item.label}>
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
