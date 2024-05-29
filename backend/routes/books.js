import express from 'express'
import { Book } from '../model/books.js'

const router = express.Router()


router.get('/', async (req, res) => {
    const allBooks = await Book.find({})
    res.status(201).json({allBooks})
})



router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
    
        const book = await Book.findById(id)

         res.status(200).json(book)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


router.put('/:id', async (req, res) => {
    try {
        if(!req.body.title || !req.body.genre || !req.body.author){
            return res.status(400).send({message: 'please enter all required fields'})
        }
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body)

        if(!updatedBook){
            return res.status(404).json({message: 'book not found'})
        }

        return res.status(200).json({updatedBook})
    } catch (err) {
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.delete('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

export default router;