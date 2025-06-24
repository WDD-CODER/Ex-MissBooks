

import { ReviewPreview } from "./ReviewPreview.jsx"

const { Link } = ReactRouterDOM
export function ReviewList({ reviews, onRemoveReview }) {
if (!reviews) return console.log('!reviews', !reviews)
    else
    return (
        <div className="review-list ">
            {reviews.map(review => {
                return (<ul className="review-preview container" key={review.id}>
                    <ReviewPreview review={review} />
                    <section className="review-list actions">
                        <button onClick={()=> onRemoveReview(review.id)} className="delate">☠️</button>
                    </section>
                </ul>)
            })}
        </div>
    )
}
