import { LongTxt } from "../cmps/LongTxt.jsx";

export function BookPreview({ book }) {

    var img = (book.thumbnail) ? book.thumbnail : "./assets/BooksImages/noImg.png"
    return (
        <article className="book-preview box container">
            <header><h1><br /> {book.title}</h1></header>

            <section className={(book.listPrice.amount > 150) ?  'price red' : 'price green' }>
                <strong>{book.listPrice.amount} {book.listPrice.currencyCode}</strong>
                {book.listPrice.isOnSale && <img className="sale img" src="./assets/BooksImages/onSale.png" alt="on-sale-img" />}
            </section>

            <figure className="img"><img src={img} alt={`Cover of ${book.title}`} /></figure>
            <LongTxt className="description" txt={book.description} />
            
        </article>
    )

}