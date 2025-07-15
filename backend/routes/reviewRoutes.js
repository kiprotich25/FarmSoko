const express = require("express");
const {
  addReview,
  getReviewsForProduct
} = require("../controllers/reviewController");
const authMiddleware = require ( "../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addReview);                         // POST /api/reviews
router.get("/:productId", getReviewsForProduct);                     // GET /api/reviews/:productId

export default router;
