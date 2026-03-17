const express = require('express');
const app = express()
const fs = require("fs");
const path = require("path");

const connection = require('./config/db')
const userSchema = require('./model/userSchema')

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public/"))
app.use(express.json())
app.set("view engine", "ejs");

const multer = require('multer')

const storage = multer.diskStorage({
    destination: "public/upload/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/saveform', upload.single('userProfile'), async (req, res) => {
    try {
        const { name, email, password, username } = req.body
        const userProfile = req.file?.filename ?? ""
        const result = new userSchema({ name, email, password, username, userProfile })
        await result.save()
        res.redirect('/dashboard')
        console.log("Successfully Added");
    } catch (error) {
        console.log(error);
    }
})

app.get('/', (req, res) => {
    res.render('form.ejs')
})

app.get('/dashboard', async (req, res) => {
    try {
        const result = await userSchema.find();
        const obj = { data: result }
        res.render('dashboard.ejs', obj);
    } catch (error) {
        console.log(error);
    }
})

app.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await userSchema.findById(id);

        if (user.userProfile) {
            const imagePath = path.join(__dirname, "public/upload", user.userProfile);

            try {
                await fs.promises.unlink(imagePath);
            } catch (err) {
                console.log("Image not found or already deleted");
            }
        }

        await userSchema.findByIdAndDelete(id)
        res.redirect('/dashboard')
        console.log("Successfully Deleted");
    } catch (error) {
        console.log(error);
    }
})

app.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userSchema.findById(id)
        const obj = { data: result }
        res.render('editForm.ejs', obj)
    } catch (error) {
        console.log(error);
    }
})

app.post('/editdata/:id', upload.single('userProfile'), async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userSchema.findById(id);

        if (user.userProfile) {
            const imagePath = path.join(__dirname, "public/upload", user.userProfile);

            try {
                await fs.promises.unlink(imagePath);
            } catch (err) {
                console.log("Image not found or already deleted");
            }
        }

        const { name, email, phone, password, username } = req.body
        const userProfile = req.file?.filename ?? ""

        await userSchema.findByIdAndUpdate(id, { name, email, password, username, userProfile });
        res.redirect('/dashboard')
        console.log("Successfully Data Updated");

    } catch (error) {
        console.log(error);
    }
})


const PORT = 3001
const HOST = '127.0.0.1'
app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
})