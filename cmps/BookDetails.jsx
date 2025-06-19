
import { BookPreview } from "./BookPreview.jsx"
import { appService } from "../services/books.service.js"


const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React
export function BookDetails() {

  const [book, setBook] = useState(appService.getEmptyBook())
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    appService.get(params.bookId)
      .then(setBook)
  }, []
  )

  function onBack() {
    navigate('/books')
  }

    if (!book.title) return <div className='loading'>Loading...</div>
  const { language, publishedDate, categories, authors, pageCount } = book

  function ReadingRate() {
    if (pageCount > 500) return 'Serious Reading ' + pageCount + ' pages'
    if (pageCount > 200) return 'Descent Reading ' + pageCount + ' pages'
    if (pageCount < 100) return 'Light Reading ' + pageCount + ' pages'
  }

  function isNewPublish() {
    return (new Date().getFullYear() - publishedDate < 10) ? 'New' : 'Vintage'
  }

  return (
    <article className="book-details grid container">
      <BookPreview className="book-preview" book={book} />
      <section className="main-info">
        <ul className="meta">
          <li><strong>Language:</strong> {language}</li>
          <li><strong>Pages: {ReadingRate()}</strong></li>
          <li><strong>Published At:</strong> {publishedDate}</li>
          <li><strong>Old Or New?:</strong> {isNewPublish()}</li>
          <li><strong>Categories:</strong> {categories}</li>
          <li><strong>Written By :</strong> {authors}</li>
        </ul>
        <div className="actions">
          <button onClick={() => onBack()} className="back">Back To Gallery</button>
        </div>
      </section>
    </article>

  )

}
