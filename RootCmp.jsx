
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { Footer } from './cmps/Footer.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AddReview } from './cmps/AddReview.jsx'
import { GBookAdd } from './pages/GBookAdd.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutGoal.jsx'

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM
export function RootCmp() {



    // דדדדד

    
    // <Route path="/" element={<Home />} />
    // <Route path="/about" element={<About />}>
    //     <Route path="team" element={<Team />} >
    //         <Route path="goal" element={<MemberPage />} />
    //     </Route>
    //     <Route path="vision" element={<Vision />} />
    // </Route>
    // <Route path="/book" element={<BookIndex />} />

// cccccccc new 

    return (
        <Router>
            <section className='main-layout grid'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/about" />} />
                        <Route path="/home" element={<Home />} />

                        <Route path="/about" element={<AboutUs />}>
                            <Route path="team" element={<AboutTeam />} />
                            <Route path="goal" element={<AboutGoal />} />
                        </Route>

                        <Route path="/books" element={<BookIndex />} />
                        <Route path="/books/edit" element={<BookEdit />} />
                        <Route path="/books/edit/:bookId" element={<BookEdit />} />
                        <Route path="/books/add/google" element={<GBookAdd />} />

                        <Route path="/books/:bookId" element={<BookDetails />}>
                            <Route path="/books/:bookId" element={<AddReview />} />
                        </Route>
                    </Routes>
                </main >
                <Footer fullname='Dan Weibren' />
                <UserMsg />
            </section>
        </Router>
    )
}