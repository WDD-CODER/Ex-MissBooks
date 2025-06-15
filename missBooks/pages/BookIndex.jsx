
import { appService } from '../services/missBooks.service.js'
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


    return (
        <section className="books-index grid">
            <h1>Books Gallery </h1>
            <BookList books={books} onRemoveBook={removeBook}/>
        </section>
    )
}