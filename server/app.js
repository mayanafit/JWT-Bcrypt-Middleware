require('dotenv').config()
const express = require(`express`)
const routes = require(`../server/routes`)
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //body-parser format application/json
app.use(express.urlencoded({extended: true})) //body-parser e.g: from postman
app.use(routes) //direct to folder routes/index.js
app.get(`/`, (req, res) => {
    res.send(`hello world`)
})

app.listen(port, () => {
    console.log(`now we are open at ${port}`)
})