
import { appService } from '../services/missBooks.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'

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

    function setFilterBy(res) {
        console.log(res)
    }

    return (
        <section className="books-index grid">
            <h1>Books Gallery </h1>
            <BookFilter setFilterBy={setFilterBy} />
            <BookList books={books} onRemoveBook={removeBook} setFilterBy={setFilterBy} />
        </section>
    )
}