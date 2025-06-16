import { BookPreview } from '../cmps/BookPreview.jsx'


export function BookList({ books, onRemoveBook, onSelectBook }) {
    return (
        <ul className="books-list grid container">
            {books.map(book =>
                <li className='book-Preview-container' key={book.id}>
                    <BookPreview book={book} />
                    <section className='actions'>
                        <button className="remove" onClick={() => onRemoveBook(book.id)}>
                            Delate
                        </button>
                        <button className="select" onClick={() => onSelectBook(book)}>
                            Details
                        </button>
                    </section>
                </li>
            )}
        </ul>
    )
}