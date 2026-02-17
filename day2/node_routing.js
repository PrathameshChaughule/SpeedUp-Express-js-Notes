const http = require('http')
const url = require('url')

let menu = `<ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>`

const app = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" })
    const urlData = url.parse(req.url)

    if (urlData.pathname === "/") {
        res.write(menu + "<h1>HOME</h1>")
    } else if (urlData.pathname === "/about") {
        res.write(menu + "<h1>ABOUT</h1>")
    } else if (urlData.pathname === "/contact") {
        res.write(menu + "<h1>CONTACT</h1>")
    } else {
        res.write("<h1>404 Found</h1><li><a href='/'>Back to Home</a></li>")
    }
    res.end()
})


const PORT = 3000
const HOST = "127.0.0.1"

app.listen(PORT, HOST, () => {
    console.log(`Server running http://${HOST}:${PORT}`)
})