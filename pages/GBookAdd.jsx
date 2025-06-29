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
    console.log("🚀 ~ GBookAdd ~ searchTerm:", searchTerm)
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
            .catch(err => {
                console.log("Error:", err)
                showErrorMsg('Failed getting formatted books')
            }
            )
    }
    // לא הסתדרתי עם הדיבאונס
    function onSearchGoogleBook() {
        console.log("🚀 ~ searchGoogleBook ~ searchTerm:", searchTerm)
        if (!searchTerm) return showErrorMsg(' No search term ')
        return googleBooksService.getGBooks(searchTerm)
            .then(setGoogleBooks)
            .then(() => onShowBooks())
            .catch(err => {
                console.log("Error:", err)
                showErrorMsg('Failed getting formatted books')
            })

    }

    // function onSetSearchTerm(res) {
    //     setSearchTerm(res)
    //     onSearchGoogleBook()
    // }

    function onShowBooks() {
        // if (!googleBooks) return showErrorMsg(' Nothing searched for yet')
        googleBooksService.getGBooksModified(searchTerm)
            .then(res => setModBook(res))
            .catch(err => showErrorMsg(' Problem showing loaded books '))
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
                    {/* <button onClick={() => onSearchGoogleBook()}>Search</button> */}
                    <Link to={'/books'}> <button>Back To Gallery</button></Link>
                    {/* {googleBooks && !modBooks && <button onClick={onShowBooks}>Show Books To Choose From</button>} */}
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