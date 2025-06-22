
import { appService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


const { useNavigate, useParams } = ReactRouterDOM
const { useRef, useState, useEffect } = React

export function AddReview() {
    const curDate = new Date().toLocaleDateString('en-GB')
    const emptyReview = { fullName: '', rate: '', date: new Date().toLocaleDateString('en-GB') }

    const { bookId } = useParams()
    const rateRef = useRef()
    const fullNameRef = useRef()
    const navigate = useNavigate()

    const [bookToReview, setBookToReview] = useState()
    const [review, setReview] = useState(emptyReview)

    useEffect(() => {
        if (!bookToReview) {
            appService.get(bookId)
                .then(setBookToReview)
                .catch(err => {
                    showErrorMsg('Problem geting books')
                    console.log('err', err)
                })
        }
        else setBookToReview(prevBookToEdit => ({ ...prevBookToEdit, reviews: review }))
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


    function getStars() {
        return '⭐'.repeat(review.rate);
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        if (!review.rate) return showErrorMsg('Review not saved! No rating interd')
        appService.save(bookToReview)
            .then(() => {
                showSuccessMsg(`Book review saved!`)
                navigate('/books')
            })
            .catch(err => {
                showErrorMsg('Problem saving book review')
                console.log(err)
            })
    }

    function onRemoveReview(ev) {
        ev.preventDefault()
        setReview(emptyReview)
    }
    const reviewValue = (!review.fullName) ? '' : review.fullName
    const reviewRate = (!review.rate) ? 1 : review.rate
    return (
        <form onSubmit={onSaveReview} className="add-review container">
            <h1> Add a review </h1>
            <time dateTime="rate-time"> Current date : {curDate}</time>
            <section className="inputs">
                <label htmlFor="fullName"></label>
                <input onChange={handleChange} ref={fullNameRef} className="full-name" type="text" id="fullName" name="fullName" value={reviewValue} placeholder=" What's your name?" />
                <label htmlFor="rate">{getStars()}</label>
                <input onChange={handleChange} ref={rateRef} type="range" id="rate" name="rate" min={1} max={5} value={reviewRate} placeholder=" So how do you rate this book from 1-5? " />
            </section>
            <section className="actions">
                <button className="add-review">Save</button>
                <button onClick={onRemoveReview} className="remove-review">Discard</button>
            </section>
        </form>
    )
}
