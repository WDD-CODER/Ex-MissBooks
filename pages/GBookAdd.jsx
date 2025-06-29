import { googleBooksService } from '../services/googleBooksService.js'
import { appService } from '../services/books.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { utilService } from '../services/util.service.js'

const { useState, useEffect, useRef } = React
const { useNavigate, Link } = ReactRouterDOM



export function GBookAdd() {

    const [modBooks, setModBook] = useState(null)
    const [googleBooks, setGoogleBooks] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const navigate = useNavigate()

    const onSearchTerm = useRef(utilService.debounce(setSearchTerm, 600)).current


    useEffect(() => {
        if (searchTerm) onSearchGoogleBook()
        if (googleBooks) onShowBooks()
    }, [searchTerm])

    function onSelectBook(bookId) {
        const bookToMod = googleBooks.find(book => book.id === bookId)
        const { id, ...book } = googleBooksService.formattedBookInfo(bookToMod)
        appService.save(book)
            .then(() => {
                showSuccessMsg('Book Saved With Success')
                navigate('/books')
            })
            .catch(() => showErrorMsg('Failed getting formatted books'))
    }
    function onSearchGoogleBook() {
        if (!searchTerm) showErrorMsg(' No search term ')
        return googleBooksService.getGBooks(searchTerm)
            .then(setGoogleBooks)
            .then(() => onShowBooks())
            .catch(() => showErrorMsg('Failed getting formatted books'))

    }

    function onShowBooks() {
        googleBooksService.getGBooksModified(searchTerm)
            .then(res => setModBook(res))
    }

    return (
        <section className='books-index container'>
            <div className="main-actions-container google box container">
                <h1>Search Control </h1>
                <input
                    onChange={ev => onSearchTerm(ev.target.value)}
                    name='searchTerm'
                    type='text'
                    placeholder='Search for books' />
                <div className="actions">
                    <Link to={'/books'}> <button>Back To Gallery</button></Link>
                </div>

                {googleBooks && <React.Fragment>
                    <label htmlFor="book-select"></label>
                    <select onChange={ev => onSelectBook(ev.target.value)} id='book-select' name="book-select">
                        <option value="">Please Choose A Book </option>
                        {googleBooks.map(book => <option key={book.id} value={book.id}>{book.volumeInfo.title}</option>)}
                    </select>
                </React.Fragment>
                }

            </div>
            <h1>Google Books</h1>
            {googleBooks &&
                <React.Fragment>
                    {modBooks && <BookList books={modBooks} onSelect={onSelectBook} selector='google' />}
                </React.Fragment>}


        </section>
    )

}