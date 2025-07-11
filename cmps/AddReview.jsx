
import { appService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useState, } = React
const { useParams, useOutletContext } = ReactRouterDOM


export function AddReview() {


    const { setBook } = useOutletContext()
    const { bookId } = useParams()

    const [review, setReview] = useState(appService.getEmptyReview())
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

            case 'datetime-local':
                value = target.value.split('T')[0]
                break
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        const { rate, fullname, readAt } = review
        if (!rate || !fullname || !readAt) return showErrorMsg('Review not saved! Missing some info')
        appService.onAddReview(bookId, review)
            .then(savedBooks => {
                setBook(savedBooks)
                setReview(appService.getEmptyReview())
            })
    }

    function onDiscardReview(ev) {
        showSuccessMsg('Book review discarded')

        setReview(appService.getEmptyReview())
    }

    const reviewValue = (!review.fullname) ? '' : review.fullname
    const reviewRate = (!review.rate) ? 1 : review.rate
    const reviewReadAt = (!review.readAt) ? 'yy/mm/dd' : review.readAt

    return (
        <form onSubmit={ev => {
            ev.preventDefault()
            onSaveReview()
        }} className="add-review box container">
            <h1> Add a review </h1>
            <section className="inputs">
                <label htmlFor="fullname"></label>
                <input onChange={handleChange} className="full-name" type="text" id="fullname" name="fullname" value={reviewValue} placeholder="What's your name?" />
                <label htmlFor="rate">{utilService.getStars(review.rate)}</label>
                <input onChange={handleChange} type="range" id="rate" name="rate" min={1} max={5} value={reviewRate} placeholder="So how do you rate this book from 1-5? " />
                <label htmlFor="readAt">read At</label>
                <input onChange={handleChange} type="datetime-local" id="read-at" name="readAt" />
            </section>
            <section className="actions">
                <button className="add-review">Save</button>
                <button onClick={ev => {
                    ev.preventDefault()
                    onDiscardReview()
                }} className="delete-review">Discard</button>
            </section>
        </form>
    )
}
