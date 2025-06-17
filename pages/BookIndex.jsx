
import { appService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState()
    const [selectedBook, setSelectedBook] = useState()
    const [filterBy, setFilterBy] = useState(appService.getDefaultFilter())
    console.log("🚀 ~ BookIndex ~ filterBy:", filterBy)

    useEffect(() => {
        loadBooks(filterBy)
    }, [])

    function loadBooks(filterBy) {
        appService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('Failed loading books', err))

    }

    function onRemoveBook(bookId) {
        appService.remove(bookId)
            .then(() => {
                setSelectedBook(false)
                setBooks(books.filter(books => books.id !== bookId))
            })
            .catch(err => console.log('Problems removing the book', err))
    }

    function onSelectBook(book){
        setSelectedBook(book)
    }

    function SetFilterBy(res) {
        console.log(res)
        appService.getFilterBy()
        .then(res => console.log(res))
        .catch(err => console.log('problem seting filterBy', err))
    }

    if (!books) return <div className='loading'>Loading...</div>

    return (
        <section className="books-index grid">
            <h1>Books Gallery </h1>
            <BookFilter
             onSetFilterBy={SetFilterBy} 
             />

            {!selectedBook && 
            <BookList
             books={books} 
             onRemoveBook={onRemoveBook} 
             onSelectBook={onSelectBook} 
             />}

            {selectedBook && 
            <BookDetails
             book={selectedBook} 
             onRemoveBook={onRemoveBook} 
             onBack={() => setSelectedBook(null)} 
             />}


        </section>
    )
}