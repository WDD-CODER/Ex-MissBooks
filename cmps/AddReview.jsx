
import { appService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useRef, useState, useEffect } = React
const { useParams, useOutletContext } = ReactRouterDOM


export function AddReview() {

    const curDate = new Date().toLocaleDateString('en-GB')
    const emptyReview = { reviewId: utilService.makeId(), fullname: '', rate: '', date: curDate }

    const { setBook } = useOutletContext()
    const { bookId } = useParams()
    const rateRef = useRef()
    const fullNameRef = useRef()

    const [review, setReview] = useState(emptyReview)
    const [bookToEdit, setBookToEdit] = useState()

    useEffect(() => {
        appService.get(bookId)
            .then(setBookToEdit)
    }, [])

    useEffect(() => {
        setBookToEdit(bookToEdit => ({ ...bookToEdit, reviews: [{ ...review, review }] }))
    }, [review])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        if (!review.rate) return showErrorMsg('Review not saved! No rating entered')
        appService.addReview(bookId, review).then(savedBooks => setBook(savedBooks))
        setReview(emptyReview)
    }

    function onDelateReview(ev) {
        ev.preventDefault()
        showSuccessMsg('Book review discarded')
        setReview(emptyReview)
    }

    const reviewValue = (!review.fullname) ? '' : review.fullname
    const reviewRate = (!review.rate) ? 1 : review.rate

    return (
        <form onSubmit={onSaveReview} className="add-review container">
            <h1> Add a review </h1>
            <time dateTime="rate-time"> Current date : {curDate}</time>
            <section className="inputs">
                <label htmlFor="fullname"></label>
                <input onChange={handleChange} ref={fullNameRef} className="full-name" type="text" id="fullname" name="fullname" value={reviewValue} placeholder="What's your name?" />
                <label htmlFor="rate">{utilService.getStars(review.rate)}</label>
                <input onChange={handleChange} ref={rateRef} type="range" id="rate" name="rate" min={1} max={5} value={reviewRate} placeholder="So how do you rate this book from 1-5? " />
            </section>
            <section className="actions">
                <button className="add-review">Save</button>
                <button onClick={onDelateReview} className="Delate-review">Discard</button>
            </section>
        </form>
    )
}
