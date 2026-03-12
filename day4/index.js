const express = require('express')
const connection = require('./config/db')
const empSchema = require('./model/empSchema')

const app = express()
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('form.ejs')
})


app.post('/saveform', async (req, res) => {
    try {
        const result = new empSchema(req.body)
        await result.save()
        res.send("<h1>Registration Done</h1>")
    } catch (error) {
        console.log(error);
    }
})

app.get('/database', async (req, res) => {
    try {
        const result = await empSchema.find()
        res.render('database.ejs', { data: result })
    } catch (error) {
        console.log(error);
    }
})



const PORT = 3000
const HOST = '127.0.0.1'
app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
})