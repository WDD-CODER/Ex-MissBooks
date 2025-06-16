import { BookPreview } from '../cmps/BookPreview.jsx'


export function BookList({books, onRemoveBook, onSelectBook }) {
    return (
        <div className="books-list grid container">   
            {books.map(book => {
                return <BookPreview  key={book.title} onRemoveBook={onRemoveBook} book={book} onSelectBook={onSelectBook} />
            })}
        </div>
    )
}