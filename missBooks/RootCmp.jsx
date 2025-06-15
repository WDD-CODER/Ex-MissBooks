const { useState } = React

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Footer } from './cmps/Footer.jsx'

export function RootCmp() {

    const [page, setPage] = useState('books')
    return (
        <section className='main-layout grid'>
            <AppHeader onSetPage={(page) => setPage(page)} />
            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main >
            <Footer fullName='Dan Weibren'/>
        </section>
    )
}