import { appService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {

    const [book, setBook] = useState()
    const { bookId } = useParams()
    const navigate = useNavigate()

    const addOrEditCmp = (!bookId) ? '' : bookId

    useEffect(() => {
        loadBook()
    }, [])

    useEffect(() => {
        if (book) onFireModal()
    }, [book])

    function loadBook() {
        if (!bookId) return setBook(appService.createEmptyBook())
        else appService.get(bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => showErrorMsg('Problem loading book'))
    }


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
        }).catch(() => {
            navigate(`/books/${addOrEditCmp}`)
            showErrorMsg('Book was not saved! Problem saving in swal modal')
        })
    }


    function onSaveBook(book) {
        const addOrEditStr = (!bookId) ? 'Wonderful. Add a new book!' : 'Wonderful. Book was edited!'
        appService.save(book)
            .then(book => {
                showSuccessMsg(addOrEditStr)
                navigate(`/books/${book.id}`)
            })
            .catch(() => {
                navigate(`/books/${addOrEditCmp}`)
                showErrorMsg('Problem Saving books in storage')
            })
    }

    if (!book) return <div className='loading'>Loading...</div>

    return (<div className="swal-modal"></div>)

}