const { useState, useEffect, useRef } = React;

export function WatcherAppUserModal({selectedUser}) {

    const [user, setUser] = useState(selectedUser)


    return (
        <React.Fragment>
            <p className="watcher-name">{user.fullName + " loves "} MOVIES :</p>
            <ul>
                {user.movies.map(movie => {
                    return <li key={movie}> {movie}</li>
                })}
            </ul>
        </React.Fragment>
    )
}
