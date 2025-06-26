import { BookPreview } from '../cmps/BookPreview.jsx'

const {Link} = ReactRouterDOM
export function BookList({ books, onSelect }) {
    return (
        <ul className="books-list container">
            {books.map(book =>
                <li className='book-preview-container' key={book.id}>
                    <BookPreview book={book} />
                    <section className='actions'>
                        <button className="remove" onClick={() => onSelect(book.id)}>Delate</button>
                        <Link to={`/books/${book.id}`}><button className="select">Details</button></Link>
                    </section>
                </li>
            )}
        </ul>
    )
}