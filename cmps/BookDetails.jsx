
export function BookDetails({ book, onRemoveBook, onBack }) {
  const { thumbnail, title, subtitle, pageCount, publishedDate, language, categories, listPrice } = book

  function ReadingRate() {
    if (pageCount > 500) return 'Serious Reading ' + pageCount + ' pages'
    if (pageCount > 200) return 'Descent Reading ' + pageCount + ' pages'
    if (pageCount < 100) return 'Light Reading ' + pageCount + ' pages'
  }

  function isNewPublish() {
    return  (new Date().getFullYear() - publishedDateN   < 10 ) ? 'New' : 'Vintage' 
  }

  return (
    <article className="book-details grid container">
      <figure className="cover-img">
        <img src={thumbnail} alt={`Cover of ${book.title}`} />
      </figure>

      <section className="main-info">
        <header>
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
        </header>

        <ul className="meta">
          <li><strong>Language:</strong> {language}</li>
          <li><strong>Pages: {ReadingRate()}</strong></li>
          <li><strong>Published At:</strong> {publishedDate}</li>
          <li><strong>Old Or New?:</strong> {isNewPublish()}</li>
          <li><strong>Categories:</strong> {categories}</li>
        </ul>

        <p className="description">{book.description}</p>

        <p className="price">
          <strong>{listPrice.amount} {listPrice.currencyCode}</strong>
          {listPrice.isOnSale && <span className="sale"> On Sale!</span>}
        </p>

        <div className="actions">
          <button className="remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
          <button className="select" onClick={() => onBack()}>Back To Gallery</button>
        </div>

      </section>
    </article>

  )

}
