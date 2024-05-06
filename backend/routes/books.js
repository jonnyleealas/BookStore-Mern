import express from "express"
import  {createBook, deleteBook}  from "./controller/books.js"

createBook()
deleteBook()

export {createBook, deleteBook}

