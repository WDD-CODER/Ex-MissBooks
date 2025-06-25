
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { appService } from '../services/books.service.js'
import { utilService } from '../services/util.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { googleBooksService } from '../services/googleBooksService.js'
import { GoogleBookList } from '../cmps/GoogleBookList.jsx'
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    const sample_books = [
        {
            id: "nBuA0hmspdMC", title: "Effective JavaScript", authors: ["David Herman"],
            publishedDate: "2012-11-26", pageCount: 231,
            listPrice: { amount: '50', currencyCode: 'USD', isOnSale: 'False' }
        },
        {
            id: "wVDCjwEACAAJ", title: "Effective Javascript", authors: ["David Herman"],
            publishedDate: "2016-03-08", pageCount: 228,
            listPrice: { amount: '60', currencyCode: 'USD', isOnSale: 'False' }
        },
        {
            id: "qBiEjwEACAAJ", title: "Effective JavaScript", authors: [],
            "publishedDate": "2013", "pageCount": 206,
            listPrice: { amount: '20', currencyCode: 'USD', isOnSale: 'true' }
        },
        {
            id: "L55nEQAAQBAJ", title: "Efficient JavaScript wit Grunt", authors: ["Richard Johnson"],
            publishedDate: "2025-06-20", pageCount: 288,
            listPrice: { amount: '44', currencyCode: 'USD', isOnSale: 'False' }
        },
        {
            id: "KnbVEAAAQBAJ", title: "Mastering Javascript", authors: ["Cybellium"],
            publishedDate: "2023-09-06", pageCount: 239,
            listPrice: { amount: '910', currencyCode: 'USD', isOnSale: 'true' }
        },
    ]

    const [GoogleBooks, setGoogleBooks] = useState()
    const [books, setBooks] = useState()
    const [filterBy, setFilterBy] = useState(appService.getDefaultFilter())
    let intervalId


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

    function onAddGoogleBooks(book) {
        console.log("🚀 ~ onAddGoogleBooks ~ book:", book)
        appService.addGoogleBooks(book)
            .then(books => {
                console.log("🚀 ~ onAddGoogleBooks ~ books:", books)
                setBooks(books)
                setGoogleBooks('')
            })
    }

    function onSearchGoogleBook(txt) {
        const books = appService.getHardCoddedGoogleBooks()
        setGoogleBooks(books.items)
        
        // clearTimeout(intervalId)
        // intervalId = setTimeout(() => {
            // const curHardBooks = appService.getHardCoddedGoogleBooks()
            // googleBooksService.getGoogleBookFromApi(txt)
        //     .then(books => {
        //             console.log("🚀 ~ intervalId=setTimeout ~ books:", books)
        //             // const { items } = data
        //             // setGoogleBooks(curHardBooks)
        //             // console.log('res', res)
        //             setGoogleBooks(books)
        //         })
        // }, 600)
    }


    if (!books) return <div className='loading'>Loading...</div>

    const curList = (books) ? 'Books ' : 'Google Books '

    return (
        <section className="books-index container">
            <BookFilter setFilterBy={setFilterBy} defaultFilter={filterBy} />
            <input onChange={onSearchGoogleBook} type="text" placeholder='Search for books' />

            <Link to={'/books/edit'}><button className="add">Add Book</button></Link>
            {/* {!GoogleBooks && <button onClick={() => setGoogleBooks(true)} className="add">Add Book From Google</button>} */}
            {GoogleBooks && <button onClick={() => setGoogleBooks('')} className="add">Back To Gallery</button>}
            <h1>{curList} Gallery </h1>
            {!GoogleBooks && <BookList books={books} onRemoveBook={onRemoveBook} />}
            {GoogleBooks && <GoogleBookList books={GoogleBooks} onAdd={onAddGoogleBooks} />}
        </section>
    )
}