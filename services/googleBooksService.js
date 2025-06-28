import { utilService } from "./util.service.js"
import { appService } from "./books.service.js"
import { storageService } from "./async-storage.service.js"
import { hardCode } from "../data/gBooks.js"
import { showErrorMsg, showSuccessMsg } from "./event-bus.service.js"
const APP_KEY = 'googleBooksDB'
export const googleBooksService = {
    getGBooks,
    formattedBookInfo,
    getGBooksModified,
}


function getGBooks(txt) {
    console.log('fetch from api')
    const googleBookApi = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`
    return fetch(googleBookApi)
        .then(res => res.json())
        .then(res => {
            if (!res.items) return showErrorMsg('sorry no book of this search have been found Try again')
            else {
                showSuccessMsg("Yes, it's done! Books are waiting for you")
                return res.items
            }
        })
        .catch(err => {
            console.log('err', err)
            showErrorMsg('Something went wrong while fetching Google Books')
        })
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



