import { appService } from '../services/books.service.js'
import { utilService } from '../services/util.service.js'
import { BookPreview } from './BookPreview.jsx'
import { GoogleBookPreview } from './GoogleBookPreview.jsx'

export function GoogleBookList({books}) {

console.log("🚀 ~ GoogleBookList ~ books:", books)

    function onSearch(txt) {
        setTimeout(() => { searchFor(txt) }, 500)
    }

    function searchFor({target}) {
        console.log("🚀 ~ searchFor ~ txt:", target.value)
    }

    return (
        <ul className="Google-list container">
            <input onChange={onSearch} type="text" placeholder='Search for books' />
            {books.map(book =>
                <li className='Google-preview-container' key={book.id}>
                    <GoogleBookPreview book={book} />
                    {/* <section className='actions'> */}
                    <button className="add" onClick={() => onAddBook(book.id)}>➕</button>
                    {/* </section> */}
                </li>
            )}
        </ul>
    )
}