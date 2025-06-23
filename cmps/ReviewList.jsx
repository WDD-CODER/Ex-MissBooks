

import { ReviewPreview } from "./ReviewPreview.jsx"

const { Link } = ReactRouterDOM
export function ReviewList({ reviews, onRemoveReview }) {
if (!reviews) return console.log('!reviews', !reviews)
    else
    return (
        <div className="review-list ">
            {reviews.map(review => {
                return (<ul className="review-preview container" key={review.reviewId}>
                    <ReviewPreview review={review} />
                    <section className="review-list actions">
                        {/* <Link to={`/books`}><button onClick={()=> onRemoveReview(review.id)} className="delate">☠️</button></Link> */}
                        {/* <Link to={`/books`}><button onClick={} className="edit">✍️</button></Link> */}
                    </section>
                </ul>)
            })}
        </div>
    )
}
