
import { appService } from '../services/missBooks.service.js'
// import { utilService } from '../services/util.service.js'
import { BookCard } from './BookCard.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState([])
    console.log("🚀 ~ BookIndex ~ books:", books)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        appService.query()
            .then(setBooks)
            .catch(err => console.log('Failed loading books', err))

    }

    function removeBook(bookId) {
        appService.remove(bookId)
            .then(() => setBooks(books.filter(books => books.id !== bookId)))
            .catch(err => console.log('Problems removing the book', err))
    }


    return (
        <section className="books-index grid">
            {books.map(book => {
                return <BookCard onRemoveBook={removeBook} key={book.title} book={book} />
            })}
        </section>
    )
}