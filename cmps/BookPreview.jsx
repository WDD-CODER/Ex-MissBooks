

export function BookPreview({ book }) {

    return (
        <article className="book-preview grid container">
            <header>
                <h1>BookTitle <br /> {book.title}</h1>
                <h2>{book.subtitle}</h2>
            </header>
            <p className="price">
                <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
                {book.listPrice.isOnSale && <span className="sale"> On Sale!</span>}
            </p>
            <figure className="img">
                <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
            </figure>
            <p className="description">{book.description}</p>            
        </article>
    )

}