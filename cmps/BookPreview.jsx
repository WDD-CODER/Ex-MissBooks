import { LongTxt } from "../cmps/LongTxt.jsx";

export function BookPreview({ book }) {
    const { thumbnail, title, listPrice, description } = book
    // listPrice = {
    //     amount: listPrice.amount || 'Missing Info',
    //     currencyCode: listPrice.currencyCode || 'Missing Info',
    //     amount: listPrice.isOnSale || 'Missing Info',
    // }
    var noImg = (!thumbnail) ? thumbnail : "./assets/BooksImages/noImg.png"

    return (
        <article className="book-preview container">
            <header><h1>BookTitle <br /> {title}</h1></header>

            <p className={(listPrice.amount > 150) ? 'price red' : 'price green'}>
                <strong>{listPrice.amount} {listPrice.currencyCode}</strong>
                {listPrice.isOnSale && <img className="sale img" src="./assets/BooksImages/onSale.png" alt="on-sale-img" />}
            </p>

            <figure className="img"><img src={thumbnail} alt={`Cover of ${title}`} /></figure>
            <LongTxt className="description" txt={description} />
        </article>
    )

}