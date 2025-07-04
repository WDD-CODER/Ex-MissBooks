import { BookPreview } from '../cmps/BookPreview.jsx'

const { Link } = ReactRouterDOM
export function BookList({ books, onSelect, selector = '' }) {
    const buttonContext = (selector === "google") ? 'Add' : 'Remove'

    return (
        <ul className={`books-list box container ${selector} `}>
            {!books.length && <li className={'book-preview-container box  one-only container'}>
                No Books Found
            </li>
            }
            {books.map(book =>
                <li className={`book-preview-container ${selector}`} key={book.id}>
                    <BookPreview book={book} />
                    <section className='actions'>
                        <button className={buttonContext} onClick={() => onSelect(book.id)}>{buttonContext}</button>
                        {!selector && <Link to={`/books/${book.id}`}><button className="details">Details</button></Link>}
                    </section>
                </li>
            )}
        </ul>
    )
}