

import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
if (!reviews) return console.log('!no reviews', reviews)
    else
    return (
        <div className="review-list ">
            {reviews.map(review => {
                return (<ul className="review-preview container" key={review.id}>
                    <ReviewPreview review={review} />
                    <section className="actions">
                        <button onClick={()=> onRemoveReview(review.id)} className="delate">☠️</button>
                    </section>
                </ul>)
            })}
        </div>
    )
}
