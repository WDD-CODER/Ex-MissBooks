
import { appService } from '../services/missBooks.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState()
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
    function showDetails(book) {
        if (!selectedBook) setSelectedBook(book)
        else {
            if (selectedBook.id === book.id) setSelectedBook(false)
            else setSelectedBook(book)
        }
    }

    return (
        <section className="books-index grid">
            {/* <div className="books-container"> */}
                <h1>Books Gallery </h1>
                <BookFilter setFilterBy={setFilterBy} />
                {!selectedBook && <BookList books={books} onRemoveBook={removeBook} setFilterBy={setFilterBy} onSelectBook={showDetails} />}
                {selectedBook && <BookDetails book={selectedBook} onRemoveBook={removeBook} onSelectBook={showDetails} />}
            {/* </div> */}
        </section>
    )
}