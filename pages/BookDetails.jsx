
import { BookPreview } from "../cmps/BookPreview.jsx"
import { appService } from "../services/books.service.js"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

  const { bookId } = useParams()
  const navigate = useNavigate()

  const [book, setBook] = useState(appService.getEmptyBook())
  const { language, publishedDate, categories, authors, pageCount } = book

  useEffect(() => {
    // if (!book.title) {
      appService.get(bookId)
        .then(setBook)
    // }
  }, []
  )

  function onRemoveReview(reviewId) {
    const reviews = book.reviews.filter(review => review.id !== reviewId)
    console.log("🚀 ~ onRemoveReview ~ reviews:", reviews)
    setBook(prevBook => (
      { ...prevBook, reviews: [...prevBook.reviews,] }
      
    ))

    // appService.remove(reviewId)
    //   .then(book => {
    //     console.log("🚀 ~ onRemoveReview ~ book:", book)
    //     showSuccessMsg('Review removed with success')
    //     setBook(book)
    //   })
    //   .catch(err => {
    //     showErrorMsg('Failed removing book')
    //     console.log(err)
    //   })
  }


  function ReadingRate() {
    if (pageCount > 500) return 'Serious Reading '
    if (pageCount > 200) return 'Descent Reading '
    if (pageCount < 100) return 'Light Reading '
  }

  function isNewPublish() {
    return (new Date().getFullYear() - publishedDate < 10) ? 'New' : 'Vintage'
  }

  console.log("🚀 ~ BookDetails ~ book:", book)
  if (!book.title) return <div className='loading'>Loading...</div>

  return (
    <article className="book-details container">
      <BookPreview className="book-preview" book={book} />

      <section className="actions">
        <Link to={`/books/edit/${book.id}`}><button className="edit">Edit Book</button></Link>
        <Link to={'/books'}> <button>Back To Gallery</button></Link>
      </section>

      <div className="add-info">
        <section className="main-info container">
          <h4>Book Info</h4>
          <ul className="meta">
            <li><strong>Language:</strong> {language}</li>
            <li><strong>Pages:</strong>  {ReadingRate()}</li>
            <li><strong>Pages Count:</strong> {pageCount}</li>
            <li><strong>Published At:</strong> {publishedDate}</li>
            <li><strong>Old Or New?:</strong> {isNewPublish()}</li>
            <li><strong>Categories:</strong> {categories}</li>
            <li><strong>Written By:</strong> {authors}</li>
          </ul>
        </section>
        {/* //למצוא פתרון טוב יותר זה לא הדרך!! */}
        <Outlet context={{ setBook }} />
      </div>


      <section className="reviews">
        {book.reviews && <ReviewList onRemoveReview={onRemoveReview} reviews={book.reviews} />}
      </section>

    </article>

  )

}
