

export function AppHeader({ onSetPage }) {

    return (
        <header className='app-header container'>  
        <section>
            <h1>MissBooks App </h1>
            <nav className='nav-list'>
                <a onClick={() => onSetPage('home')}> HOME </a>
                <a onClick={() => onSetPage('about')}> ABOUT </a>
                <a onClick={() => onSetPage('books')}> BOOKS </a>
            </nav>
            </section>   
        </header>
    )
}