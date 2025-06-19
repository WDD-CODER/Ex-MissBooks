import { appService } from "../services/books.service.js"
import { utilService } from "../services/util.service.js"

const { useNavigate } = ReactRouterDOM
const { useState} = React

export function BookEdit() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

    const emptyBook = {
        title: '',
        subtitle: utilService.makeLorem(4),
        authors: [
            utilService.makeLorem(1)
        ],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `./assets/BooksImages/noImg.png`,
        language: "en",
        listPrice: {
            amount: 0,
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    const navigate = useNavigate()

    const [book, setBook] = useState(emptyBook)
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
                value = +value
                setBook(prevBook => ({ ...prevBook, [field]: { ...prevBook[field] , amount: value }}))
                return
                
                case 'checkbox':
                    value = target.checked
                    setBook(prevBook => ({ ...prevBook, [field]: { ...prevBook[field] , isOnSale: value }}))
                    return
                
        }
        setBook(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        appService.save(book)
            .then(navigate('/books'))
            .catch(err => console.log(' Problem Saving books', err))
    }

    return (
        <form className="container" onSubmit={onSaveBook}>
            <label htmlFor="text"> What's the books title ?</label>
            <input onChange={handleChange} id="text" name="title" type="text" />

            <label htmlFor="number"> What's the books price ?</label>
            <input onChange={handleChange} id="number" name="listPrice" type="number"   min={0} />

            <label htmlFor="isOnSale"> Its On Sale?</label>
            <input onChange={handleChange} id="isOnSale" name="listPrice" type="checkbox"  min={0}  />

            <button>Save Book</button>
        </form>

    )

}