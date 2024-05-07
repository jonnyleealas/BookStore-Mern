import express, { response } from "express";
import {PORT, MONGO_URI} from "./config.js"
import mongoose from "mongoose";
import {Book} from "./model/books.js"





const app = express()

// must addes express.json to read json
app.use(express.json())

// routes

app.get('/books', async (req, res) => {
    const allBooks = await Book.find({})
    res.status(201).json({allBooks})
})

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`)
})

app.get('/books/:id', async (req, res) => {
    try {
        const {params:{id: bookId}} = req
        console.log(req)
        const book = await Book.findOne({_id:bookId})
         res.status(200).json({
            book
        })
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.put('/books/:id', async (req, res) => {

    try{
    if(!req.body.title || !req.body.author || !req.body.genre){
        return res.status(400).send({message: 'send all required fields: title, author, publisher'})
    }

    const {id} = req.params

    const result = await Book.findByIdAndUpdate(id, req.body)

    if(!result){
        return res.status(404).json({message: 'book not found'})
    } 
    return res.status(200).json({result})
    
} catch (error){
        res.status(500).send({message: error.message})
    }

})

app.delete('/books/:id', async (req, res) => {
    try {
        const {params:{id: bookId}} = req
        const book = await Book.findOneAndDelete({_id:bookId})
        if(!book) {
            return response.status(200).json({message: 'book not found'})
        }

        return res.status(200).send({message: 'book deleted successfully'})
    } catch (error) {
        response.status(500).send({message: error.message})
    }
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