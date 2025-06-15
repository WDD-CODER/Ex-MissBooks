const { useState } = React

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { Books } from './pages/Books.jsx'
import { Footer } from './cmps/Footer.jsx'

export function RootCmp() {

    const [page, setPage] = useState('books')
    return (
        <section className='main-layout grid'>
            <AppHeader onSetPage={(page) => setPage(page)} />
            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'books' && <Books />}
            </main >
            <Footer fullName='Dan Weibren'/>
        </section>
    )
}