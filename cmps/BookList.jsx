import { BookPreview } from '../cmps/BookPreview.jsx'

const { Link } = ReactRouterDOM
export function BookList({ books, onSelect, selector = '' }) {
    const buttonContext = (selector === "google") ? 'Add' : 'Remove'
    return (
        <ul className={`books-list ${selector} container`}>
            {books.map(book =>
                <li  key={book.id}>
                    <div className={`book-preview-container ${selector}`}>
                        <BookPreview book={book} />
                        <section className='actions'>
                            <button className={buttonContext} onClick={() => onSelect(book.id)}>{buttonContext}</button>
                            {!selector && <Link to={`/books/${book.id}`}><button className="details">Details</button></Link>}
                        </section>
                    </div>
                </li>
            )}
        </ul>
    )
}