
import { appService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React
const { useParams, useOutletContext } = ReactRouterDOM


export function AddReview() {


    const { setBook } = useOutletContext()
    const { bookId } = useParams()

    const [review, setReview] = useState(appService.getEmptyReview())
    const [bookToEdit, setBookToEdit] = useState()

    // useEffect(() => {
    // }, [])

    // useEffect(() => {
    //     console.log("🚀 ~ useEffect ~ review:", review)
    //     setBookToEdit(bookToEdit => ({ ...bookToEdit, reviews: [{ ...review, review }] }))
    // }, [review])

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
        ev.preventDefault()
        if (!review.rate || !review.fullname || !review.readAt) return showErrorMsg('Review not saved! Missing some info')
        appService.addReview(bookId, review)
            .then(savedBooks => {
                console.log('savedBooks', savedBooks)

                setBook(savedBooks)
                setReview(appService.getEmptyReview())
            })
    }

    function onDelateReview(ev) {
        ev.preventDefault()
        showSuccessMsg('Book review discarded')
        setReview(appService.getEmptyReview())
    }

    const reviewValue = (!review.fullname) ? '' : review.fullname
    const reviewRate = (!review.rate) ? 1 : review.rate
    const readAt = (!review.readAt) ? '' : review.readAt
    return (
        <form onSubmit={onSaveReview} className="add-review container">
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
                <button onClick={onDelateReview} className="Delate-review">Discard</button>
            </section>
        </form>
    )
}
