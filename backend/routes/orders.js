const router = require("express").Router();
const Order = require("../models/order");
const User = require("../models/user");

// Get user orders history
router.get("/get-order-history", async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Place order
router.post("/place-order", async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const savedOrder = await newOrder.save();

      // Push to user orders history
      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id },
      });

      // Clear from user cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order placed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;