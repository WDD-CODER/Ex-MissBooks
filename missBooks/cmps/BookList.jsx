import { BookPreview } from '../cmps/BookPreview.jsx'


export function BookList({books, removeBook}) {

    return (
        <div className="books-list grid container">   
            {books.map(book => {
                return <BookPreview onRemoveBook={removeBook} key={book.title} book={book} />
            })}
        </div>
    )
}