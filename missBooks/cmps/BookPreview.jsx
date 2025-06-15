

export function BookPreview({ book, onRemoveBook }) {
    return (
        <article className="book-preview grid place-center container">
            <header>
                <h1>BookTitle <br /> {book.title}</h1>
                <h2>{book.subtitle}</h2>
            </header>

            {/* <section className="book-info">
                <ul>
                    <li>Language: {book.language}</li>
                    <li>Pages: {book.pageCount}</li>
                    <li>Published: {book.publishedDate}</li>
                </ul>
            </section> */}
            <p className="price">
                <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
                {book.listPrice.isOnSale && <span> On Sale!</span>}
            </p>
            <figure className="img">
                <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
            </figure>
            {/* <ul className="book-meta">
                <li className="authors">Authors: {book.authors}</li>
                <li className="categories">categories: {book.categories}</li>
            </ul> */}
            <p className="description">{book.description}</p>

            <button className="remove" onClick={() => onRemoveBook(book.id)}>X</button>
        </article>
    )
    preview
}