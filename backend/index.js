import express from "express";
import {PORT, MONGO_URI} from "./config.js"
import mongoose from "mongoose";
import books from './routes/books.js'





const app = express()

// must addes express.json to read json
app.use(express.json())

// routes
app.use('/books', books)

mongoose
.connect(MONGO_URI)
.then(() => {
    console.log('app connected to database')
    app.listen(PORT, () => {
        console.log(`app listening on port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})