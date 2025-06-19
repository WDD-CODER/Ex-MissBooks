import { BookPreview } from '../cmps/BookPreview.jsx'

const {Link} = ReactRouterDOM
export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="books-list grid container">
            <Link to={'/books/edit'}><button className="add">Add Book</button></Link>
            {books.map(book =>
                <li className='book-preview-container' key={book.id}>
                    <BookPreview book={book} />
                    <section className='actions'>
                        <button className="remove" onClick={() => onRemoveBook(book.id)}>Delate</button>
                        <Link to={`/books/${book.id}`}><button className="select">Details</button></Link>
                    </section>
                </li>
            )}
        </ul>
    )
}