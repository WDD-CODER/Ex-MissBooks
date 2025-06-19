
const { link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className='app-header'>
            <section>
                <h1>MissBooks App </h1>
                <nav className='app-nav'>
                    <NavLink to="/"> HOME </NavLink>
                    <NavLink to="/about"> ABOUT </NavLink>
                    <NavLink to="/books"> BOOKS </NavLink>
                </nav>
            </section>
        </header>
    )
}