const express = require('express');
const {createProduct, getProductById,getProducts,updateProduct, deleteProduct, getMyProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct)
// GET /api/products/my
router.get("/my", authMiddleware, getMyProducts
//   try {
//     const products = await Product.find({ user: req.user._id });
//     res.json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch your products" });
//   }
);


module.exports = router; // ✅ CommonJS
