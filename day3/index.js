const express = require('express')
const app = express()

app.use(express.static("public/"))

app.get('/', (req, res) => {
    // res.send("Hiii")
    let obj = {
        name: "Prathamesh",
        rollNo: 21
    }
    res.render('home.ejs', { data: obj })
})

app.get('/about', (req, res) => {
    res.send(`<h1>ABOUT</h1><img src="sl.png" alt="Solo Leveling"/>`)
})

app.use((req, res) => {
    res.send('<h1>404 Page not Found</h1>')
})

const HOST = "127.0.0.1"
const PORT = 3000
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})
