import { BookPreview } from './BookPreview.jsx'
export function BookDetails({ book, onBack }) {

  return (
    <article className="book-details grid container">
      <BookPreview book={book} />
      <section className="main-info">
        <header>
          <h1 className="title">{book.title}</h1>
          <h2 className="subtitle">{book.subtitle}</h2>
        </header>

        <ul className="meta">
          <li><strong>Language:</strong> {book.language}</li>
          <li><strong>Pages:</strong> {book.pageCount}</li>
          <li><strong>Published:</strong> {book.publishedDate}</li>
        </ul>

        <section className=''>
          <ul>Categories: {book.categories.map(category => <li key={category}>{category}</li>)}</ul>
          <ul>authors: {book.authors.map(author => <li key={author}>{author}</li>)}</ul>
        </section>

        <p className="description">{book.description}</p>

        <section className="actions">
          <button className="remove" onClick={() => onRemoveBook(book.id)}>Delate</button>
          <button className="onBack" onClick={() => onBack()}>Back To Gallery</button>
        </section>

      </section>
    </article>

  )

}
