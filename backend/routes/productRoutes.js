// productRoutes.js
const express = require('express');
const {createProduct, getProductById,getProducts,updateProduct, deleteProduct, getMyProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
// GET /api/products/my
router.get("/my", authMiddleware, getMyProducts );


module.exports = router; // ✅ CommonJS
