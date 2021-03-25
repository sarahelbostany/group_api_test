console.log('hello from app.js')

// DOM SELECTORS
const navBar = document.querySelector('#navBar')
const allBooksLink = document.querySelector('#allBooksLink')
const booksContainer = document.querySelector('#booksContainer')
const newBookForm = document.querySelector('#newBookForm')

const url = 'http://myapi-profstream.herokuapp.com/api/c4a880/books'

// GET /books
async function getBooks(url) {
    let res = await fetch(url)
    let data = await res.json()
    console.log(data)
}
// getBooks(url)

// GET /books/:id
async function getBook(url,id) {
    let res = await fetch(`${url}/${id}`)
    let data = await res.json()
    console.log(data)
    diplayBooks(data)
}

// POST /books
async function postBook(url, method) {
    let res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            // title: ,
            // author: ,
            // release_date: ,
            // image: ,
        }
    })
    console.log(res)
}

// PUT /books/:id
async function editBook(url, id, method) {
    let res = await fetch(`${url}/${id}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            // title: ,
            // author: ,
            // release_date: ,
            // image: ,
        }
    })
    console.log(res)
}

// DELETE /books/:id
async function deleteBook(url, id, method) {
    let res = await fetch(`${url}/${id}`, {
        method: method
    })
    console.log(res)
}

// FILL IN <main> ON allBooks.html
function displayBooks(booksData) {
    console.log('we got data', booksData)
    for(let book of booksData) {
        const newBook = document.createElement('section')
        newBook.classList.add('bookOverview')
        booksContainer.append(newBook)

        const bookTitle = document.createElement('h2')
        bookTitle.classList.add('bookTitle')
        bookTitle.innerHTML = book.title
        newBook.append(bookTitle)

        const bookAuthor = document.createElement('p')
        bookAuthor.classList.add('bookAuthor')
        bookAuthor.innerHTML = book.author
        newBook.append(bookAuthor)
    }
}

// EVENT LISTENERS
allBooksLink.addEventListener('click', getBooks(url))