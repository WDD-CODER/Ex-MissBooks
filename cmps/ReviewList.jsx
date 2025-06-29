

import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
    if (!reviews) return
    else
        return (
            <div className="review-list ">
                {reviews.map(review => {
                    return (<ul className="review-preview box container" key={review.id}>
                        <ReviewPreview review={review} />
                        <section className="actions">
                            <button onClick={() => onRemoveReview(review.id)} className="delete">☠️</button>
                        </section>
                    </ul>)
                })}
            </div>
        )
}
