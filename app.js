console.log('hello from app.js')

// DOM SELECTORS
const navBar = document.querySelector('#navBar')
const allBooksLink = document.querySelector('#allBooksLink')
const booksContainer = document.querySelector('#booksContainer')
const newBookForm = document.querySelector('#newBookForm')
const booksOverview = []

const url = 'http://myapi-profstream.herokuapp.com/api/c4a880/books'

// GET /books
async function getBooks(url) {
    try {
        let res = await fetch(url)
        let data = await res.json().then((data) => {
            displayBooks(data)
        })
    } catch (error) {
        console.log(error)
    }
}
// getBooks(url)

// GET /books/:id
async function getBook(url,id) {
    let res = await fetch(`${url}/${id}`)
    let data = await res.json()
    console.log(data, "singleBookData")
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
    let index=0;
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
        console.log(newBook)

        const detailBtn = document.createElement('button')
        detailBtn.classList.add('detailBtn')
        detailBtn.setAttribute ("id", `b${index}` )
        detailBtn.innerHTML = "See Details"
        newBook.append(detailBtn)

        index++
    }
    const detailBtns = document.querySelectorAll('.detailBtn')

    bookDetails(detailBtns, booksData)


}

function bookDetails(buttons, booksData){
    for (let button of buttons){
       button.addEventListener("click", (event) => {
        console.log(event.target.id)
        const btnId = event.target.id
        const btnArr = btnId.split("")
        const bookIndex = btnArr[1]
        const book = booksData[bookIndex]
        const bookID = book["id"]
        getBook(url, bookID)
    //    const pathOrigin = window.location.origin
    //     window.location.href= `${pathOrigin}/views/book.html`

       })
    }
}









// EVENT LISTENERS
allBooksLink.addEventListener('click', getBooks(url))
