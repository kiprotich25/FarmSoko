const express = require ("express");
const { createOrder, getMyOrders } = require ("../controllers/orderController");
const authMiddleware= require ("../middleware/authMiddleware"); // protects routes

const router = express.Router();

router.post("/", authMiddleware, createOrder);      // POST /api/orders
router.get("/mine", authMiddleware, getMyOrders);   // GET /api/orders/mine

module.exports = router; // ✅ CommonJS


