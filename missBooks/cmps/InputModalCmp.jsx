const { useState, useEffect, } = React;

export function WatcherAppInputModal({ onAddUser }) {

    const [user, setUser] = useState({ fullName: '', movies: [] })


    function setFullName(value) {
        setUser(user => ({ ...user, fullName: value }))
    }

    function setUserMovie(value) {
        setUser(user => ({ ...user, movies: [...user.movies, value] }))
    }

    return (
        <React.Fragment>
            <ul>
                <label className="fullName input">What's the user's full name? </label>
                <br />
                <li>
                    <input id="fullName" type='text' onBlur={ev => setFullName(ev.target.value)} />
                </li>
                <br />
                <label className="movie-1 input">What movie did the user watch?</label>
                <br />
                <li>
                    <input type='text' onBlur={ev => setUserMovie(ev.target.value)} />
                </li>
                <br />
                <label className="movie-1 input">What movie Did the user watch?</label>
                <br />
                <li>
                    <input type='text' onBlur={ev => setUserMovie(ev.target.value)} />
                </li>
            </ul>
            <button onClick={() => onAddUser(user)}>Save User</button>
        </React.Fragment>
    )
}
