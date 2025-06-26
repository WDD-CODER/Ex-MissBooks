import { googleBooksService } from '../services/googleBooksService.js'
import { appService } from '../services/books.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookList } from '../cmps/BookList.jsx'

const { useState } = React
const { useNavigate } = ReactRouterDOM

export function GBookAdd() {

    const [modBooks, SetModBook] = useState(null)
    const [googleBooks, SetGoogleBooks] = useState(null)
    const [searchTerm, SetSearchTerm] = useState(null)

    const navigate = useNavigate()

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
        if (!searchTerm) return showErrorMsg(' No search term ')
        return googleBooksService.getGBooks(searchTerm)
            .then(SetGoogleBooks)
            .catch(err => {
                console.log("Error:", err)
                showErrorMsg('Failed getting formatted books')
            })

    }

    function onShowBooks() {
        if (!googleBooks) return showErrorMsg(' Nothing searched for yet')
        googleBooksService.getGBooksModified(searchTerm)
            .then(res => {
                console.log('res', res)

                SetModBook(res)
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg(' Problem showing loaded books ')
            })
    }

    return (
        <section className='books-index container'>
            <h1>Search For</h1>
            <input onChange={ev => SetSearchTerm(ev.target.value)}
                name='searchTerm'
                type='text'
                placeholder='Search for books' />

            <button onClick={() => onSearchGoogleBook()}>Search</button>
            <button onClick={onShowBooks}>Show Books To Choose From</button>

            {googleBooks &&
                <React.Fragment>
                    <label htmlFor="book-select">Choose a Book:</label>
                    <select onChange={ev => onSelectBook(ev.target.value)} id='book-select' name="book-select">
                        <option value="">Please choose an option</option>
                        {googleBooks.map(book => <option key={book.id} value={book.id}>{book.volumeInfo.title}</option>)}
                    </select>

                    {modBooks && <BookList books={modBooks} onSelect={onSelectBook} />}
                </React.Fragment>}

        </section>
    )

}