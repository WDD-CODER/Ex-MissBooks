const { useState } = React

import { AppHeader } from './pages/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

export function RootCmp() {

    const [page, setPage] = useState('about')
    console.log("🚀 ~ RootCmp ~ page:", page)

    return (
        <section className='main-layout grid place-center '>
            <AppHeader onSetPage={(page) => setPage(page)} />
            <main>
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main >
        </section>
    )
}