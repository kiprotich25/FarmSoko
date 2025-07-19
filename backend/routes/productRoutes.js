// productRoutes.js
const express = require('express');
const {createProduct, getProductById,getProducts,updateProduct, deleteProduct, getMyProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/my", authMiddleware, getMyProducts );
router.post("/",authMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id",authMiddleware, updateProduct);
router.delete("/:id",authMiddleware, deleteProduct);
// GET /api/products/my



module.exports = router; // ✅ CommonJS
