
import { appService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState()
    const [filterBy, setFilterBy] = useState(appService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        appService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                showErrorMsg('Failed loading books')
                console.log(err)
            })
    }

    function onRemoveBook(bookId) {
        appService.remove(bookId)
            .then(() => {
                showSuccessMsg('Book removed with success')
                setBooks(books.filter(books => books.id !== bookId))
            })
            .catch(err => {
                showErrorMsg('Failed removing book')
                console.log(err)
            })
    }

    if (!books) return <div className='loading'>Loading...</div>

    return (
        <section className="books-index container">
            <h1>Books Gallery </h1>
            <BookFilter setFilterBy={setFilterBy} defaultFilter={filterBy} />
            <Link to={'/books/edit'}><button className="add">Add Book</button></Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}