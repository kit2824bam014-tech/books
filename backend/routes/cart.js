const router = require("express").Router();
const User = require("../models/user");

// Add book to cart
router.put("/add-to-cart", async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.some(cartItem => cartItem.toString() === bookid);
        if (isBookInCart) {
            return res.status(200).json({ status: "Success", message: "Book is already in cart" });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });
        return res.status(200).json({ status: "Success", message: "Book added to cart" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Remove book from cart
router.put("/remove-from-cart/:bookid", async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },
        });
        return res.status(200).json({ status: "Success", message: "Book removed from cart" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get user cart
router.get("/get-user-cart", async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.status(200).json({
            status: "Success",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
