import express from "express"; // Removed unnecessary import of { response }
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/books.js";

const app = express();

// must addes express.json to read json
app.use(express.json());

// routes

app.get("/", async (req, res) => {
    try {
      const allBooks = await Book.find({});
      res.status(200).json({ allBooks }); 
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

app.get("/books/:id", async (req, res) => {
    try {
      const { id: bookId } = req.params; // Simplified destructuring
      const book = await Book.findOne({ _id: bookId });
      if (!book) {
        return res.status(404).json({ message: "Book not found" }); // Changed status to 404
      }
      res.status(200).json({ book }); // Changed status to 200 for success
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  

app.delete("/books/:id", async (req, res) => {
    try {
      const { id: bookId } = req.params;
      const book = await Book.findOneAndDelete({ _id: bookId });
      if (!book) {
        return res.status(404).json({ message: "Book not found" }); // Changed status to 404
      }
      res.status(200).json({ message: "Book deleted successfully" }); // Changed response message
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  app.post("/books", async (req, res) => {
    try {
      const { title, genre, author } = req.body; // Simplified object destructuring
      if (!title || !genre || !author) { // Changed condition to check if title, genre, and author are present
        return res.status(400).send({
          message: "Please provide all required fields: title, genre, and author", // Improved error message
        });
      }
  
      const newBook = await Book.create({ title, genre, author }); // Simplified object creation
      res.status(201).json(newBook); // Changed response to send the created book
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
