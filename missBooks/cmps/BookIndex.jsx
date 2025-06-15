
import { appService } from '../services/missBooks.service.js'
// import { utilService } from '../services/util.service.js'
import { BookCard } from './BookCard.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState([])
    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        appService.query()
            .then(setBooks)
            .catch('Failed loading books')
    }

    return (
        <section className="books-index grid">
                {books.map(book => {
                  return  <BookCard key={book.title} book={book} />
                })}
        </section>
    )
}