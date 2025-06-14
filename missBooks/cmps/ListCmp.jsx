import { WatcherAppPreview } from './PreviewCmp.jsx'

export function WatcherAppList({ watchers, onSelect, onRemove }) {
    return (
        <React.Fragment>
            <div className={"watcher-app-container"}>
                <WatcherAppPreview
                    watchers={watchers}
                    onSelect={onSelect}
                    onRemove={onRemove}
                />
            </div>
        </React.Fragment>)
}