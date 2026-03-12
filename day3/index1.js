const express = require('express')
const app = express()

app.get('/',(req, res)=>{
    res.send("Hiii")
})

const HOST = '127.0.0.1'
const PORT = 3000
app.listen(PORT, HOST, ()=>{
    console.log(`Server on http://${HOST}:${PORT}`);
})