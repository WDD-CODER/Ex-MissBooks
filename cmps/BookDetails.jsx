
import { BookPreview } from "./BookPreview.jsx"
export function BookDetails({ book,onRemoveBook, onBack }) {
  const {pageCount, publishedDate, language, categories,authors  } = book
  console.log("🚀 ~ BookDetails ~ authors:", authors)



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
          <button className="remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
          <button className="select" onClick={() => onBack()}>Back To Gallery</button>
        </div>
      </section>
    </article>

  )

}
