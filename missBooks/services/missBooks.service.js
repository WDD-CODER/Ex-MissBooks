import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const APP_KEY = 'MissBooksDB'
_createBooks()

export const appService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy

}

function query() {
    return storageService.query(APP_KEY)
        .then(books => {
            if (books.length) {
                console.log('from storage')
                return books
            }
            else
                _createDemoBooks()
            return utilService.loadFromStorage(APP_KEY)
        })
        .catch(err => console.log('Failed loading book', err))
}

function get(bookId) {
    return storageService.get(APP_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(APP_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(APP_KEY, book)
    } else {
        return storageService.post(APP_KEY, book)
    }
}

function getEmptyBook(bookName = '', category = []) {
    return {
        id: '',
        bookName,
        category
    }
}

function getFilterBy() {
    return { txt: '', category: [] }
}

function getNextBookId(bookId) {
    return storageService.query(APP_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(APP_KEY)
    if (!books || !books.length) _createDemoBooks()
}

function _createDemoBooks() {
    console.log('_createDemoBooks from scratch!')

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    utilService.saveToStorage(APP_KEY, books)
}
