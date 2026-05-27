export function InfoPanel({title, items}: { title: string; items: string[] }) {
    return (
        <section className="info-panel">
            <h2>{title}</h2>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </section>
    )
}
