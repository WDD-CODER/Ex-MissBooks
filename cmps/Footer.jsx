
export function Footer({ fullname }) {
    const str = 'This App Was Made With Love & Respect For People How Still Read Books 🧐 By'
    return (
        <footer className='Footer'>
            <p>{str} {fullname} </p>
        </footer>
    )
}