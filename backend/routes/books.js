const router = require("express").Router();
const Book = require("../models/book");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get book by id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add book (admin only, but for now public)
router.post("/", async (req, res) => {
  try {
    const { url, title, author, price, desc, language } = req.body;
    const newBook = new Book({ url, title, author, price, desc, language });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;