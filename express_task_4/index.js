const express = require('express')
const connection = require('./config/db')
const userSchema = require('./model/userSchema')

const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.render('register.ejs')
})

app.post('/saveform', async (req, res)=>{
    try {
        const result = new userSchema(req.body)
        await result.save()
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
    }
})

app.get('/dashboard', async (req, res)=>{
    try {
        const result = await userSchema.find()
        res.render('dashboard',{data:result})
    } catch (error) {
        console.log(error);
    }
})


app.get('/delete/:id', async (req, res)=>{
    try {
        const id = req.params.id
        await userSchema.findByIdAndDelete(id)
    } catch (error) {
        
    }
})


const PORT = 3000
const HOST = '127.0.0.1'
app.listen(PORT, HOST, ()=>{
    console.log(`http://${HOST}:${PORT}`);
})