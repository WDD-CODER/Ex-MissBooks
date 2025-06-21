
import { appService } from "../services/books.service.js"
const { useNavigate, useParams } = ReactRouterDOM
const { useRef, useState } = React

export function AddReview() {
    const curDate = new Date().toLocaleDateString('en-GB')


    const { bookId } = useParams()
    const rateRef = useRef()
    const fullNameRef = useRef()
    const navigate = useNavigate()

    const [rate, setRate] = useState()
    console.log("🚀 ~ AddReview ~ rate:", rate)

    function showValue() {
        setRate(rateRef.current.value)
    }
    function getStars() {
        return '⭐'.repeat(rate);
    }

    function onSaveReview(ev) {
        if (!rate) show 
        ev.preventDefault()
        appService.get(bookId)
            .then(book => {
                console.log("🚀 ~ onSaveReview ~ book:", book)
                book.rate = { rate }
            })
    }

    function onRemoveReview(ev) {
        ev.preventDefault()
        fullNameRef.current.value = ''
        rateRef.current.value = 0
        setRate(0)
        // appService.save(ev.target)
    }

    return (
        <form onSubmit={onSaveReview} className="add-review container">
            <h1> Add a review </h1>
            <time dateTime="rate-time"> Current date : {curDate}</time>
            <section className="inputs">
                <label htmlFor="full-name"></label>
                <input ref={fullNameRef} className="full-name" type="text" id="full-name" name="full-name" placeholder=" What's your name?" />
                <label htmlFor="rate">{getStars()}</label>
                <input ref={rateRef} onChange={showValue} type="range" id="rate" name="rate" min={0} max={5} value={(rate) ? rate : 0} placeholder=" So how do you rate this book from 1-5? " />
            </section>
            <section className="actions">
                <button className="add-review">Save</button>
                <button onClick={onRemoveReview} className="remove-review">Discard</button>
            </section>
        </form>
    )
}
