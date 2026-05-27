export function MetaList({items}: { items: string[] }) {
    return (
        <ul className="meta-list">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}
