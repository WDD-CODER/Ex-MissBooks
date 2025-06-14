const { useState } = React

import { Footer } from './cmps/Footer.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { Books } from './pages/Books.jsx'

export function RootCmp() {

    const [page, setPage] = useState('home')
    console.log("🚀 ~ RootCmp ~ page:", page)

    return (
        <section className='main-layout'>
            <AppHeader onSetPage={(page) => setPage(page)} />
            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'books' && <Books />}
            </main >
            <Footer/>
        </section>
    )
}