require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book");

const books = [
  {
    url: "https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg",
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    desc: "An easy and proven way to build good habits and break bad ones.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 350,
    desc: "A fable about following your dream.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/41r6F2LRf8L.jpg",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 399,
    desc: "Timeless lessons on wealth, greed, and happiness.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/416Eb067uSL.jpg",
    title: "Deep Work",
    author: "Cal Newport",
    price: 450,
    desc: "Rules for focused success in a distracted world.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81mXS3H98eL.jpg",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 399,
    desc: "What the rich teach their kids about money that the poor and middle class do not!",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/71sBtM3Yi5L.jpg",
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    price: 299,
    desc: "One of the most beloved and bestselling inspirational guides of all time.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/51S77Q-itDL.jpg",
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    price: 320,
    desc: "A memoir by psychiatrist Viktor Frankl on his experience in Nazi concentration camps.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/5165He67NEL.jpg",
    title: "Ikigai",
    author: "Hector Garcia",
    price: 420,
    desc: "The Japanese secret to a long and happy life.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81LFAbe9A6L.jpg",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 250,
    desc: "A personal development and self-help book that has sold millions of copies worldwide.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/71atWfC1oIL.jpg",
    title: "The 5 AM Club",
    author: "Robin Sharma",
    price: 399,
    desc: "Own your morning. Elevate your life.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/818fS66C41L.jpg",
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    price: 299,
    desc: "An autobiography of the former President of India, Dr. A.P.J. Abdul Kalam.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/71X8X8R6D9L.jpg",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    price: 550,
    desc: "A business and self-help book that has become a classic.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/41m6f-3hXzL.jpg",
    title: "Zero to One",
    author: "Peter Thiel",
    price: 450,
    desc: "Notes on startups, or how to build the future.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/71uK-Vv0qLL.jpg",
    title: "Start with Why",
    author: "Simon Sinek",
    price: 399,
    desc: "How great leaders inspire everyone to take action.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/910M6i-dGML.jpg",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    price: 699,
    desc: "The definitive book on value investing.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 599,
    desc: "A brief history of humankind.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/816K8N6E9pL.jpg",
    title: "Becoming",
    author: "Michelle Obama",
    price: 499,
    desc: "A deeply personal memoir of the former First Lady of the United States.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/810u9M7429L.jpg",
    title: "Educated",
    author: "Tara Westover",
    price: 450,
    desc: "A memoir about a young woman who leaves her survivalist family in Idaho to pursue an education.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/71t4GuxLCuL.jpg",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 399,
    desc: "A counterintuitive approach to living a good life.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81vR5I8-HHL.jpg",
    title: "Quiet",
    author: "Susan Cain",
    price: 420,
    desc: "The power of introverts in a world that can't stop talking.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81XyL9pndlL.jpg",
    title: "Grit",
    author: "Angela Duckworth",
    price: 420,
    desc: "The power of passion and perseverance.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81Y7y3y-JPL.jpg",
    title: "Originals",
    author: "Adam Grant",
    price: 450,
    desc: "How non-conformists move the world.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/816R5R8+V0L.jpg",
    title: "Elon Musk",
    author: "Walter Isaacson",
    price: 899,
    desc: "The definitive biography of Elon Musk.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81v66j-3XqL.jpg",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 650,
    desc: "The exclusive biography of Steve Jobs.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/91id544iYPL.jpg",
    title: "The Lean Startup",
    author: "Eric Ries",
    price: 499,
    desc: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81G9j8Wk7mL.jpg",
    title: "Shoe Dog",
    author: "Phil Knight",
    price: 450,
    desc: "A memoir by the creator of Nike.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81mI8m9+uFL.jpg",
    title: "Never Split the Difference",
    author: "Chris Voss",
    price: 499,
    desc: "Negotiating as if your life depended on it.",
    language: "English"
  },
  {
    url: "https://m.media-amazon.com/images/I/81vS3S-7jLL.jpg",
    title: "Can't Hurt Me",
    author: "David Goggins",
    price: 599,
    desc: "Master your mind and defy the odds.",
    language: "English"
  },
  {
    url: "https://images-na.ssl-images-amazon.com/images/I/51o5dnjk07L.jpg",
    title: "The Book Thief",
    author: "Markus Zusak",
    price: 500,
    desc: "An unforgettable WWII tale narrated by Death, where words become survival.",
    language: "English"
  },
  {
    url: "https://images-na.ssl-images-amazon.com/images/I/41NwnfKbiHL.jpg",
    title: "Normal People",
    author: "Sally Rooney",
    price: 600,
    desc: "A raw, tender exploration of intimacy and social class through two interwoven lives.",
    language: "English"
  },
  {
    url: "https://images-na.ssl-images-amazon.com/images/I/41I6N1yQ9PL.jpg",
    title: "The Nightingale",
    author: "Kristin Hannah",
    price: 400,
    desc: "Two sisters battle survival and resistance in Nazi-occupied France.",
    language: "English"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing books to avoid duplicates
    await Book.deleteMany({});

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