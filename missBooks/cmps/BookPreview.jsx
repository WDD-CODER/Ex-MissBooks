

export function BookPreview({ book, onRemoveBook , onSelectBook }) {

    return (
        <article className="book-preview grid place-center container">
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
            
            <div className="actions">
                <button className="remove" onClick={() => onRemoveBook(book.id)}>X</button>
                <button className="select" onClick={() => onSelectBook(book)}>Select</button>
            </div>
        </article>
    )

}