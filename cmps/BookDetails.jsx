
export function BookDetails({ book, onRemoveBook, onBack }) {
  const { thumbnail, title, subtitle, authors, pageCount } = book

  function ReadingRate() {
    if (pageCount > 500) return 'Serious Reading ' + pageCount + ' pages'
    if (pageCount > 200) return 'Descent Reading ' + pageCount +' pages'
    if (pageCount < 100) return 'Light Reading ' + pageCount +' pages'
  }

    function isOldPublish() {
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
          <li><strong>Language:</strong> {book.language}</li>
          <li><strong>Pages: {ReadingRate()}</strong></li>
          <li><strong>Published:</strong> {book.publishedDate}</li>
          <li><strong>Categories:</strong> {book.categories}</li>
        </ul>

        <p className="description">{book.description}</p>

        <p className="price">
          <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
          {book.listPrice.isOnSale && <span className="sale"> On Sale!</span>}
        </p>

        <div className="actions">
          <button className="remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
          <button className="select" onClick={() => onBack()}>Back To Gallery</button>
        </div>

      </section>
    </article>

  )

}
