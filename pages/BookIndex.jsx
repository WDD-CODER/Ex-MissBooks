// import Swal from 'sweetalert2'

import { appService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React
const {Link} = ReactRouterDOM
export function BookIndex() {

    const [books, setBooks] = useState()
    const [filterBy, setFilterBy] = useState(appService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {

        appService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('Failed loading books', err))

    }

    function onRemoveBook(bookId) {

        appService.remove(bookId)
            .then(() => {
                setBooks(books.filter(books => books.id !== bookId))
            })
            .catch(err => console.log('Problems removing the book', err))
    }

    if (!books) return <div className='loading'>Loading...</div>

    return (
        <section className="books-index grid container">
            <h1>Books Gallery </h1>
            <BookFilter setFilterBy={setFilterBy} defaultFilter={filterBy} />
            <Link to={'/books/edit'}><button className="add">Add Book</button></Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}