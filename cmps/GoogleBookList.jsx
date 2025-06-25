import { utilService } from '../services/util.service.js'
import { GoogleBookPreview } from './GoogleBookPreview.jsx'

const {Link} = React

export function GoogleBookList({ books ,onAdd}) {

    
    return (
        <ul className="books-list container">
            {books.map(book =>
                <li className='book-preview-container' key={book.id}>
                    <GoogleBookPreview book={book} />
                    <section className='actions'>
                    <button className="add" onClick={() => onAdd(book)}>Add Book To Gallery</button>
                    </section>
                </li>
            )}
        </ul>
    )
}