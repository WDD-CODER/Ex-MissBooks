
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { appService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [GoogleBooks, setGoogleBooks] = useState()
    const [books, setBooks] = useState()
    const [filterBy, setFilterBy] = useState(appService.getDefaultFilter())
    console.log("🚀 ~ BookIndex ~ filterBy:", filterBy)
    const onSetFilterBy = useRef(utilService.debounce(setFilterBy,500)).current

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
                setBooks(books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                showErrorMsg('Failed removing book')
                console.log(err)
            })
    }

    if (!books) return <div className='loading'>Loading...</div>

    const curList = (books) ? 'Books ' : 'Google Books '
    const selector = (GoogleBooks) ? 'google' : ''
    return (
        <section className="books-index box container">
            <div className="main-actions-container">
                <BookFilter setFilterBy={onSetFilterBy} defaultFilter={filterBy} />
                <div className="actions">
                    <Link to={'/books/edit'}><button className="add">Add Book</button></Link>
                    <Link to={'/books/add/google'}><button className="add">Add Book From Google</button></Link>
                </div>
            </div>
            {GoogleBooks && <button onClick={() => setGoogleBooks('')} className="add">Back To Gallery</button>}
            <h1>{curList} Gallery </h1>
            <BookList books={books} onSelect={onRemoveBook} selector={selector} />
        </section>
    )
}