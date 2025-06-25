import { utilService } from "./util.service.js"
import { appService } from "./books.service.js"
import { storageService } from "./async-storage.service.js"
const APP_KEY = 'googleBooksDB'
export const googleBooksService = {
    getGoogleBookFromApi,
    formattedBookInfo,
}

function getGoogleBookFromApi(txt) {
    console.log('getGoogleBook Not Api')
    return appService.getHardCoddedGoogleBooks()
    // console.log('getGoogleBook from Api')
    // const googleBookApi = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`
    // return fetch(googleBookApi)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log("🚀 ~ getGoogleBookFromApi ~ data:", data)
    //         const books = Array.from(data.items).map(book => {
    //             console.log("🚀 ~ books ~ book:", book)
    //             return formattedBookInfo(book)
    //         })
    //         // const { items } = data
    //         // console.log("🚀 ~ getGoogleBook ~ items:", items)
    //         console.log("🚀 ~ getGoogleBookFromApi ~ books:", books)
    //         return books
    //     })
    //     .catch(err => {
    //         console.log('err', err)
    //         showErrorMsg('Problem loading googleBooks')
    //     })
}


function formattedBookInfo(googleBook) {
    const bookInfo = googleBook.volumeInfo
    return {
        id: googleBook.id || utilService.makeId(),
        title: bookInfo.title,
        authors: (book.authors) ? bookInfo.authors : ' Missing info ',
        thumbnail: (book.volumeInfo) ? bookInfo.imageLinks.thumbnail : ' Missing info ',
        publishedDate: (book.publishedDate) ? bookInfo.publishedDate : ' Missing info ',
        pageCount: bookInfo.pageCount,
        listPrice: (book.saleInfo) ? bookInfo.saleInfo : ' Missing info ',
    }
}



