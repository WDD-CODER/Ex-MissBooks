
import { ReviewPreview } from "./ReviewPreview.jsx"

const { Link } = ReactRouterDOM
export function ReviewList({ book }) {
    return (
        <div className="review-list ">
            {book.reviews.map(review => {
                return (<ul className="review-preview container" key={review.reviewId}>
                    <ReviewPreview review={review} />
                    <section className="review-list actions">
                        <Link to={`/books/${book.id}`}><button className="delate">☠️</button></Link>
                        <Link to={`/books/${book.id}`}><button className="edit">✍️</button></Link>
                    </section>
                </ul>)
            })}
        </div>
    )
}
