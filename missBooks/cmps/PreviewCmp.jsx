export function WatcherAppPreview({ watchers, onSelect, onRemove }) {
    if (watchers.length >= 1)
        return (
            <React.Fragment>
                {watchers.map((watcher, idx) => {
                    return <article key={watcher.id} className="watcher-preview-container">
                        <img src={`https://robohash.org/watcher${watcher.id}`} alt="avatar-pic" />
                        <h4>{watcher.fullName}</h4>
                        <section>
                            <button onClick={() => onRemove(watcher.id)} className='remove btn'>X</button>
                            <button onClick={() => onSelect(watcher.id)} >Select</button>
                        </section>
                    </article>
                })}
            </React.Fragment>
        )
}
