import { appService } from "../services/books.service.js"
import { utilService } from "../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {

    const { bookId } = useParams()
    const [book, setBook] = useState(appService.getEmptyBook())
    const navigate = useNavigate()

    const addOrEditCmp = (!bookId) ? '' : bookId

    useEffect(() => {
        if (bookId) return loadBook()
        else createEmptyBook()
    }, [])

    function loadBook() {
        appService.get(bookId)
            .then(book => {
                setBook(book)
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Problem loading book')
            })
    }


    if (book.listPrice) onFireModal()
    function onFireModal() {
        var title = (!book.title) ? '' : book.title
        var price = (!book.listPrice.amount) ? "What's the price?" : book.listPrice.amount
        var onSale = (book.listPrice.isOnSale) ? (book.listPrice.isOnSale ? 'checked' : '') : ''

        Swal.fire({
            title: ` ${(!book.title) ? 'Create' : 'Add'} Book`,
            html: `
                  <input id="title" name="title" type="text" value="${title}" class="swal2-input" placeholder="what's the title?" />
                  <input id="price" name="listPrice" type="number" value="${price}" min={0} class="swal2-input" placeholder="what's the price?" />
                  <input id="sale" name="on-sale" type="checkbox" ${onSale} class="swal2-input"  />
            `,
            focusConfirm: true,
            confirmButtonText: 'Save Book',
            cancelButtonText: 'Discard',
            showCancelButton: true,
            customClass: { popup: 'custom-swal-class' },

            preConfirm: () => {
                const title = document.getElementById('title').value
                const price = document.getElementById('price').value
                const isOnSale = document.getElementById('sale').checked

                if (!title || !price) return swal.showValidationMessage('Please fill out all fields')
                return { title, price, isOnSale }
            }
        }).then(result => {
            if (result.isConfirmed) {
                const { title, price, isOnSale } = result.value
                var newBook = { ...book, title, listPrice: { ...book.listPrice, amount: price, isOnSale: isOnSale } }
                onSaveBook(newBook)
            }
            else {
                navigate(`/books/${addOrEditCmp}`)
                showErrorMsg('User canceled request',)
            }
        }).catch(err => {
            navigate(`/books/${addOrEditCmp}`)
            showErrorMsg('Book was not saved! Problem saving in swal modal')
            console.log(err)
        })
    }

    function createEmptyBook() {
        const categories = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

        const emptyBook = {
            title: '',
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [categories[utilService.getRandomIntInclusive(0, categories.length - 1)]],
            thumbnail: `./assets/BooksImages/noImg.png`,
            language: "en",
            listPrice: { amount: 0, currencyCode: "EUR", isOnSale: false }
        }
        return setBook(emptyBook)
    }

    function onSaveBook(book) {
        const addOrEditStr = (!bookId) ? 'Wonderful. Add a new book!' : 'Wonderful. Book was edit!'
        appService.save(book)
            .then(book => {
                showSuccessMsg(addOrEditStr)
                navigate(`/books/${book.id}`)
            })
            .catch(err => {
                navigate(`/books/${addOrEditCmp}`)
                showErrorMsg('Problem Saving books in storage')
                console.log(err)
            })
    }

    if (!book.title) return <div className='loading'>Loading...</div>

    return (<div className="swal-modal"></div>)

}