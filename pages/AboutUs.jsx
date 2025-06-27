import { LongTxt } from "../cmps/LongTxt.jsx"
import { utilService } from "../services/util.service.js"

const { Outlet, Link } = ReactRouterDOM
const { useState } = React
console.log("🚀 ~ Outlet:", Outlet)

export function AboutUs() {
    const [activeSection, setActiveSection] = useState()

    
    return (
        <section className="about grid place-items">
            <h1>AboutUS</h1>
            <LongTxt txt={utilService.makeLorem(200)} />
            <Outlet />
            <Link to="team"> <button>Show About The Team</button></Link>
            <Link to="goal"> <button>Show Us The Golden Goal!</button></Link>
        </section>
    )
}