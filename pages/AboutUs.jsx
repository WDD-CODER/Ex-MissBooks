import { LongTxt } from "../cmps/LongTxt.jsx"
import { animateCSS } from "../services/util.service.js"

const { Outlet, Link, } = ReactRouterDOM
const { useState, useRef, useEffect } = React
export function AboutUs() {

    const refH1 = useRef()

    useEffect(() => {
        animateCSS(refH1.current, 'bounceInDown')
    }, [])

    const aboutTxt = "Miss Books is your smart companion for exploring and managing your reading journey. Easily track your favorite books, discover new titles, write reviews, and get personalized suggestions. Whether you're an avid reader or just getting started, Miss Books keeps everything organized and within reach — making it easier than ever to enjoy the stories you love."

    const [active, setActive] = useState()
    return (
        <section className="about container">
            <h1 ref={refH1} >AboutUS</h1>
            <LongTxt txt={aboutTxt} />
            <Outlet />
            <div className="actions">
                <Link to="team">
                    <button className={active === "team" ? "btn active" : "btn"}
                        onClick={() => setActive("team")}
                    >Show About The Team</button>
                </Link>
                <Link to="goal">
                    <button className={active === 'goal' ? "btn active" : "btn"}
                        onClick={() => setActive('goal')}
                    >Show Us The Golden Goal!</button>
                </Link>
            </div>
        </section >
    )
}