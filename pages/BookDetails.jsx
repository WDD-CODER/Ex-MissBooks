
import { BookPreview } from "../cmps/BookPreview.jsx"
import { appService } from "../services/books.service.js"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useParams, Link, Outlet, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

  const { bookId } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(appService.getEmptyBook())
  const { language, publishedDate, categories, authors, pageCount } = book

  useEffect(() => {
    appService.get(bookId)
      .then(setBook)
  }, [bookId]
  )

  function onRemoveReview(reviewId) {
    const newBook = { ...book, reviews: book.reviews.filter(review => review.id !== reviewId) }
    appService.save(newBook)
      .then(() => {
        setBook(newBook)
        showSuccessMsg('Review removed with success')
      })
      .catch(err =>{
        console.log('err', err)
        showErrorMsg('Failed removing book')})
  }

  function switchToNextOrPrevBook({ target }) {
    const moveTo = (target.className === 'next-book') ? 'Next Book' : ' Previous Book'
    const nextOrPrevBook = (moveTo === 'Next Book') ? book.nextBookId : book.prevBookId
    appService.get(nextOrPrevBook)
      .then(book => {
        navigate(`/books/${book.id}`)
        showSuccessMsg(` Passing to ${moveTo}`)
      })
      .catch(err => {
        console.log('err', err)
        showErrorMsg(`Fail switching to ${moveTo}`)
      })
  }


  function ReadingRate() {
    if (pageCount > 500) return 'Serious Reading '
    if (pageCount > 200) return 'Descent Reading '
    if (pageCount < 100) return 'Light Reading '
  }

  function isNewPublish() {
    return (new Date().getFullYear() - publishedDate < 10) ? 'New' : 'Vintage'
  }
  if (!book.title) return <div className='loading'>Loading...</div>
  return (
    <article className="book-details container">
      <BookPreview className="book-preview" book={book} />

      <section className="actions">
        <button onClick={switchToNextOrPrevBook} className="prev-book">Previous Page</button>
        <Link to={`/books/edit/${book.id}`}><button className="edit">Edit Book</button></Link>
        <Link to={'/books'}> <button>Back To Gallery</button></Link>
        <button onClick={switchToNextOrPrevBook} className="next-book">Next Page</button>
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
        <Outlet context={{ setBook }} />
      </div>


      <section className="reviews">
        {book.reviews && <ReviewList onRemoveReview={onRemoveReview} reviews={book.reviews} />}
      </section>

    </article>

  )

}
