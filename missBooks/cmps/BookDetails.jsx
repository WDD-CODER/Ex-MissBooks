
export function BookDetails({ book, onRemoveBook, onSelectBook }) {

  return (
    <article className="book-details grid container">
      <figure className="cover-img">
        <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
      </figure>

      <section className="main-info">
        <header>
          <h1 className="title">{book.title}</h1>
          <h2 className="subtitle">{book.subtitle}</h2>
          <p className="authors">By: {book.authors}</p>
        </header>

        <ul className="meta">
          <li><strong>Language:</strong> {book.language}</li>
          <li><strong>Pages:</strong> {book.pageCount}</li>
          <li><strong>Published:</strong> {book.publishedDate}</li>
          <li><strong>Categories:</strong> {book.categories}</li>
        </ul>


        <p className="description">{book.description}</p>

        <div className="actions">
          <button className="remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
          <button className="select" onClick={() => onSelectBook(book)}>Back To Gallery</button>
        </div>
      </section>
    </article>

  )

}
