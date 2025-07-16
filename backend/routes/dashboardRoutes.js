const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const User = require("../models/User");
const Category = require("../models/Category");

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();

    res.json({
      products: productCount,
      users: userCount,
      categories: categoryCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
