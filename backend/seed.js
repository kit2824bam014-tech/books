require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book");

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to DB");

    const books = [
      {
        url: "https://example.com/book1.jpg",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.99,
        desc: "A classic novel about the American Dream.",
        language: "English"
      },
      {
        url: "https://example.com/book2.jpg",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.99,
        desc: "A story of racial injustice and childhood.",
        language: "English"
      },
      {
        url: "https://example.com/book3.jpg",
        title: "1984",
        author: "George Orwell",
        price: 9.99,
        desc: "A dystopian novel about totalitarianism.",
        language: "English"
      }
    ];

    await Book.insertMany(books);
    console.log("Books seeded");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBooks();