import express from "express";
import {PORT, MONGO_URI} from "./config.js"
import mongoose from "mongoose";
import {Book} from "./model/books.js"

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello bitch<h1/>')
})

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`)
})

app.post('/books', async (req, res) => {
    res.send('hello world post')
})

mongoose
.connect(MONGO_URI).then(() => {
    console.log('app connected to database')
})
.catch((error) => {
    console.log(error)
})