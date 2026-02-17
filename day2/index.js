const express = require('express')
const app = express()

app.use(express.static("public"))

let menu = `<ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>`

app.get('/', (req, res) => {
    res.send(menu + `<h1>HOME</h1><img src="sl.png" alt="Solo Leveling"/>`)
})

app.get('/about', (req, res) => {
    res.send(menu + `<h1>ABOUT</h1>`)
})

app.get('/contact', (req, res) => {
    res.send(menu + `<h1>CONTACT</h1>`)
})

app.use((req, res) => {
    res.send(`<h1>404 Found</h1><li><a href='/'>Back to Home</a></li>`)
})

const PORT = 3000
const HOST = "127.0.0.1"
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})