import express from "express";
import {PORT, MONGO_URI} from "./config.js"
import mongoose from "mongoose";
import {Book} from "./model/books.js"


const app = express()

// must addes express.json to read json
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello bitch<h1/>')
})

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`)
})

app.post('/books', async (req, res) => {
    try{
        if(!req.body.title || !req.body.genre || !req.body.author){
            return res.status(400).send({message: "Please add all required fields: title, genre, and author"})
        }

        const newBook = {
            title: req.body.title,
            genre: req.body.genre,
            author: req.body.author
        }
        
        const book = await Book.create(newBook)
        res.status(201).json(book)
    } catch(error){
        res.status(500).send({message: error.message})
    }
})

mongoose
.connect(MONGO_URI).then(() => {
    console.log('app connected to database')
})
.catch((error) => {
    console.log(error)
})