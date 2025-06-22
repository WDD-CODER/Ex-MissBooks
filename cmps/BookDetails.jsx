
import { BookPreview } from "./BookPreview.jsx"
import { appService } from "../services/books.service.js"
import { ReviewList } from "./ReviewList.jsx"

const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

  const params = useParams()
  const navigate = useNavigate()

  const [book, setBook] = useState(appService.getEmptyBook())
  const { language, publishedDate, categories, authors, pageCount } = book

  useEffect(() => {
    appService.get(params.bookId)
      .then(setBook)
  }, []
  )

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
        {book.reviews && <ReviewList book={book} />}
      </section>

    </article>

  )

}
