const express = require('express')
const app = express()
app.get("/",((req,res)=>{
    // res.writeHead(200,{"content-type": "text/html"})
    // res.write("ABC")
    // res.end()

    res.send("Hiii")
}))

const PORT = 3001
const HOST = "127.0.0.1"
app.listen(PORT, HOST, ()=>{
    console.log(`Server Running on http://${HOST}:${PORT}`)
})