console.log('hello from app.js')

// DOM SELECTORS
const navBar = document.querySelector('#navBar')
const navLinks = document.querySelectorAll('.navLink')
const views = document.querySelectorAll('.section')
const mainHeader = document.querySelector('#mainHeader')
const homePage = document.querySelector('#homePage')
const booksContainer = document.querySelector('#booksContainer')
const bookContainer = document.querySelector('#bookContainer')
const editBookForm = document.querySelector('#editBookForm')
const newBookForm = document.querySelector('#newBookForm')
const deleteBtn = document.querySelector('#deleteBtn')

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

// GET /books/:id
async function getBook(url,id) {
    let res = await fetch(`${url}/${id}`)
    let data = await res.json().then((data) => {
        displayBookDetails(data)
    })
}

// POST /books
async function postBook(bodyInfo) {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyInfo)
    })
    console.log(res, 'POST RES')
}

// PUT /books/:id
async function editBook(id, bodyInfo) {
    console.log(id, bodyInfo, 'inside editBook')
    let res = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyInfo)
    })
    console.log(res, 'PUT res')
}

// DELETE /books/:id
async function deleteBook(id) {
    let res = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    console.log(res)
}



// FILL IN <main> when we click 'See All Books'
function displayBooks(booksData) {
    console.log('we got data', booksData)
    let index=0;
    mainHeader.innerHTML = 'All Books in Library'
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
            hideSections()
            clearMains()
            bookContainer.classList.remove('hidden')
            getBook(url, bookID)
        })
    }
}

function displayBookDetails(bookData) {
    console.log(bookData, 'single book data')
    mainHeader.innerHTML = `${bookData.title} Details`

    const bookGridContainer = document.createElement('div')
    bookGridContainer.setAttribute('id', 'bookGridContainer')
    bookContainer.append(bookGridContainer)

    const details = document.createElement('div')
    details.setAttribute('id', 'details')
    details.classList.add('detailsGrid')
    bookGridContainer.append(details)

    const detailImg = document.createElement('div')
    detailImg.classList.add('detailsGrid')
    bookGridContainer.append(detailImg)

    const bookTitle = document.createElement('h3')
    bookTitle.classList.add('bookTitle')
    bookTitle.innerHTML = `Title:  ${bookData.title}`
    details.append(bookTitle)

    const bookAuthor = document.createElement('p')
    bookAuthor.classList.add('bookAuthor')
    bookAuthor.innerHTML = `Author:  ${bookData.author}`
    details.append(bookAuthor)

    const releaseDate = document.createElement('p')
    releaseDate.classList.add('releaseDate')
    releaseDate.innerHTML = `Released: ${bookData.release_date}`
    details.append(releaseDate)

    const bookCover = document.createElement('img')
    bookCover.classList.add('bookCover')
    bookCover.setAttribute('src', bookData.image)
    detailImg.append(bookCover)

    const editBtn = document.createElement('button')
    editBtn.classList.add('editBtn')
    editBtn.innerHTML = "Edit Book"
    bookGridContainer.append(editBtn)

    const btn = document.querySelector('.editBtn')
    btn.addEventListener('click', () => {
        hideSections()
        editBookForm.classList.remove('hidden')
        populateEditForm(bookData)
    })
}

function populateEditForm(bookData) {
    const editFormInputs = document.querySelectorAll('.editFormInput')
    editFormInputs[0].value = bookData.title
    editFormInputs[1].value = bookData.author
    editFormInputs[2].value = bookData.release_date
    editFormInputs[3].value = bookData.image

    editBookForm.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event, 'form sumbit')
        const title = editFormInputs[0].value
        const author = editFormInputs[1].value
        const release_date = editFormInputs[2].value
        const image = editFormInputs[3].value

        const bodyInfo = {
            title: title,
            author: author,
            release_date: release_date,
            image: image
        }
        
        console.log(bodyInfo, 'bodyInfo')
        editBook(bookData.id, bodyInfo)
        goHome()
    })
    deleteBtn.addEventListener('click', (event) => {
        console.log(event, 'delete event')
        event.preventDefault() // stops form from creating 'submit' event
        const answer = confirm('Are you sure you want to delete this book?')
        if(answer === true) {
            deleteBook(bookData.id)
            goHome()
        } else {
            console.log('Your book is safe.')
        }
    })
}

newBookForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newFormInputs = document.querySelectorAll('.newFormInput')

    const title = newFormInputs[0].value
    const author = newFormInputs[1].value
    const release_date = newFormInputs[2].value
    const image = newFormInputs[3].value

    const bodyInfo = {
        title: title,
        author: author,
        release_date: release_date,
        image: image
    }

    postBook(bodyInfo)
    goHome()
})

// EVENT LISTENERS
for(let navLink of navLinks) {
    navLink.addEventListener('click', (event) => {
        const target = event.target.innerHTML
        hideSections()
        clearMains()
        if(target === 'Home') {
            goHome()
        } else if(target === 'See All Books') {
            getBooks(url)
            booksContainer.classList.remove('hidden')
        } else if(target === 'Add a New Book') {
            mainHeader.innerHTML = 'Add a New Book'
            newBookForm.classList.remove('hidden')
        }
    })
}

// REUSABLE FUNCTIONS
function hideSections() {
    for(let view of views) {
        view.classList.add('hidden')
    }
}

function clearMains() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }
}

function goHome() {
    hideSections()
    mainHeader.innerHTML = 'WELCOME TO OUR API LIBRARY!'
    homePage.classList.remove('hidden')
}