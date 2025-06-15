import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookPreview } from '../cmps/BookPreview.jsx'


export function BookList({books, onRemoveBook }) {
    return (
        <div className="books-list grid container">   
            {books.map(book => {
                return <BookPreview onRemoveBook={onRemoveBook} key={book.title} book={book} />
            })}
        </div>
    )
}