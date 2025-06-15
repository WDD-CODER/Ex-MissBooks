
import { appService } from '../services/missBooks.service.js'
// import { utilService } from '../services/util.service.js'
import { BookCard } from './BookCard.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState([])
    console.log("🚀 ~ BookIndex ~ books:", books)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        appService.query()
            .then(setBooks)
            .catch('Failed loading books')
    }

    return (
        <section className="BookIndex container">
            <div className='books container'>
                {books.map(book => {
                  return  <BookCard book={book} />
                })}
            </div>
        </section>
    )
}