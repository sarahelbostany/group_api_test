console.log('hello from app.js')


const url = 'http://myapi-profstream.herokuapp.com/api/c4a880/books'

async function getData(url) {
    let res = await fetch(url)
    let data = await res.json()
    console.log(data)
}
getData(url)