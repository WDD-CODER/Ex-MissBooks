import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { showSuccessMsg, showErrorMsg } from './event-bus.service.js'

const APP_KEY = 'MissBooksDB'
_createBooks()

export const appService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getDefaultFilter,
    onAddReview,
    getEmptyReview,
    createEmptyBook,
    // addGoogleBooks,
}

// List

function query(filterBy = {}) {
    return storageService.query(APP_KEY)
        .then(books => {
            if (filterBy.text) {
                const regExp = new RegExp(filterBy.text, 'i')
                books = books.filter(book =>
                    regExp.test(book.title)
                    || book.categories.includes(filterBy.text)
                    || book.authors.includes(filterBy.text)
                    || regExp.test(book.description)
                )
            }

            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }

            return books
        })
        .catch(err => {
            showErrorMsg('Failed loading books')
            console.log(err)
        })
}

// Delete
function remove(bookId) {
    return storageService.remove(APP_KEY, bookId)
}



// Read
function get(bookId) {
    return storageService.get(APP_KEY, bookId)
        .then(_setNextPrevBookId)
        .catch(err => {
            console.log('err', err)
            showErrorMsg(" Couldn't find book ")
        })
}
function getDefaultFilter() {
    return { text: '', maxPrice: '' }
}

function getNextBookId(bookId) {
    return storageService.query(APP_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}


// Create

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}


function save(book) {
    if (book.id) {
        console.log("🚀 ~ save ~ book.id:", book.id)
        return storageService.put(APP_KEY, book)
    } else {
        return storageService.post(APP_KEY, book)
    }
}


function getEmptyBook(title = '', category = []) {
    return {
        title,
        category
    }
}

function getEmptyReview(fullname = '', rate = '', date = '') {
    return {
        fullname: '',
        rate: '',
        readAt: '',
        value: '',
        id: utilService.makeId()
    }
} 

function onAddReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (book.reviews) {
                const bookReviews = book.reviews
                const bookReviewIdx = bookReviews.findIndex(r => { r.reviewId === review.reviewId })
                if (bookReviewIdx < 0) {
                    showSuccessMsg('Book review added')
                    book.reviews.push(review)
                } else {
                    showSuccessMsg('Book review updated')
                    book.reviews[bookReviewIdx] = review
                }
            } else {
                showSuccessMsg('Book review array added')
                book.reviews = [review]
            }
            return save(book)
        })
}

// function addGoogleBooks(book) {
//     return Promise.resolve((book) =>{ resolve(book)})
//         .then(book => saveGoogleBook(book))
// }


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

// Helpers / Init
function _createBooks() {
    let books = utilService.loadFromStorage(APP_KEY)
    if (!books || !books.length) _createDemoBooks()
}

function _createDemoBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `./assets/BooksImages/${i + 1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500), currencyCode: "EUR", isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    utilService.saveToStorage(APP_KEY, books)
}
