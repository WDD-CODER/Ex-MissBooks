
import { googleBooksService } from "../services/googleBooksService.js";
import { LongTxt } from "../cmps/LongTxt.jsx";

export function GoogleBookPreview({ book }) {
    console.log("🚀 ~ GoogleBookPreview ~ book:", book)
    const {title  ,description ,imageLinks} = book.volumeInfo
    const img = (!imageLinks) ? imageLinks : "./assets/BooksImages/noImg.png"
    console.log("🚀 ~ GoogleBookPreview ~ img:", img)
    return (
        <article className="book-preview container">
            <header><h1>BookTitle <br /> {title}</h1></header>

            {/* <p className={(listPrice.amount > 150) ? 'price red' : 'price green'}>
                <strong>{listPrice.amount} {listPrice.currencyCode}</strong>
                {listPrice.isOnSale && <img className="sale img" src="./assets/BooksImages/onSale.png" alt="on-sale-img" />}
            </p> */}

            <figure className="img"><img src={img} alt={`Cover of ${title}`} /></figure>
            <LongTxt className="description" txt={description} />
        </article>
    )

}