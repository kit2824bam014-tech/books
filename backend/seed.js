require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book");

const books = [
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0735211299.01.LZZZZZZZ.jpg",
        title: "Atomic Habits",
        author: "James Clear",
        price: 499,
        desc: "An easy and proven way to build good habits and break bad ones.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0062315005.01.LZZZZZZZ.jpg",
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350,
        desc: "A beautiful fable about following your dreams and listening to your heart.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0857197681.01.LZZZZZZZ.jpg",
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 399,
        desc: "Timeless lessons on wealth, greed, and happiness in an uncertain world.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0062316095.01.LZZZZZZZ.jpg",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 599,
        desc: "A brief history of humankind.",
        language: "English"
    },
    {
        url: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg",
        title: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        price: 399,
        desc: "A counterintuitive approach to living a good life.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0143130722.01.LZZZZZZZ.jpg",
        title: "Ikigai",
        author: "Hector Garcia",
        price: 420,
        desc: "The Japanese secret to a long and happy life.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1455586692.01.LZZZZZZZ.jpg",
        title: "Deep Work",
        author: "Cal Newport",
        price: 450,
        desc: "Rules for focused success in a distracted world.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1612680194.01.LZZZZZZZ.jpg",
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 399,
        desc: "What the rich teach their kids about money that the poor and middle class do not!",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1614270198.01.LZZZZZZZ.jpg",
        title: "The Power of Your Subconscious Mind",
        author: "Joseph Murphy",
        price: 299,
        desc: "One of the most beloved and bestselling inspirational guides of all time.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/080701429X.01.LZZZZZZZ.jpg",
        title: "Man's Search for Meaning",
        author: "Viktor Frankl",
        price: 320,
        desc: "A memoir by psychiatrist Viktor Frankl on his experience in Nazi concentration camps.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1585424331.01.LZZZZZZZ.jpg",
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        price: 250,
        desc: "A personal development and self-help book that has sold millions of copies worldwide.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1443456624.01.LZZZZZZZ.jpg",
        title: "The 5 AM Club",
        author: "Robin Sharma",
        price: 399,
        desc: "Own your morning. Elevate your life.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1524763136.01.LZZZZZZZ.jpg",
        title: "Becoming",
        author: "Michelle Obama",
        price: 499,
        desc: "A deeply personal memoir of the former First Lady of the United States.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0399590501.01.LZZZZZZZ.jpg",
        title: "Educated",
        author: "Tara Westover",
        price: 450,
        desc: "A transformation from a survivalist upbringing to Cambridge and Harvard University.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0307352153.01.LZZZZZZZ.jpg",
        title: "Quiet",
        author: "Susan Cain",
        price: 420,
        desc: "The power of introverts in a world that can't stop talking.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1451648537.01.LZZZZZZZ.jpg",
        title: "Steve Jobs",
        author: "Walter Isaacson",
        price: 650,
        desc: "The exclusive biography of Steve Jobs.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0804139296.01.LZZZZZZZ.jpg",
        title: "Zero to One",
        author: "Peter Thiel",
        price: 450,
        desc: "Notes on startups, or how to build the future.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/1591846447.01.LZZZZZZZ.jpg",
        title: "Start with Why",
        author: "Simon Sinek",
        price: 399,
        desc: "How great leaders inspire everyone to take action.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/0060555661.01.LZZZZZZZ.jpg",
        title: "The Intelligent Investor",
        author: "Benjamin Graham",
        price: 699,
        desc: "The definitive book on value investing.",
        language: "English"
    },
    {
        url: "https://images-na.ssl-images-amazon.com/images/P/059035342X.01.LZZZZZZZ.jpg",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 550,
        desc: "The magical journey of a young boy who discovers he's a wizard.",
        language: "English"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing books to avoid duplication
        await Book.deleteMany({});
        console.log("Cleared existing books.");

        // Insert new books
        await Book.insertMany(books);

        console.log("✅ Successfully seeded " + books.length + " books into the database!");
        process.exit();
    } catch (err) {
        console.error("❌ Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();
