import express from "express";
import {PORT, MONGO_URI} from "./config.js"
import mongoose from "mongoose";
import { Book } from './model/books.js'
import router from './routes/books.js'
import cors from 'cors'



const app = express()

// must addes express.json to read json
app.use(express.json())

app.use(cors())
// cors
// app.use(cors({
//     origin: 'http//localhost:3000',
//     methods: ['GET', 'POST', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

// routes
app.use('/books', router)

mongoose
.connect(MONGO_URI)
.then(() => {
    console.log("app connedted to database")
    app.listen(PORT, () => {
        console.log(`app listening on port${PORT}`)
    })
})
.catch ((error) => {
    console.log(error)
})