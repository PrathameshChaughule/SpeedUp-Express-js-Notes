const express = require('express');
const app = express()

const connection = require('./config/db')
const userSchema = require('./model/userSchema')

app.use(express.urlencoded({extended:true}))
app.use(express.static("public/"))
app.use(express.json())


const multer = require('multer')

const storage = multer.diskStorage({
    destination: "public/upload/",
    filename: (req, file, cb)=>{
        cb(null, Date.now()+"_"+file.originalname)
    }
})

const upload = multer({storage: storage})

app.post('/saveform', upload.single('userProfile'), async (req, res)=>{
    try {
        const { name, email, phone, password } = req.body
        const userProfile = req.file.filename
        const result = new userSchema({name, email, phone, password, userProfile})
        await result.save()
        res.send(result)
        console.log("Successfully Added");
    } catch (error) {
        console.log(error);
    }
})

app.get('/',(req, res)=>{
    res.render('form.ejs')
})

const PORT = 3001
const HOST = '127.0.0.1'
app.listen(PORT, HOST, ()=>{
    console.log(`http://${HOST}:${PORT}`);
})