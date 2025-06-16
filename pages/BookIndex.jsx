
import { appService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState()
    const [selectedBook, setSelectedBook] = useState()
    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        appService.query()
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

    function setFilterBy(res) {
        console.log(res)
    }


    // function showDetails(book) {
    //     if (!selectedBook) setSelectedBook(book)
    //     else {
    //         if (selectedBook.id === book.id) setSelectedBook(false)
    //         else setSelectedBook(book)
    //     }
    // }

    if (!books) return <div className='loading'>Loading...</div>

    return (
        <section className="books-index grid">
            <h1>Books Gallery </h1>
            <BookFilter
             setFilterBy={setFilterBy} 
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