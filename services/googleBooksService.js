import { utilService } from "./util.service.js"
import { hardCode } from "../data/gBooks.js"

const APP_KEY = 'googleBooksDB'
export const googleBooksService = {
    getGBooks,
    formattedBookInfo,
    getGBooksModified,
}


function getGBooks(txt) {
    console.log('fetch from local')
    return Promise.resolve(hardCode.items)
}

function getGBooksModified(txt) {
    return getGBooks(txt).then(books => books.map(book => formattedBookInfo(book)))
}


function formattedBookInfo(googleBook) {
    const info = (!googleBook.volumeInfo) ? false : googleBook.volumeInfo
    const book = {
        id: googleBook.id || utilService.makeId(),
        title: info.title || 'Untitled',
        subtitle: info.subtitle || utilService.makeLorem(4),
        authors: info.authors,
        publishedDate: info.publishedDate || '',
        description: info.description || utilService.makeLorem(20),
        pageCount: info.pageCount || utilService.getRandomIntInclusive(20, 600),
        categories: info.categories,
        thumbnail: (info.imageLinks && info.imageLinks.thumbnail) ? info.imageLinks.thumbnail : `BooksImages/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: info.language || 'en',
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}



