const router = require("express").Router();
const Order = require("../models/order");
const User = require("../models/user");

// Get user orders
router.get("/", async (req, res) => {
  try {
    // Assuming user is authenticated, but for now, get all
    const orders = await Order.find().populate('user book');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create order
router.post("/", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const newOrder = new Order({ user: userId, book: bookId });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;