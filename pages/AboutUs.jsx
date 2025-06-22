import { LongTxt } from "../cmps/LongTxt.jsx"
import { utilService } from "../services/util.service.js"

export function AboutUs() {
    return (
        <section className="about grid place-items">
            <h1>AboutUS</h1>
            <LongTxt txt={utilService.makeLorem(200)}/>
        </section>
    )
}