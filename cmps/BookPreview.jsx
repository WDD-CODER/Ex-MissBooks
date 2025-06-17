import { LongTxt } from "../cmps/LongTxt.jsx";

export function BookPreview({ book }) {

    return (
        <article className="book-preview grid container">
            <header>
                <h1>BookTitle <br /> {book.title}</h1>
                <h2>{book.subtitle}</h2>
            </header>
            <p className={(book.listPrice.amount > 150) ? 'price red' : 'price green'}>
                <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
                {book.listPrice.isOnSale && <img className="sale img" src="./assets/BooksImages/onSale.png" alt="on-sale-img" />}
            </p>
            <figure className="img">
                <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
            </figure>
            <LongTxt  className="description" txt={book.description}/>
        </article>
    )

}