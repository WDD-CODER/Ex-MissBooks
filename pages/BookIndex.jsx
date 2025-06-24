
import { appService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { utilService } from '../services/util.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { GoogleBookList } from '../cmps/GoogleBookList.jsx'

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

   const sample_books = [
        { id: "nBuA0hmspdMC", title: "Effective JavaScript", authors: ["David Herman"], publishedDate: "2012-11-26", pageCount: 231, onSale: 'False', },
        { id: "wVDCjwEACAAJ", title: "Effective Javascript", authors: ["David Herman"], publishedDate: "2016-03-08", pageCount: 228, onSale: 'False', },
        { id: "qBiEjwEACAAJ", title: "Effective JavaScript", authors: [], "publishedDate": "2013", "pageCount": 206, onSale: 'False', },
        { id: "L55nEQAAQBAJ", title: "Efficient JavaScript wit Grunt", authors: ["Richard Johnson"], publishedDate: "2025-06-20", pageCount: 288, onSale: 'False', },
        { id: "KnbVEAAAQBAJ", title: "Mastering Javascript", authors: ["Cybellium"], publishedDate: "2023-09-06", pageCount: 239, onSale: 'False', },
    ]
    if (!books) return <div className='loading'>Loading...</div>

    return (
        <section className="books-index container">
            <h1>Books Gallery </h1>
            <BookFilter setFilterBy={setFilterBy} defaultFilter={filterBy} />
            <Link to={'/books/edit'}><button className="add">Add Book</button></Link>
            {/* <BookList books={books} onRemoveBook={onRemoveBook} /> */}
            <GoogleBookList books={sample_books} onRemoveBook={onRemoveBook} />
        </section>
    )
}